import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ITracking, IVehicle } from './interfaces/tracking.interface';
import { CreateTrackingDto } from './dto/tracking.dto';
import constants from '../../../constants';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(constants.TRACKING_MODEL)
    private trackingModel: Model<ITracking>,
    @Inject(constants.VEHICLE_MODEL)
    private vehicleModel: Model<IVehicle>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<ITracking> {
    const vehicle = await this.vehicleModel
      .findOne({
        license: createTrackingDto.license,
      })
      .exec();
    console.log({
      velocity: createTrackingDto.velocity,
      vehicle: vehicle._id,
      location: {
        type: 'Point',
        coordinates: [
          createTrackingDto.location.lng,
          createTrackingDto.location.lat,
        ],
      },
    });
    const createdTracking = new this.trackingModel({
      velocity: createTrackingDto.velocity,
      vehicle: vehicle._id,
      location: {
        type: 'Point',
        coordinates: [
          createTrackingDto.location.lng,
          createTrackingDto.location.lat,
        ],
      },
    });
    return createdTracking.save();
  }

  async findAll(): Promise<ITracking[]> {
    return this.trackingModel.find().exec();
  }
}
