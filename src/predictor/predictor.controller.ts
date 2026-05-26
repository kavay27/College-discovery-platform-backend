import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PredictorQueryDto } from './dto/predictor-query.dto';
import { PredictorResponseDto } from './dto/predictor-response.dto';
import { PredictorService } from './predictor.service';

@ApiTags('predictor')
@Controller('predictor')
export class PredictorController {
  constructor(private readonly predictorService: PredictorService) {}

  @Get()
  @ApiOperation({
    summary: 'Predict suitable colleges',
    description:
      'Recommend colleges by matching the submitted exam rank against database-backed cutoff records.'
  })
  @ApiOkResponse({ type: PredictorResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid exam, rank, category, state, stream, or pagination parameter.' })
  @ApiNotFoundResponse({ description: 'Exam is not supported by the current dataset.' })
  recommend(@Query() query: PredictorQueryDto) {
    return this.predictorService.recommend(query);
  }
}
