import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class CompareCollegesDto {
  @ApiProperty({
    example: '1,2,3',
    description: 'Comma-separated college IDs from GET /api/colleges. Choose 2 to 3 colleges.'
  })
  @Transform(({ value }) =>
    String(value)
      .split(',')
      .map((id) => Number(id.trim()))
  )
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  @IsInt({ each: true })
  ids: number[];
}
