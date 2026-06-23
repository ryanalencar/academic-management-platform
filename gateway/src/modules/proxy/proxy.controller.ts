import {
  All,
  Controller,
  HttpCode,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('api')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*path')
  @HttpCode(200)
  async forwardAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const proxyResponse = await this.proxyService.forward(
      'auth',
      request,
      this.toServicePath('auth', path),
    );

    response.status(proxyResponse.statusCode).json(proxyResponse.data);
  }

  @All('academic/*path')
  @HttpCode(200)
  async forwardAcademic(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const proxyResponse = await this.proxyService.forward(
      'academic',
      request,
      this.toServicePath('academic', path),
    );

    response.status(proxyResponse.statusCode).json(proxyResponse.data);
  }

  @All('activities/*path')
  @HttpCode(200)
  async forwardActivities(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const proxyResponse = await this.proxyService.forward(
      'activities',
      request,
      this.toServicePath('activities', path),
    );

    response.status(proxyResponse.statusCode).json(proxyResponse.data);
  }

  private toServicePath(prefix: string, path: string[]): string {
    return [prefix, ...path].join('/');
  }
}