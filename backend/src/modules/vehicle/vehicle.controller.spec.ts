import { CreateVehicleDto } from './dto/vehicle.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicle.controller';
import { VehiclesService } from './vehicle.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeAll(async () => {
    const vehicle: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            create: jest
              .fn()
              .mockImplementation((createVehicleDto: CreateVehicleDto) =>
                Promise.resolve({
                  _id: '1',
                  status: 'active',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  ...createVehicleDto,
                }),
              ),
            findOne: jest.fn().mockImplementation((license: string) =>
              Promise.resolve({
                _id: '1',
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
                company: 'Toyota',
                img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
                license,
                name: 'Yaris',
                ownerId: 'Hassan',
                vehicleModel: '2020',
              }),
            ),
          },
        },
      ],
    }).compile();
    controller = vehicle.get(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should register a new vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        company: 'Toyota',
        img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
        license: 'abc-123',
        name: 'Camry',
        ownerId: 'Hassan',
        type: 'Sedan',
        vehicleModel: '2020',
      };

      expect(controller.create(createVehicleDto)).resolves.toEqual({
        _id: '1',
        status: 'active',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        ...createVehicleDto,
      });
    });
  });

  describe('getAll()', () => {
    it('should get an array of vehicles', () => {
      expect(controller.getAll()).resolves.toEqual([
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
      ]);
    });
  });

  describe('getByLicenseNumber', () => {
    it('should get vehicle object by license number', () => {
      expect(controller.getByLicenseNumber('abc-123')).resolves.toEqual({
        _id: '1',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        company: 'Toyota',
        img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
        license: 'abc-123',
        name: 'Yaris',
        ownerId: 'Hassan',
        vehicleModel: '2020',
      });
    });
  });
});
