import { ApiPropertyOptional } from '@nestjs/swagger';
import { CollegeType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CollegeQueryDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'engineering' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Pune' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Maharashtra' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ enum: CollegeType })
  @IsOptional()
  @IsEnum(CollegeType)
  type?: CollegeType;

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  stream?: string;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minFees?: number;

  @ApiPropertyOptional({ example: 300000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxFees?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  minRating?: number;

  @ApiPropertyOptional({ enum: ['rating', 'fees', 'name', 'placement'] })
  @IsOptional()
  @IsIn(['rating', 'fees', 'name', 'placement'])
  sortBy: 'rating' | 'fees' | 'name' | 'placement' = 'rating';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}
