import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IVehicle } from './interfaces/vehicle.interface';
import { CreateVehicleDto } from './dto/vehicle.dto';
import constants from '../../../constants';
import { ProducerService } from '../queues/producer';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject(constants.VEHICLE_MODEL)
    private vehicleModel: Model<IVehicle>,
    private producerService: ProducerService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<IVehicle> {
    // console.log(createVehicleDto)
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    // await this.producerService.addToEmailQueue(createVehicleDto);
    return createdVehicle.save();
  }

  async findAll(): Promise<IVehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(license: string): Promise<IVehicle> {
    return this.vehicleModel.findOne({ license }).exec();
  }
}
