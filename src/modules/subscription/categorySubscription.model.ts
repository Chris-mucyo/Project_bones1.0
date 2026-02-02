import { Schema, model, Types } from "mongoose";

const categorySubscriptionSchema = new Schema(
  {
    seller: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

// prevent duplicate subscriptions
categorySubscriptionSchema.index(
  { seller: 1, category: 1 },
  { unique: true }
);

export default model(
  "CategorySubscription",
  categorySubscriptionSchema
);