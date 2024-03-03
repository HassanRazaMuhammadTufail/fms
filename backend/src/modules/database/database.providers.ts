import * as mongoose from 'mongoose';
import constants from '../../../constants';

export const databaseProviders = [
  {
    provide: constants.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.9vu0qtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ),
  },
];
