import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MaintenanceService } from './maintenance.service';
import { IMaintenance, IVehicle } from './interfaces/maintenance.interface';
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

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let model: Model<IMaintenance>;
  let vehicleModel: Model<IVehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceService,
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

    service = module.get(MaintenanceService);
    model = module.get<Model<IMaintenance>>(constants.MAINTENANCE_MODEL);
    vehicleModel = module.get<Model<IVehicle>>(constants.VEHICLE_MODEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all maintenance logs', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(maintenanceArray),
      } as any),
    } as any);
    const vehicles = await service.findAll();
    expect(vehicles).toEqual(maintenanceArrayExpected);
  });

  it('should return a maintenance log by license', async () => {
    jest.spyOn(vehicleModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockVehicle),
    } as any);
    jest.spyOn(model, 'findOne').mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockMaintenance),
      } as any),
    } as any);
    const vehicles = await service.findOne('abc-123');
    expect(vehicles).toEqual(mockMaintenance);
  });

  it('should add a new maintenance log', async () => {
    jest.spyOn(vehicleModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockVehicle),
    } as any);
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockMaintenance as any));
    const newVehicle = await service.create({
      company: 'Toyota',
      cost: '2000',
      mileage: '15000',
      type: 'oil change',
      license: 'abc-123',
      description: 'oil change desc',
    });
    expect(newVehicle).toEqual(mockMaintenance);
  });
});
