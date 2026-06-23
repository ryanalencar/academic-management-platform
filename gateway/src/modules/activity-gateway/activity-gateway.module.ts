import { Module } from '@nestjs/common';
import { ActivityGatewayController } from './activity-gateway.controller';
import { ActivityGatewayService } from './activity-gateway.service';

@Module({
  controllers: [ActivityGatewayController],
  providers: [ActivityGatewayService],
})
export class ActivityGatewayModule {}