import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { Request } from 'express';

type ActivityResource = 'activities' | 'submissions';

type GatewayForwardResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

@Injectable()
export class ActivityGatewayService {
  private readonly activityServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    const activityServiceUrl = this.configService.get<string>(
      'ACTIVITY_SERVICE_URL',
    );

    if (!activityServiceUrl) {
      throw new InternalServerErrorException(
        'ACTIVITY_SERVICE_URL environment variable is required',
      );
    }

    this.activityServiceUrl = activityServiceUrl;
  }

  async forward(
    request: Request,
    resource: ActivityResource,
    path?: string,
  ): Promise<GatewayForwardResponse> {
    const url = this.buildActivityServiceUrl(resource, path);

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
          'Could not communicate with activity-service',
        );
      }

      throw new BadGatewayException(
        'Unexpected activity-service communication error',
      );
    }
  }

  private buildActivityServiceUrl(
    resource: ActivityResource,
    path?: string,
  ): string {
    const baseUrl = this.activityServiceUrl.replace(/\/$/, '');
    const normalizedPath = path ? `/${path.replace(/^\//, '')}` : '';

    return `${baseUrl}/${resource}${normalizedPath}`;
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