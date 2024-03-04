import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateTrackingDto } from './dto/tracking.dto';
import { TrackingService } from './tracking.service';
import { IMaintenance } from './interfaces/tracking.interface';

@Controller('analytics')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get('/:license')
  async getDataByLicense(@Param('license') license: string): Promise<{
    maintenanceLogs: IMaintenance[];
    totalDistance: number;
    totalTime: number;
    averageVelocity: number;
  }> {
    return this.trackingService.getTraveledDistanceAndTime(license);
  }
}
