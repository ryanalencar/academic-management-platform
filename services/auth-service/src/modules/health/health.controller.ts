import { Controller, Get } from '@nestjs/common';

type HealthResponse = {
  status: 'ok';
  service: string;
  timestamp: string;
};

@Controller('auth/health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
