import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema(
  {
    // _id: mongoose.Types.ObjectId,
    img: { type: String, required: true },
    name: { type: String, required: true },
    type: String,
    status: {
      type: String,
      required: true,
      enum: ['active', 'suspended', 'deleted'],
      default: 'active',
    },
    license: { type: String, unique: true, required: true },
    company: String,
    ownerId: String,
    vehicleModel: String,
  },
  { timestamps: true },
);
