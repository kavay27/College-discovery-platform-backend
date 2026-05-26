import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class PredictorQueryDto extends PaginationDto {
  @ApiProperty({ example: 'jee-main' })
  @IsString()
  exam: string;

  @ApiProperty({ example: 25000, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000000)
  rank: number;

  @ApiPropertyOptional({ example: 'GENERAL', default: 'GENERAL' })
  @IsOptional()
  @IsString()
  category = 'GENERAL';

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  stream?: string;

  @ApiPropertyOptional({ example: 'Maharashtra' })
  @IsOptional()
  @IsString()
  state?: string;
}
