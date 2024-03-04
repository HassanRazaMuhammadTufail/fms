import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { VehiclesService } from './vehicle.service';
import { IVehicle } from './interfaces/vehicle.interface';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  async getAll(): Promise<IVehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get('/:license')
  async getByLicenseNumber(
    @Param('license') license: string,
  ): Promise<IVehicle> {
    return this.vehiclesService.findOne(license);
  }
}
