import * as mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Point'], // Ensure the type is Point
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true,
    },
  },
  { _id: false },
);

export const TrackingSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle',
      required: true,
    },
    location: LocationSchema,
  },
  { timestamps: true },
);

TrackingSchema.index({ location: '2dsphere' });
