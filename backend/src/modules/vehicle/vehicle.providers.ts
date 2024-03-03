import { Connection } from 'mongoose';
import { VehicleSchema } from './schemas/vehicle.schema';
import constants from '../../../constants';

export const vehiclesProviders = [
  {
    provide: constants.VEHICLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('vehicle', VehicleSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
];
