import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    shop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    negotiable: { type: Boolean, default: false },
    images: [String], 
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
