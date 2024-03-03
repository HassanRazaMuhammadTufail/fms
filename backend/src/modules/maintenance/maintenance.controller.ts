import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/maintenance.dto';
import { MaintenanceService } from './maintenance.service';
import { IMaintenance } from './interfaces/maintenance.interface';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  async create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  async findAll(): Promise<IMaintenance[]> {
    return this.maintenanceService.findAll();
  }

  @Get('/:license')
  async getByLicenseNumber(
    @Param('license') license: string,
  ): Promise<IMaintenance> {
    return this.maintenanceService.findOne(license);
  }
}
