import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackingDto {
  @ApiProperty()
  readonly license: string;
  @ApiProperty()
  readonly location: {
    lng: number;
    lat: number;
  };
}
