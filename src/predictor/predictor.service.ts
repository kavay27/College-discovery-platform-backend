import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PredictorQueryDto } from './dto/predictor-query.dto';

@Injectable()
export class PredictorService {
  constructor(private readonly prisma: PrismaService) {}

  async recommend(query: PredictorQueryDto) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;
    const normalizedExam = query.exam.trim().toLowerCase();
    const normalizedCategory = query.category.trim().toUpperCase();

    const exam = await this.prisma.entranceExam.findUnique({
      where: {
        code: normalizedExam
      }
    });

    if (!exam) {
      throw new NotFoundException(`Exam '${query.exam}' is not supported`);
    }

    const where: Prisma.CutoffWhereInput = {
      examId: exam.id,
      category: {
        equals: normalizedCategory,
        mode: 'insensitive'
      },
      closingRank: {
        gte: query.rank
      },
      college: {
        ...(query.state
          ? {
              state: {
                equals: query.state,
                mode: 'insensitive'
              }
            }
          : {}),
        ...(query.stream
          ? {
              courses: {
                some: {
                  stream: {
                    equals: query.stream,
                    mode: 'insensitive'
                  }
                }
              }
            }
          : {})
      }
    };

    const [total, cutoffs] = await this.prisma.$transaction([
      this.prisma.cutoff.count({ where }),
      this.prisma.cutoff.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          {
            closingRank: 'asc'
          },
          {
            college: {
              rating: 'desc'
            }
          }
        ],
        include: {
          exam: true,
          college: {
            include: {
              placement: true,
              courses: {
                where: query.stream
                  ? {
                      stream: {
                        equals: query.stream,
                        mode: 'insensitive'
                      }
                    }
                  : undefined,
                select: {
                  id: true,
                  name: true,
                  stream: true,
                  level: true,
                  annualFees: true,
                  totalSeats: true
                }
              }
            }
          }
        }
      })
    ]);

    return {
      input: {
        exam: exam.code,
        rank: query.rank,
        category: normalizedCategory,
        stream: query.stream ?? null,
        state: query.state ?? null
      },
      data: cutoffs.map((cutoff) => {
        const rankBuffer = cutoff.closingRank - query.rank;

        return {
          college: {
            id: cutoff.college.id,
            name: cutoff.college.name,
            slug: cutoff.college.slug,
            location: {
              city: cutoff.college.city,
              state: cutoff.college.state
            },
            type: cutoff.college.type,
            rating: Number(cutoff.college.rating),
            averageFees: cutoff.college.averageFees
          },
          courseName: cutoff.courseName,
          exam: cutoff.exam.name,
          category: cutoff.category,
          openingRank: cutoff.openingRank,
          closingRank: cutoff.closingRank,
          round: cutoff.round,
          matchStrength: this.getMatchStrength(query.rank, cutoff.closingRank),
          rankBuffer,
          reason: `Your rank is within the closing rank by ${rankBuffer} places.`,
          placement: cutoff.college.placement
            ? {
                placementRate: Number(cutoff.college.placement.placementRate),
                averagePackageLpa: Number(cutoff.college.placement.averagePackageLpa),
                highestPackageLpa: Number(cutoff.college.placement.highestPackageLpa),
                topRecruiters: cutoff.college.placement.topRecruiters
              }
            : null,
          relatedCourses: cutoff.college.courses
        };
      }),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  private getMatchStrength(rank: number, closingRank: number) {
    const bufferRatio = (closingRank - rank) / closingRank;

    if (bufferRatio >= 0.5) {
      return 'STRONG';
    }

    if (bufferRatio >= 0.15) {
      return 'MODERATE';
    }

    return 'REACH';
  }
}
