import { Model } from 'mongoose';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  IMaintenance,
  ITracking,
  IVehicle,
} from './interfaces/tracking.interface';
import { CreateTrackingDto } from './dto/tracking.dto';
import constants from '../../../constants';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(constants.TRACKING_MODEL)
    private trackingModel: Model<ITracking>,
    @Inject(constants.VEHICLE_MODEL)
    private vehicleModel: Model<IVehicle>,
    @Inject(constants.MAINTENANCE_MODEL)
    private maintenanceModel: Model<IMaintenance>,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<ITracking> {
    const vehicle = await this.vehicleModel
      .findOne({
        license: createTrackingDto.license,
      })
      .exec();
    if (!vehicle) {
      throw new BadRequestException('vehicle not found');
    }
    // console.log({
    //   vehicle: vehicle._id,
    //   location: {
    //     type: 'Point',
    //     coordinates: [
    //       createTrackingDto.location.lng,
    //       createTrackingDto.location.lat,
    //     ],
    //   },
    // });
    const createdTracking = this.trackingModel.create({
      vehicle: vehicle._id,
      location: {
        type: 'Point',
        coordinates: [
          createTrackingDto.location.lng,
          createTrackingDto.location.lat,
        ],
      },
    });
    return createdTracking;
  }

  private calculateTotalDistance(coordinates: number[][]): number {
    let totalDistance = 0;

    for (let i = 1; i < coordinates.length; i++) {
      const [lon1, lat1] = coordinates[i - 1];
      const [lon2, lat2] = coordinates[i];
      const distance = this.calculateDistanceBetweenPoints(
        lat1,
        lon1,
        lat2,
        lon2,
      );
      totalDistance += distance;
    }
    // ATTENTION: REMOVED DISTANCE CONVERSION INTO METERS SO THE UNIT OF DISTANCE IS KILOMETERS
    return totalDistance;
  }

  private calculateDistanceBetweenPoints(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  private calculateTimeDifferenceInSeconds(timestamps) {
    // Parse first and last timestamps into Date objects
    const firstTimestamp: any = new Date(timestamps[0]);
    const lastTimestamp: any = new Date(timestamps[timestamps.length - 1]);

    // Calculate time difference in milliseconds
    const timeDifference_ms = lastTimestamp - firstTimestamp;

    // Convert milliseconds to seconds
    const timeDifference_seconds = timeDifference_ms / 1000;
    return timeDifference_seconds;
  }

  private getFinalizedData(data) {
    let totalDistance = 0,
      totalTime = 0,
      averageVelocity = 0;
    if (!data || !data[0] || !data[0].coordinates) {
      return {
        totalDistance,
        totalTime,
        averageVelocity,
      };
    }
    const coordinates = data[0].coordinates.map((elem) => elem.coordinates);
    const timestamps = data[0].coordinates.map((elem) => elem.createdAt);
    totalDistance = Number(
      this.calculateTotalDistance(coordinates).toFixed(2) || 0,
    );
    totalTime =
      timestamps && timestamps.length
        ? Number(
            this.calculateTimeDifferenceInSeconds(timestamps).toFixed(2) || 0,
          )
        : 0;
    averageVelocity =
      totalDistance && totalTime
        ? Number((totalDistance / totalTime).toFixed(2) || 0)
        : 0;
    return {
      totalDistance,
      totalTime,
      averageVelocity,
    };
  }

  async getTraveledDistanceAndTime(license: string): Promise<{
    maintenanceLogs: IMaintenance[];
    totalDistance: number;
    totalTime: number;
    averageVelocity: number;
  }> {
    // const pipeline: any[] = [
    //   {
    //     $match: { vehicle: new mongoose.Types.ObjectId(vehicleId) },
    //   },
    //   {
    //     $sort: { createdAt: 1 }, // Sort documents by createdAt timestamp in ascending order
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       coordinates: { $push: '$location.coordinates' }, // Collect all coordinates into an array
    //       timestamp: '$createdAt',
    //     },
    //   },
    //   // {
    //   //   $unwind: '$coordinates', // Unwind the coordinates array
    //   // },
    //   // {
    //   //   $project: {
    //   //     distance: {
    //   //       $reduce: {
    //   //         input: '$coordinates',
    //   //         initialValue: 0,
    //   //         in: {
    //   //           $sum: [
    //   //             '$$value',
    //   //             {
    //   //               $cond: [
    //   //                 { $gt: [{ $size: '$$this' }, 1] }, // Ensure the coordinate has both longitude and latitude
    //   //                 {
    //   //                   $sqrt: {
    //   //                     $sum: [
    //   //                       {
    //   //                         $pow: [
    //   //                           {
    //   //                             $subtract: [
    //   //                               { $arrayElemAt: ['$$this', 0] },
    //   //                               { $arrayElemAt: ['$$value', 0] },
    //   //                             ],
    //   //                           },
    //   //                           2,
    //   //                         ],
    //   //                       }, // Calculate longitude difference
    //   //                       {
    //   //                         $pow: [
    //   //                           {
    //   //                             $subtract: [
    //   //                               { $arrayElemAt: ['$$this', 1] },
    //   //                               { $arrayElemAt: ['$$value', 1] },
    //   //                             ],
    //   //                           },
    //   //                           2,
    //   //                         ],
    //   //                       }, // Calculate latitude difference
    //   //                     ],
    //   //                   },
    //   //                 },
    //   //                 0,
    //   //               ],
    //   //             },
    //   //           ],
    //   //         },
    //   //       },
    //   //     },
    //   //   },
    //   // },

    //   {
    //     $project: {
    //       // coordinates: { $arrayElemAt: ['$coordinates', 0] },
    //       coordinates: '$coordinates',
    //       // distance: {
    //       //   $reduce: {
    //       //     input: '$coordinates',
    //       //     initialValue: { $arrayElemAt: ['$coordinates', 0] },
    //       //     in: {
    //       //       $sum: [
    //       //         '$$value',
    //       //         {
    //       //           $cond: [
    //       //             { $gt: [{ $size: '$$this' }, 1] },
    //       //             {
    //       //               $sqrt: {
    //       //                 $sum: [
    //       //                   { $pow: [{ $subtract: [{ $arrayElemAt: [ '$$this', 0 ] }, { $arrayElemAt: [ '$$value', 0 ] }] }, 2] },
    //       //                   { $pow: [{ $subtract: [{ $arrayElemAt: [ '$$this', 1 ] }, { $arrayElemAt: [ '$$value', 1 ] }] }, 2] }
    //       //                   // { $pow: [{ $subtract: ['$$this[0]', '$$value.longitude'] }, 2] }, // Calculate longitude difference
    //       //                   // { $pow: [{ $subtract: ['$$this[1]', '$$value.latitude'] }, 2] }    // Calculate latitude difference
    //       //                 ]
    //       //               }
    //       //             },
    //       //             0
    //       //           ]
    //       //         }
    //       //       ]
    //       //     }
    //       //   }
    //       // },
    //     },
    //   },
    //   // {
    //   //   $project: {
    //   //     sumLng: {
    //   //       $reduce: {
    //   //         input: '$coordinates',
    //   //         initialValue: 0,
    //   //         in: {$add: ['$$value',{ $arrayElemAt: ['$$this', 0] }]} // Add the longitude component to the accumulated sum
    //   //       }
    //   //     },
    //   //     sumLat: {
    //   //       $reduce: {
    //   //         input: '$coordinates',
    //   //         initialValue: 0,
    //   //         in: {$add: ['$$value',{ $arrayElemAt: ['$$this', 1] }]} // Add the latitude component to the accumulated sum
    //   //       }
    //   //     }
    //   //   }
    //   // }
    // ];
    const vehicle = await this.vehicleModel.findOne({ license }).exec();
    if (!vehicle) {
      throw new BadRequestException('vehicle not found');
    }
    const maintenanceLogs = await this.maintenanceModel
      .find({ vehicle: vehicle._id })
      .exec();
    const pipeline: any[] = [
      {
        $match: { vehicle: vehicle._id },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $group: {
          _id: null,
          coordinates: {
            $push: {
              createdAt: '$createdAt',
              coordinates: '$location.coordinates',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          coordinates: '$coordinates',
        },
      },
    ];
    const result = await this.trackingModel.aggregate<any>(pipeline);
    return { maintenanceLogs, ...this.getFinalizedData(result) };
  }
}
