import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IMaintenance, IVehicle } from './interfaces/maintenance.interface';
import { CreateMaintenanceDto } from './dto/maintenance.dto';
import constants from '../../../constants';

@Injectable()
export class MaintenanceService {
  constructor(
    @Inject(constants.MAINTENANCE_MODEL)
    private maintenanceModel: Model<IMaintenance>,
    @Inject(constants.VEHICLE_MODEL)
    private vehicleModel: Model<IVehicle>,
  ) {}

  async create(
    createMaintenanceDto: CreateMaintenanceDto,
  ): Promise<IMaintenance> {
    const vehicle = await this.vehicleModel
      .findOne({
        license: createMaintenanceDto.license,
      })
      .exec();
    // return;
    const createdMaintenance = new this.maintenanceModel({
      type: createMaintenanceDto.type,
      cost: createMaintenanceDto.cost,
      mileage: createMaintenanceDto.mileage,
      company: createMaintenanceDto.company,
      description: createMaintenanceDto.description,
      vehicle: vehicle._id,
    });
    return createdMaintenance.save();
  }

  async findAll(): Promise<IMaintenance[]> {
    return this.maintenanceModel.find().populate('vehicle').exec();
  }

  async findOne(license: string): Promise<IMaintenance> {
    const vehicle = await this.vehicleModel.findOne({ license }).exec();
    return this.maintenanceModel
      .findOne({ vehicle: vehicle._id })
      .populate('vehicle')
      .exec();
  }
}
