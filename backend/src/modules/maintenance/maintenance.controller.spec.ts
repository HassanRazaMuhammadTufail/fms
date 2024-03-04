import { CreateMaintenanceDto } from './dto/maintenance.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';

describe('MaintenanceController', () => {
  let controller: MaintenanceController;

  beforeAll(async () => {
    const maintenance: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceController],
      providers: [
        {
          provide: MaintenanceService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            create: jest
              .fn()
              .mockImplementation(
                (createMaintenanceDto: CreateMaintenanceDto) =>
                  Promise.resolve({
                    _id: '1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    vehicle: '1',
                    type: createMaintenanceDto.type,
                    cost: createMaintenanceDto.cost,
                    mileage: createMaintenanceDto.mileage,
                    description: createMaintenanceDto.description,
                    company: createMaintenanceDto.company,
                  }),
              ),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            findOne: jest.fn().mockImplementation((license: string) =>
              Promise.resolve({
                _id: '1',
                company: 'Toyota',
                cost: '2000',
                mileage: '15000',
                type: 'oil change',
                description: 'oil change desc',
                vehicle: '1',
                createdAt: new Date(),
                updatedAt: new Date(),
              }),
            ),
          },
        },
      ],
    }).compile();
    controller = maintenance.get(MaintenanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should add a new maintenance log', async () => {
      const createMaintenanceDto: CreateMaintenanceDto = {
        company: 'Toyota',
        cost: '2000',
        mileage: '15000',
        type: 'oil change',
        description: 'oil change desc',
        license: 'abc-123',
      };

      expect(controller.create(createMaintenanceDto)).resolves.toEqual({
        _id: '1',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        vehicle: '1',
        type: createMaintenanceDto.type,
        cost: createMaintenanceDto.cost,
        mileage: createMaintenanceDto.mileage,
        description: createMaintenanceDto.description,
        company: createMaintenanceDto.company,
      });
    });
  });

  describe('findAll()', () => {
    it('should get an array of maintenance logs', () => {
      expect(controller.findAll()).resolves.toEqual([
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
      ]);
    });
  });

  describe('getByLicenseNumber', () => {
    it('should get maintenance object by license number', () => {
      expect(controller.getByLicenseNumber('abc-123')).resolves.toEqual({
        _id: '1',
        company: 'Toyota',
        cost: '2000',
        mileage: '15000',
        type: 'oil change',
        description: 'oil change desc',
        vehicle: '1',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
