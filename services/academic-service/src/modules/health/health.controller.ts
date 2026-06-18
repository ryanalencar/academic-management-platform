import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

class HealthResponse {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: 'auth-service' })
  service!: string;

  @ApiProperty({
    example: '2026-06-17T15:20:00.000Z',
    format: 'date-time',
  })
  timestamp!: string;
}

@ApiTags('Health')
@Controller('auth/health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check auth service health' })
  @ApiOkResponse({ type: HealthResponse })
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
