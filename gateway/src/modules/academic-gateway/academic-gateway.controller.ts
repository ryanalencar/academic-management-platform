import {
  All,
  Controller,
  HttpCode,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AcademicGatewayService } from './academic-gateway.service';

@Controller('api/academic')
export class AcademicGatewayController {
  constructor(
    private readonly academicGatewayService: AcademicGatewayService,
  ) {}

  @All('disciplines')
  @HttpCode(200)
  async forwardDisciplinesRoot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'disciplines',
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('disciplines/*path')
  @HttpCode(200)
  async forwardDisciplinesNested(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'disciplines',
      this.toPath(path),
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('classes')
  @HttpCode(200)
  async forwardClassesRoot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'classes',
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('classes/*path')
  @HttpCode(200)
  async forwardClassesNested(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'classes',
      this.toPath(path),
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('enrollments')
  @HttpCode(200)
  async forwardEnrollmentsRoot(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'enrollments',
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  @All('enrollments/*path')
  @HttpCode(200)
  async forwardEnrollmentsNested(
    @Req() request: Request,
    @Res() response: Response,
    @Param('path') path: string[],
  ): Promise<void> {
    const serviceResponse = await this.academicGatewayService.forward(
      request,
      'enrollments',
      this.toPath(path),
    );

    response.status(serviceResponse.statusCode).json(serviceResponse.data);
  }

  private toPath(path: string[]): string {
    return path.join('/');
  }
}