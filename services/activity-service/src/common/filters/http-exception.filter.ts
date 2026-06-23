import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = this.getErrorMessage(exception);

    this.logger.error(
      JSON.stringify({
        method: request.method,
        path: request.originalUrl,
        statusCode,
        message,
        timestamp: new Date().toISOString(),
      }),
    );

    response.status(statusCode).json({
      statusCode,
      message,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
    } satisfies ErrorResponse);
  }

  private getErrorMessage(exception: unknown): string | string[] {
    if (!(exception instanceof HttpException)) {
      return 'Internal server error';
    }

    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const message = response.message;

      if (typeof message === 'string' || Array.isArray(message)) {
        return message;
      }
    }

    return exception.message;
  }
}
