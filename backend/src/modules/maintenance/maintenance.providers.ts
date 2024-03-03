import { Connection } from 'mongoose';
import { MaintenanceSchema } from './schemas/maintenance.schema';
import constants from '../../../constants';
import { VehicleSchema } from '../vehicle/schemas/vehicle.schema';

export const maintenanceProviders = [
  {
    provide: constants.MAINTENANCE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('maintenance', MaintenanceSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
  {
    provide: constants.VEHICLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('vehicle', VehicleSchema),
    inject: [constants.DATABASE_CONNECTION],
  },
];
