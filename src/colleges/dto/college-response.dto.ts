import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CollegeType, CourseLevel } from '@prisma/client';
import { PaginationMetaResponseDto } from '../../common/dto/pagination-meta-response.dto';

export class LocationResponseDto {
  @ApiProperty({ example: 'Pune' })
  city: string;

  @ApiProperty({ example: 'Maharashtra' })
  state: string;
}

export class CourseSummaryResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'B.Tech Computer Science and Engineering' })
  name: string;

  @ApiProperty({ example: 'Engineering' })
  stream: string;

  @ApiProperty({ enum: CourseLevel, example: CourseLevel.UG })
  level: CourseLevel;

  @ApiPropertyOptional({ example: '4 years' })
  duration?: string;

  @ApiProperty({ example: 180000 })
  annualFees: number;

  @ApiPropertyOptional({ example: 120, nullable: true })
  totalSeats?: number | null;
}

export class PlacementResponseDto {
  @ApiProperty({ example: 92.5 })
  placementRate: number;

  @ApiProperty({ example: 14.7 })
  averagePackageLpa: number;

  @ApiProperty({ example: 52 })
  highestPackageLpa: number;

  @ApiProperty({ example: ['Google', 'Microsoft', 'Tata Steel'] })
  topRecruiters: string[];
}

export class CollegeListItemResponseDto {
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

  @ApiProperty({ example: 175000 })
  fees: number;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiPropertyOptional({ example: 14.7, nullable: true })
  averagePackageLpa?: number | null;

  @ApiProperty({ type: [CourseSummaryResponseDto] })
  courses: CourseSummaryResponseDto[];
}

export class CollegeListResponseDto {
  @ApiProperty({ type: [CollegeListItemResponseDto] })
  data: CollegeListItemResponseDto[];

  @ApiProperty({ type: PaginationMetaResponseDto })
  meta: PaginationMetaResponseDto;
}

export class ReviewResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ananya Rao' })
  authorName: string;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiProperty({ example: 'Excellent academics and placements' })
  title: string;

  @ApiProperty({
    example: 'The curriculum is demanding, but the peer group and placement support make it worth it.'
  })
  body: string;

  @ApiProperty({ example: '2026-05-25T00:00:00.000Z' })
  createdAt: string;
}

export class CollegeDetailResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'National Institute of Technology Tiruchirappalli' })
  name: string;

  @ApiProperty({ example: 'nit-trichy' })
  slug: string;

  @ApiProperty({ example: 'Tiruchirappalli' })
  city: string;

  @ApiProperty({ example: 'Tamil Nadu' })
  state: string;

  @ApiProperty({ enum: CollegeType, example: CollegeType.GOVERNMENT })
  type: CollegeType;

  @ApiPropertyOptional({ example: 1964, nullable: true })
  establishedYear?: number | null;

  @ApiProperty({
    example:
      'A premier public technical institute known for engineering, architecture, research, and strong national placements.'
  })
  overview: string;

  @ApiPropertyOptional({ example: 'Institute of National Importance', nullable: true })
  accreditation?: string | null;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiProperty({ example: 175000 })
  averageFees: number;

  @ApiProperty({ type: [CourseSummaryResponseDto] })
  courses: CourseSummaryResponseDto[];

  @ApiPropertyOptional({ type: PlacementResponseDto, nullable: true })
  placement?: PlacementResponseDto | null;

  @ApiProperty({ type: [ReviewResponseDto] })
  reviews: ReviewResponseDto[];
}

export class CompareCollegeItemResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'National Institute of Technology Tiruchirappalli' })
  name: string;

  @ApiProperty({ example: 'Tiruchirappalli, Tamil Nadu' })
  location: string;

  @ApiProperty({ example: 175000 })
  fees: number;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiPropertyOptional({ type: PlacementResponseDto, nullable: true })
  placement?: PlacementResponseDto | null;

  @ApiProperty({ type: [CourseSummaryResponseDto] })
  courses: CourseSummaryResponseDto[];
}

export class CompareCollegesResponseDto {
  @ApiProperty({ type: [CompareCollegeItemResponseDto] })
  data: CompareCollegeItemResponseDto[];
}
