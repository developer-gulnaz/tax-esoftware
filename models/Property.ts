import mongoose, { Schema, models } from "mongoose";

const MilkitSchema = new Schema(
  {
    propertyCode: String,
    propertyNumber: String,
    address: String,
    ownerName: String,
    occupantName: String,
    description: String,
  },
  { timestamps: true }
);

const Milkit = models.Milkit || mongoose.model("Milkit", MilkitSchema);
export default Milkit;
