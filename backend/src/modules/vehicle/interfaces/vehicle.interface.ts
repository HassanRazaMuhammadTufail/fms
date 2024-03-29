import { Document } from 'mongoose';

export interface IVehicle extends Document {
  readonly img: string;
  readonly name: string;
  readonly type: string;
  readonly company: string;
  readonly license: string;
  readonly ownerId: string;
  readonly vehicleModel: string;
}
