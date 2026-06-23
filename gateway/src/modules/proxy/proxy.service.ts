import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { Request } from 'express';
import { ServicesConfig } from '../../config/services.config';

type ProxyTarget = 'auth' | 'academic' | 'activities';

type ProxyResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

@Injectable()
export class ProxyService {
  private readonly serviceUrls: Record<ProxyTarget, string>;

  constructor(private readonly configService: ConfigService) {
    const services =
      this.configService.get<ServicesConfig>('services');

    if (!services) {
      throw new InternalServerErrorException(
        'Services configuration is missing',
      );
    }

    this.serviceUrls = {
      auth: services.authServiceUrl,
      academic: services.academicServiceUrl,
      activities: services.activityServiceUrl,
    };
  }

  async forward(
    target: ProxyTarget,
    request: Request,
    path: string,
  ): Promise<ProxyResponse> {
    const baseUrl = this.serviceUrls[target];
    const url = this.buildTargetUrl(baseUrl, path);

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

      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new BadGatewayException(
          `Could not reach ${target} service`,
        );
      }

      throw error;
    }
  }

  private buildTargetUrl(baseUrl: string, path: string): string {
    const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
    const normalizedPath = path.replace(/^\//, '');

    return `${normalizedBaseUrl}/${normalizedPath}`;
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