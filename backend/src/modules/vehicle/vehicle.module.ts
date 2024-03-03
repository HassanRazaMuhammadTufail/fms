import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicle.controller';
import { VehiclesService } from './vehicle.service';
import { vehiclesProviders } from './vehicle.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiclesController],
  providers: [VehiclesService, ...vehiclesProviders],
})
export class VehiclesModule {}
