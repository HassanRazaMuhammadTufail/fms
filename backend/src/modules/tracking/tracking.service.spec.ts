import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TrackingService } from './tracking.service';
import {
  IMaintenance,
  IVehicle,
  ITracking,
} from './interfaces/tracking.interface';
import constants from '../../../constants';

const mockVehicle = {
  _id: '1',
  company: 'Toyota',
  img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
  license: 'abc-123',
  name: 'Camry',
  ownerId: 'Hassan',
  status: 'active',
  type: 'Sedan',
  vehicleModel: '2020',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

const mockMaintenance = {
  _id: '1',
  company: 'Toyota',
  cost: '2000',
  mileage: '15000',
  type: 'oil change',
  description: 'oil change desc',
  vehicle: '1',
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
};

const mockTracking = {
  _id: '1',
  vehicle: '1',
  location: {
    type: 'Point',
    coordinates: [0, 0],
  },
};

const maintenanceArray = [
  {
    _id: '1',
    company: 'Toyota',
    cost: '1000',
    mileage: '15000',
    type: 'tuning',
    description: 'tuning desc',
    vehicle: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    company: 'Toyota',
    cost: '2000',
    mileage: '15000',
    type: 'oil change',
    description: 'oil change desc',
    vehicle: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    company: 'Toyota',
    cost: '12000',
    mileage: '15000',
    type: 'battery replace',
    description: 'battery replace desc',
    vehicle: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const maintenanceArrayExpected = [
  {
    _id: '1',
    company: 'Toyota',
    cost: '1000',
    mileage: '15000',
    type: 'tuning',
    description: 'tuning desc',
    vehicle: '1',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  },
  {
    _id: '2',
    company: 'Toyota',
    cost: '2000',
    mileage: '15000',
    type: 'oil change',
    description: 'oil change desc',
    vehicle: '1',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  },
  {
    _id: '3',
    company: 'Toyota',
    cost: '12000',
    mileage: '15000',
    type: 'battery replace',
    description: 'battery replace desc',
    vehicle: '1',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  },
];

describe('TrackingService', () => {
  let service: TrackingService;
  let model: Model<ITracking>;
  let vehicleModel: Model<IVehicle>;
  let maintenanceModel: Model<IMaintenance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackingService,
        {
          provide: constants.TRACKING_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockMaintenance),
            constructor: jest.fn().mockResolvedValue(mockMaintenance),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            aggregate: jest.fn(),
          },
        },
        {
          provide: constants.MAINTENANCE_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockMaintenance),
            constructor: jest.fn().mockResolvedValue(mockMaintenance),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: constants.VEHICLE_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockMaintenance),
            constructor: jest.fn().mockResolvedValue(mockMaintenance),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(TrackingService);
    model = module.get<Model<ITracking>>(constants.TRACKING_MODEL);
    maintenanceModel = module.get<Model<IMaintenance>>(
      constants.MAINTENANCE_MODEL,
    );
    vehicleModel = module.get<Model<IVehicle>>(constants.VEHICLE_MODEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return all maintenance logs', async () => {
  //   jest.spyOn(model, 'find').mockReturnValue({
  //     populate: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValueOnce(maintenanceArray),
  //     } as any),
  //   } as any);
  //   const vehicles = await service.findAll();
  //   expect(vehicles).toEqual(maintenanceArrayExpected);
  // });

  // it('should return a maintenance log by license', async () => {
  //   jest.spyOn(vehicleModel, 'findOne').mockReturnValue({
  //     exec: jest.fn().mockResolvedValueOnce(mockVehicle),
  //   } as any);
  //   jest.spyOn(model, 'findOne').mockReturnValue({
  //     populate: jest.fn().mockReturnValue({
  //       exec: jest.fn().mockResolvedValueOnce(mockMaintenance),
  //     } as any),
  //   } as any);
  //   const vehicles = await service.findOne('abc-123');
  //   expect(vehicles).toEqual(mockMaintenance);
  // });

  it('should add a new tracking log', async () => {
    jest.spyOn(vehicleModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockVehicle),
    } as any);
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockTracking as any));
    const newVehicle = await service.create({
      license: 'abc-123',
      location: {
        lat: 0,
        lng: 0,
      },
    });
    expect(newVehicle).toEqual(mockTracking);
  });

  it('should return analytics data', async () => {
    const currentDate = new Date();

    // Add 1 min to the current date
    currentDate.setMinutes(currentDate.getMinutes() + 1);
    jest.spyOn(vehicleModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({
        ...mockVehicle,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    } as any);
    jest.spyOn(maintenanceModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(maintenanceArray),
    } as any);
    jest.spyOn(model, 'aggregate').mockResolvedValueOnce([
      {
        _id: null,
        coordinates: [
          {
            coordinates: [25.1227603, 55.1874264],
            createdAt: new Date(),
          },
          {
            coordinates: [25.1179019, 55.1997397],
            createdAt: currentDate,
          },
        ],
      },
    ]);
    const analytics = await service.getTraveledDistanceAndTime('abc-123');
    expect(analytics).toEqual({
      maintenanceLogs: maintenanceArrayExpected,
      totalDistance: 1.4,
      totalTime: 60,
      averageVelocity: 0.02,
    });
  });
});
