import { Schema, model } from "mongoose";

const ShopSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    location: String,

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("Shop", ShopSchema);
