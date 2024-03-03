import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './modules/vehicle/vehicle.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { TrackingModule } from './modules/tracking/tracking.module';

@Module({
  imports: [
    VehiclesModule,
    MaintenanceModule,
    TrackingModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
