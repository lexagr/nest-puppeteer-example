import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get screenshot of target page',
    description: 'Target must be started from http(s)://',
  })
  async getScreenshotForTarget(
    @Query('target') target: string,
    @Res() res: Response,
  ): Promise<any> {
    const screenpath = await this.appService.getScreenshotForTarget(target);

    res.setHeader('Content-Type', 'image/png');

    createReadStream(screenpath).pipe(res);
  }
}
