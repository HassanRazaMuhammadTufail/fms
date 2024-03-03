import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { VehiclesService } from './vehicle.service';
import { IVehicle } from './interfaces/vehicle.interface';
import constants from '../../../constants';

const mockVehicle = {
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

const vehiclesArray = [
  {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-123',
    name: 'Camry',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-124',
    name: 'Corolla',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-121',
    name: 'Yaris',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const vehiclesArrayExpected = [
  {
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
  },
  {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-124',
    name: 'Corolla',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  },
  {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-121',
    name: 'Yaris',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  },
];

describe('VehiclesService', () => {
  let service: VehiclesService;
  let model: Model<IVehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: constants.VEHICLE_MODEL,
          useValue: {
            new: jest.fn().mockResolvedValue(mockVehicle),
            constructor: jest.fn().mockResolvedValue(mockVehicle),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(VehiclesService);
    model = module.get<Model<IVehicle>>(constants.VEHICLE_MODEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all vehicles', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(vehiclesArray),
    } as any);
    const vehicles = await service.findAll();
    expect(vehicles).toEqual(vehiclesArrayExpected);
  });

  it('should return a vehicle by license', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({
        ...mockVehicle,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    } as any);
    const vehicles = await service.findOne('abc-123');
    expect(vehicles).toEqual(mockVehicle);
  });

  it('should register a new vehicle', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        company: 'Toyota',
        img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
        license: 'abc-123',
        name: 'Camry',
        ownerId: 'Hassan',
        status: 'active',
        type: 'Sedan',
        vehicleModel: '2020',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any),
    );
    const newVehicle = await service.create({
      company: 'Toyota',
      img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
      license: 'abc-123',
      name: 'Camry',
      ownerId: 'Hassan',
      type: 'Sedan',
      vehicleModel: '2020',
    });
    expect(newVehicle).toEqual(mockVehicle);
  });
});
