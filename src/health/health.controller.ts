import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: 'college-discovery-platform' })
  service: string;

  @ApiProperty({ example: '2026-05-25T00:00:00.000Z' })
  timestamp: string;
}

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ type: HealthResponseDto })
  check() {
    return {
      status: 'ok',
      service: 'college-discovery-platform',
      timestamp: new Date().toISOString()
    };
  }
}
