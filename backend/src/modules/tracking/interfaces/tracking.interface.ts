import { Document } from 'mongoose';

export interface ITracking extends Document {
  readonly vehicle: string | IVehicle;
  readonly location: {
    type: string;
    coordinates: number[];
  };
}
export interface IVehicle extends Document {
  readonly img: string;
  readonly name: string;
  readonly type: string;
  readonly company: string;
  readonly license: string;
  readonly ownerId: string;
  readonly vehicleModel: string;
}

export interface IMaintenance extends Document {
  readonly company: string;
  readonly type: string;
  readonly cost: string;
  readonly mileage: string;
  readonly description: string;
  readonly vehicle: string | IVehicle;
}
