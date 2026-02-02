import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    monthlyPrice: { type: Number, required: true },
    productLimit: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("Category", categorySchema);