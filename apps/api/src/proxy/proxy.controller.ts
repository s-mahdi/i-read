import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Public } from '../decorators/public.decorator';

@Controller('proxy')
export class ProxyController {
  constructor(private httpService: HttpService) {}

  @Get()
  // TODO: I'm concerned about a security issue here
  @Public()
  async getProxy(@Query('url') url: string, @Res() res: Response) {
    const decodedUrl = decodeURIComponent(url);

    try {
      const response = await firstValueFrom(
        this.httpService.get(decodedUrl, { responseType: 'arraybuffer' })
      );

      res.setHeader('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error) {
      res.status(HttpStatus.BAD_GATEWAY).send('Could not fetch the resource.');
    }
  }
}
