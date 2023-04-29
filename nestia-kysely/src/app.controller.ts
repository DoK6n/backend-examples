import { TypedRoute } from '@nestia/core';
import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Swagger Nestia 버전과 @nestjs/swagger 비교

@Controller('/')
@ApiTags('인사 API')
export class AppController {
  @ApiOperation({ summary: '인사하는 API', description: '뜬금없이 인사한다.' })
  @ApiCreatedResponse({ description: '뜬금없이 인사한다.' })
  @Get('/hellonest')
  async getHelloNestJS() {
    return 'hello NestJS Swagger Decorator';
  }

  /**
   * 뜬금없이 인사한다.
   *
   * @summary 인사하는 API
   */
  @TypedRoute.Get('/hellonestia')
  async getHelloNestia() {
    return 'hello Nestia Swagger Generator';
  }
}
