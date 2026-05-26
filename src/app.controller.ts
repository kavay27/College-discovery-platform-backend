import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      service: 'college-discovery-platform',
      status: 'ok',
      docs: '/api/docs',
      health: '/api/health'
    };
  }
}
