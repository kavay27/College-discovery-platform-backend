import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CollegeQueryDto } from './dto/college-query.dto';

@Injectable()
export class CollegesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: CollegeQueryDto) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;
    const where = this.buildWhere(query);
    const orderBy = this.buildOrderBy(query);

    const [total, colleges] = await this.prisma.$transaction([
      this.prisma.college.count({ where }),
      this.prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          placement: true,
          courses: {
            select: {
              id: true,
              name: true,
              stream: true,
              level: true,
              annualFees: true
            }
          }
        }
      })
    ]);

    return {
      data: colleges.map((college) => ({
        id: college.id,
        name: college.name,
        slug: college.slug,
        location: {
          city: college.city,
          state: college.state
        },
        type: college.type,
        fees: college.averageFees,
        rating: Number(college.rating),
        averagePackageLpa: college.placement ? Number(college.placement.averagePackageLpa) : null,
        courses: college.courses
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: number) {
    const college = await this.prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        placement: true,
        reviews: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!college) {
      throw new NotFoundException(`College with id ${id} was not found`);
    }

    return {
      id: college.id,
      name: college.name,
      slug: college.slug,
      city: college.city,
      state: college.state,
      type: college.type,
      establishedYear: college.establishedYear,
      overview: college.overview,
      accreditation: college.accreditation,
      rating: Number(college.rating),
      averageFees: college.averageFees,
      courses: college.courses.map((course) => ({
        id: course.id,
        name: course.name,
        stream: course.stream,
        level: course.level,
        duration: course.duration,
        annualFees: course.annualFees,
        totalSeats: course.totalSeats
      })),
      placement: college.placement ? this.mapPlacement(college.placement) : null,
      reviews: college.reviews.map((review) => ({
        id: review.id,
        authorName: review.authorName,
        rating: Number(review.rating),
        title: review.title,
        body: review.body,
        createdAt: review.createdAt
      }))
    };
  }

  async compare(ids: number[]) {
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length !== ids.length) {
      throw new BadRequestException('College IDs must be unique');
    }

    const colleges = await this.prisma.college.findMany({
      where: {
        id: {
          in: ids
        }
      },
      include: {
        placement: true,
        courses: {
          select: {
            id: true,
            name: true,
            stream: true,
            level: true,
            annualFees: true,
            totalSeats: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (colleges.length !== ids.length) {
      throw new NotFoundException('One or more college IDs were not found');
    }

    return {
      data: colleges.map((college) => ({
        id: college.id,
        name: college.name,
        location: `${college.city}, ${college.state}`,
        fees: college.averageFees,
        rating: Number(college.rating),
        placement: college.placement ? this.mapPlacement(college.placement) : null,
        courses: college.courses
      }))
    };
  }

  private buildWhere(query: CollegeQueryDto): Prisma.CollegeWhereInput {
    const where: Prisma.CollegeWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
        { state: { contains: query.search, mode: 'insensitive' } },
        {
          courses: {
            some: {
              name: { contains: query.search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    if (query.city) {
      where.city = { equals: query.city, mode: 'insensitive' };
    }

    if (query.state) {
      where.state = { equals: query.state, mode: 'insensitive' };
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.stream) {
      where.courses = {
        some: {
          stream: { equals: query.stream, mode: 'insensitive' }
        }
      };
    }

    if (query.minFees !== undefined || query.maxFees !== undefined) {
      where.averageFees = {
        gte: query.minFees,
        lte: query.maxFees
      };
    }

    if (query.minRating !== undefined) {
      where.rating = {
        gte: query.minRating
      };
    }

    return where;
  }

  private buildOrderBy(query: CollegeQueryDto): Prisma.CollegeOrderByWithRelationInput {
    if (query.sortBy === 'fees') {
      return { averageFees: query.sortOrder };
    }

    if (query.sortBy === 'name') {
      return { name: query.sortOrder };
    }

    if (query.sortBy === 'placement') {
      return {
        placement: {
          averagePackageLpa: query.sortOrder
        }
      };
    }

    return { rating: query.sortOrder };
  }

  private mapPlacement(placement: {
    placementRate: Prisma.Decimal;
    averagePackageLpa: Prisma.Decimal;
    highestPackageLpa: Prisma.Decimal;
    topRecruiters: string[];
  }) {
    return {
      placementRate: Number(placement.placementRate),
      averagePackageLpa: Number(placement.averagePackageLpa),
      highestPackageLpa: Number(placement.highestPackageLpa),
      topRecruiters: placement.topRecruiters
    };
  }
}
