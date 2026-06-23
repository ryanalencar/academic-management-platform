import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { Request } from 'express';

type AcademicResource = 'disciplines' | 'classes' | 'enrollments';

type GatewayForwardResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

@Injectable()
export class AcademicGatewayService {
  private readonly academicServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    const academicServiceUrl = this.configService.get<string>(
      'ACADEMIC_SERVICE_URL',
    );

    if (!academicServiceUrl) {
      throw new InternalServerErrorException(
        'ACADEMIC_SERVICE_URL environment variable is required',
      );
    }

    this.academicServiceUrl = academicServiceUrl;
  }

  async forward(
    request: Request,
    resource: AcademicResource,
    path?: string,
  ): Promise<GatewayForwardResponse> {
    const url = this.buildAcademicServiceUrl(resource, path);

    const config: AxiosRequestConfig = {
      method: request.method as Method,
      url,
      data: request.body,
      params: request.query,
      headers: this.buildHeaders(request),
      validateStatus: () => true,
    };

    try {
      const response = await axios.request(config);

      if (response.status >= 400) {
        throw new HttpException(response.data, response.status);
      }

      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new BadGatewayException(
          'Could not communicate with academic-service',
        );
      }

      throw new BadGatewayException(
        'Unexpected academic-service communication error',
      );
    }
  }

  private buildAcademicServiceUrl(
    resource: AcademicResource,
    path?: string,
  ): string {
    const baseUrl = this.academicServiceUrl.replace(/\/$/, '');
    const normalizedPath = path ? `/${path.replace(/^\//, '')}` : '';

    return `${baseUrl}/academic/${resource}${normalizedPath}`;
  }

  private buildHeaders(request: Request): Record<string, string> {
    const authorization = request.headers.authorization;
    const contentType = request.headers['content-type'];

    return {
      ...(authorization ? { authorization } : {}),
      ...(contentType ? { 'content-type': contentType } : {}),
    };
  }
}