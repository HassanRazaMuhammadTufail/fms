import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty()
  readonly license: string;
  @ApiProperty()
  readonly type: string;
  @ApiProperty()
  readonly cost: string;
  @ApiProperty()
  readonly mileage: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly company: string;
}
