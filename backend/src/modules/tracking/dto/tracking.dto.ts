export class CreateTrackingDto {
  readonly license: string;
  readonly velocity: string;
  readonly location: {
    lng: number;
    lat: number;
  };
}
