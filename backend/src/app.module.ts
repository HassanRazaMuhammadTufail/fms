import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './modules/vehicle/vehicle.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { TrackingModule } from './modules/tracking/tracking.module';

@Module({
  imports: [VehiclesModule, MaintenanceModule, TrackingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
