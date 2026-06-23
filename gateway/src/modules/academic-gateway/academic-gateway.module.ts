import { Module } from '@nestjs/common';
import { AcademicGatewayController } from './academic-gateway.controller';
import { AcademicGatewayService } from './academic-gateway.service';

@Module({
  controllers: [AcademicGatewayController],
  providers: [AcademicGatewayService],
})
export class AcademicGatewayModule {}