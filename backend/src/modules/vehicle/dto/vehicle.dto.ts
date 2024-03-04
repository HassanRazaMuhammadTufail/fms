import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  readonly img: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly type: string;
  @ApiProperty()
  readonly company: string;
  @ApiProperty()
  readonly license: string;
  @ApiProperty()
  readonly ownerId: string;
  @ApiProperty()
  readonly vehicleModel: string;
}
