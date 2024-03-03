import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateTrackingDto } from './dto/tracking.dto';
import { TrackingService } from './tracking.service';

@Controller('track')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTrackingDto: CreateTrackingDto) {
    console.log(createTrackingDto);
    return this.trackingService.create(createTrackingDto);
  }

  @Get('/:license')
  async getDataByLicense(@Param('license') license: string): Promise<{
    totalDistance: number;
    totalTime: number;
    averageVelocity: number;
  }> {
    return this.trackingService.getTravlledDistanceAndTime(license);
  }
}
