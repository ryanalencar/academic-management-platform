import {
  All,
  Controller,
  HttpCode,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ActivityGatewayService } from './activity-gateway.service';

@Controller('api')
export class ActivityGatewayController {
  constructor(
    private readonly activityGatewayService: ActivityGatewayService,
  ) {}

  @All('activities')
  @HttpCode(200)
  async forwardActivitiesRoot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const serviceResponse = await this.activityGatewayService.forward(
      request,
      'activities',
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('activities/*path')
  @HttpCode(200)
  async forwardActivitiesNested(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const serviceResponse = await this.activityGatewayService.forward(
      request,
      'activities',
      this.toPath(path),
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('submissions')
  @HttpCode(200)
  async forwardSubmissionsRoot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const serviceResponse = await this.activityGatewayService.forward(
      request,
      'submissions',
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('submissions/*path')
  @HttpCode(200)
  async forwardSubmissionsNested(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const serviceResponse = await this.activityGatewayService.forward(
      request,
      'submissions',
      this.toPath(path),
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  private toPath(path: string[]): string {
    return path.join('/');
  }
}