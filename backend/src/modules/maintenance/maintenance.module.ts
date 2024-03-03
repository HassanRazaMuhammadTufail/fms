import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { maintenanceProviders } from './maintenance.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MaintenanceController],
  providers: [MaintenanceService, ...maintenanceProviders],
})
export class MaintenanceModule {}
