import { Connection } from 'mongoose';
import constants from '../../../constants';
import { TrackingSchema } from './schemas/tracking.schema';
import { VehicleSchema } from '../vehicle/schemas/vehicle.schema';

export const trackingProviders = [
  {
    provide: constants.TRACKING_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('tracking', TrackingSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
  {
    provide: constants.VEHICLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('vehicle', VehicleSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
];
