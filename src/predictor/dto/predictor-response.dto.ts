import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CollegeType } from '@prisma/client';
import { PaginationMetaResponseDto } from '../../common/dto/pagination-meta-response.dto';
import {
  CourseSummaryResponseDto,
  LocationResponseDto,
  PlacementResponseDto
} from '../../colleges/dto/college-response.dto';

export class PredictorInputResponseDto {
  @ApiProperty({ example: 'jee-main' })
  exam: string;

  @ApiProperty({ example: 1000 })
  rank: number;

  @ApiProperty({ example: 'GENERAL' })
  category: string;

  @ApiPropertyOptional({ example: 'Engineering', nullable: true })
  stream?: string | null;

  @ApiPropertyOptional({ example: 'Tamil Nadu', nullable: true })
  state?: string | null;
}

export class PredictorCollegeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'National Institute of Technology Tiruchirappalli' })
  name: string;

  @ApiProperty({ example: 'nit-trichy' })
  slug: string;

  @ApiProperty({ type: LocationResponseDto })
  location: LocationResponseDto;

  @ApiProperty({ enum: CollegeType, example: CollegeType.GOVERNMENT })
  type: CollegeType;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiProperty({ example: 175000 })
  averageFees: number;
}

export class PredictorRecommendationResponseDto {
  @ApiProperty({ type: PredictorCollegeResponseDto })
  college: PredictorCollegeResponseDto;

  @ApiProperty({ example: 'B.Tech Computer Science and Engineering' })
  courseName: string;

  @ApiProperty({ example: 'JEE Main' })
  exam: string;

  @ApiProperty({ example: 'GENERAL' })
  category: string;

  @ApiProperty({ example: 200 })
  openingRank: number;

  @ApiProperty({ example: 1200 })
  closingRank: number;

  @ApiProperty({ example: 1 })
  round: number;

  @ApiProperty({ enum: ['STRONG', 'MODERATE', 'REACH'], example: 'REACH' })
  matchStrength: 'STRONG' | 'MODERATE' | 'REACH';

  @ApiProperty({ example: 200 })
  rankBuffer: number;

  @ApiProperty({ example: 'Your rank is within the closing rank by 200 places.' })
  reason: string;

  @ApiPropertyOptional({ type: PlacementResponseDto, nullable: true })
  placement?: PlacementResponseDto | null;

  @ApiProperty({ type: [CourseSummaryResponseDto] })
  relatedCourses: CourseSummaryResponseDto[];
}

export class PredictorResponseDto {
  @ApiProperty({ type: PredictorInputResponseDto })
  input: PredictorInputResponseDto;

  @ApiProperty({ type: [PredictorRecommendationResponseDto] })
  data: PredictorRecommendationResponseDto[];

  @ApiProperty({ type: PaginationMetaResponseDto })
  meta: PaginationMetaResponseDto;
}
