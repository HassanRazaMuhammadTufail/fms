import { Body, Controller, Post } from '@nestjs/common';
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
}
