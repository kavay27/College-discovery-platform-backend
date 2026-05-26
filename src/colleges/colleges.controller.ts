import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollegesService } from './colleges.service';
import {
  CollegeDetailResponseDto,
  CollegeListResponseDto,
  CompareCollegesResponseDto
} from './dto/college-response.dto';
import { CollegeQueryDto } from './dto/college-query.dto';
import { CompareCollegesDto } from './dto/compare-colleges.dto';

@ApiTags('colleges')
@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get()
  @ApiOperation({
    summary: 'List colleges',
    description: 'Search, filter, sort, and paginate colleges using data stored in PostgreSQL.'
  })
  @ApiOkResponse({ type: CollegeListResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid query parameters.' })
  findMany(@Query() query: CollegeQueryDto) {
    return this.collegesService.findMany(query);
  }

  @Get('compare')
  @ApiOperation({
    summary: 'Compare colleges',
    description: 'Compare 2 to 3 colleges side by side by fees, ratings, location, placements, and courses.'
  })
  @ApiOkResponse({ type: CompareCollegesResponseDto })
  @ApiBadRequestResponse({ description: 'College IDs must be valid, unique, and limited to 2-3 IDs.' })
  @ApiNotFoundResponse({ description: 'One or more college IDs were not found.' })
  compare(@Query() query: CompareCollegesDto) {
    return this.collegesService.compare(query.ids);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get college details',
    description: 'Return a detailed college profile with overview, courses, placement stats, and reviews.'
  })
  @ApiOkResponse({ type: CollegeDetailResponseDto })
  @ApiNotFoundResponse({ description: 'College was not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }
}
