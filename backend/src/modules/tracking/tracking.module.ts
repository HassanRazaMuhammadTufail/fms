import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { trackingProviders } from './tracking.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackingController],
  providers: [TrackingService, ...trackingProviders],
})
export class TrackingModule {}
