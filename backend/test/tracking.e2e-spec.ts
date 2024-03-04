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
    const moduleFixture = await Test.createTestingModule({
      imports: [TrackingModule],
    })
      .overrideProvider(constants.TRACKING_MODEL)
      .useValue({
        aggregate: jest.fn(),
        find: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce([mockMaintenance]),
          }),
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
    return request(app.getHttpServer()).get('/analytics/abc-123').expect(200);
    // .expect([mockMaintenance]);
  });
});
