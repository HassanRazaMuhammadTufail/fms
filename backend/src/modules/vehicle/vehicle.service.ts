import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IVehicle } from './interfaces/vehicle.interface';
import { CreateVehicleDto } from './dto/vehicle.dto';
import constants from '../../../constants';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject(constants.VEHICLE_MODEL)
    private vehicleModel: Model<IVehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<IVehicle> {
    const createdVehicle = this.vehicleModel.create(createVehicleDto);
    return createdVehicle;
  }

  async findAll(): Promise<IVehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(license: string): Promise<IVehicle> {
    return this.vehicleModel.findOne({ license }).exec();
  }
}
