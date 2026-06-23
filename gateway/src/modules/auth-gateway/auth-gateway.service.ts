import {
  BadGatewayException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

type AuthRoute = 'login' | 'students' | 'professors';

type GatewayForwardResponse<T = unknown> = {
  statusCode: number;
  data: T;
};

@Injectable()
export class AuthGatewayService {
  private readonly authServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    const authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL');

    if (!authServiceUrl) {
      throw new InternalServerErrorException(
        'AUTH_SERVICE_URL environment variable is required',
      );
    }

    this.authServiceUrl = authServiceUrl;
  }

  async login(payload: unknown): Promise<GatewayForwardResponse> {
    return this.forward('POST', 'login', payload);
  }

  async registerStudent(payload: unknown): Promise<GatewayForwardResponse> {
    return this.forward('POST', 'students', payload);
  }

  async registerProfessor(payload: unknown): Promise<GatewayForwardResponse> {
    return this.forward('POST', 'professors', payload);
  }

  private async forward(
    method: Method,
    route: AuthRoute,
    payload: unknown,
  ): Promise<GatewayForwardResponse> {
    const url = this.buildAuthServiceUrl(route);

    const config: AxiosRequestConfig = {
      method,
      url,
      data: payload,
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
        throw new BadGatewayException('Could not communicate with auth-service');
      }

      throw new BadGatewayException('Unexpected auth-service communication error');
    }
  }

  private buildAuthServiceUrl(route: AuthRoute): string {
    const baseUrl = this.authServiceUrl.replace(/\/$/, '');

    return `${baseUrl}/auth/${route}`;
  }
}