import { CreateVehicleDto } from './../src/modules/vehicle/dto/vehicle.dto';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { VehiclesModule } from '../src/modules/vehicle/vehicle.module';
import constants from '../constants';

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

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [VehiclesModule],
    })
      .overrideProvider(constants.VEHICLE_MODEL)
      .useValue({
        find: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce([mockVehicle]),
        }),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findOne: jest.fn().mockImplementation((license: string) => {
          return { exec: jest.fn().mockResolvedValueOnce([mockVehicle]) };
        }),
        create: jest
          .fn()
          .mockImplementation((createVehicleDto: CreateVehicleDto) =>
            Promise.resolve({
              ...createVehicleDto,
              _id: '1',
            }),
          ),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/vehicles (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicles')
      .expect(200)
      .expect([mockVehicle]);
  });

  it('/vehicles/:license (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicles/abc-123')
      .expect(200)
      .expect([mockVehicle]);
  });

  it('/vehicles (POST)', () => {
    return request(app.getHttpServer())
      .post('/vehicles')
      .send({
        company: 'Toyota',
        img: 'https://www.refined-marques.com/wp-content/uploads/2020/11/Lamborghini-and-Ferrari-900x480-1.jpg',
        license: 'abc-123',
        name: 'Camry',
        ownerId: 'Hassan',
        status: 'active',
        type: 'Sedan',
        vehicleModel: '2020',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .expect({
        ...mockVehicle,
        _id: '1',
      });
  });
});
