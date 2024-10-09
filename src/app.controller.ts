import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiTags('App')
  @Get()
  getHello(): string {
    return 'Hello';
  }
}
