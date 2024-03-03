import * as mongoose from 'mongoose';

export const MaintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle',
      required: true,
    },
    type: String,
    cost: { type: String, required: true },
    mileage: { type: String, required: true },
    company: String,
    description: String,
  },
  { timestamps: true },
);
