export class CreateTrackingDto {
  readonly license: string;
  readonly location: {
    lng: number;
    lat: number;
  };
}
