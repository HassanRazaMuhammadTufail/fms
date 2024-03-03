import { Document } from 'mongoose';

export interface IMaintenance extends Document {
  readonly company: string;
  readonly type: string;
  readonly cost: string;
  readonly mileage: string;
  readonly description: string;
  readonly vehicle: string | IVehicle;
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
