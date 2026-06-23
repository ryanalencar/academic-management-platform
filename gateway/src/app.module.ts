import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import { servicesConfig } from './config/services.config';
import { HealthModule } from './modules/health/health.module';
import { ProxyModule } from './modules/proxy/proxy.module';
import { AuthGatewayModule } from './modules/auth-gateway/auth-gateway.module';
import { AcademicGatewayModule } from './modules/academic-gateway/academic-gateway.module';
import { ActivityGatewayModule } from './modules/activity-gateway/activity-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [servicesConfig],
    }),
    HealthModule,
    // ProxyModule,
    AuthGatewayModule,
    AcademicGatewayModule,
    ActivityGatewayModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}