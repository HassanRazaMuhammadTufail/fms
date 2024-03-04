import { CreateTrackingDto } from './dto/tracking.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';

describe('TrackingController', () => {
  let controller: TrackingController;

  beforeAll(async () => {
    const tracking: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [
        {
          provide: TrackingService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createTrackingDto: CreateTrackingDto) =>
                Promise.resolve({
                  _id: '1',
                  ...createTrackingDto,
                  vehicle: '1',
                  location: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                }),
              ),

            getTraveledDistanceAndTime: jest
              .fn()
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .mockImplementation((license: string) =>
                Promise.resolve({
                  maintenanceLogs: [],
                  totalDistance: 0,
                  totalTime: 0,
                  averageVelocity: 0,
                }),
              ),
          },
        },
      ],
    }).compile();
    controller = tracking.get(TrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should add a new tracking log', async () => {
      const createTrackingDto: CreateTrackingDto = {
        license: 'abc-123',
        location: {
          lng: 0,
          lat: 0,
        },
      };

      expect(controller.create(createTrackingDto)).resolves.toEqual({
        _id: '1',
        ...createTrackingDto,
        vehicle: '1',
        location: {
          type: 'Point',
          coordinates: [0, 0],
        },
      });
    });
  });

  describe('getDataByLicense', () => {
    it('should get maintenance logs and analytics object by license number', () => {
      expect(controller.getDataByLicense('abc-123')).resolves.toEqual({
        maintenanceLogs: [],
        totalDistance: 0,
        totalTime: 0,
        averageVelocity: 0,
      });
    });
  });
});
