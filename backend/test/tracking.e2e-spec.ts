import { CreateTrackingDto } from './../src/modules/tracking/dto/tracking.dto';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import constants from '../constants';
import { TrackingModule } from '../src/modules/tracking/tracking.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockVehicle = {
    company: 'Toyota',
    img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
    license: 'abc-123',
    name: 'Camry',
    ownerId: 'Hassan',
    status: 'active',
    type: 'Sedan',
    vehicleModel: '2020',
  };

  const mockMaintenance = {
    _id: '1',
    company: 'Toyota',
    cost: '1000',
    mileage: '15000',
    type: 'tuning',
    description: 'tuning desc',
    vehicle: '1',
  };

  beforeAll(async () => {
    const currentDate = new Date();

    // Add 1 min to the current date
    currentDate.setMinutes(currentDate.getMinutes() + 1);

    const currentDate2 = new Date();

    // Add 5 min to the current date
    currentDate2.setMinutes(currentDate2.getMinutes() + 5);
    const moduleFixture = await Test.createTestingModule({
      imports: [TrackingModule],
    })
      .overrideProvider(constants.TRACKING_MODEL)
      .useValue({
        aggregate: jest.fn().mockImplementation(() =>
          Promise.resolve([
            {
              _id: null,
              coordiates: [
                {
                  createdAt: currentDate,
                  coordinates: [25.1227603, 55.1874264],
                },
                {
                  createdAt: currentDate2,
                  coordinates: [25.1179019, 55.1997397],
                },
              ],
            },
          ]),
        ),
        find: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce([mockMaintenance]),
          }),
        }),
        create: jest
          .fn()
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((createTrackingDto: CreateTrackingDto) =>
            Promise.resolve({
              vehicle: mockVehicle,
              location: {
                type: 'Point',
                coordinates: [55.1874264, 25.1227603],
              },
            }),
          ),
      })
      .overrideProvider(constants.MAINTENANCE_MODEL)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        find: jest.fn().mockImplementation(({ vehicle }) => {
          return {
            exec: jest.fn().mockResolvedValueOnce([mockMaintenance]),
          };
        }),
        findOne: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(mockMaintenance),
          }),
        }),
      })
      .overrideProvider(constants.VEHICLE_MODEL)
      .useValue({
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce([mockVehicle]),
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findOne: jest.fn().mockImplementation((license: string) => {
          return { exec: jest.fn().mockResolvedValueOnce(mockVehicle) };
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/analytics/:license (GET)', () => {
    return request(app.getHttpServer())
      .get('/analytics/abc-123')
      .expect(200)
      .expect({
        maintenanceLogs: [mockMaintenance],
        totalDistance: 0,
        totalTime: 0,
        averageVelocity: 0,
      });
  });

  it('/analytics (POST', () => {
    return request(app.getHttpServer())
      .post('/analytics')
      .send({
        license: 'abc-123',
        location: {
          lng: 55.1874264,
          lat: 25.1227603,
        },
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect({
        vehicle: mockVehicle,
        location: {
          type: 'Point',
          coordinates: [55.1874264, 25.1227603],
        },
      });
  });
});
