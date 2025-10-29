import mongoose, { Schema, models } from "mongoose";

const PropertySchema = new Schema(
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

const Property = models.Property || mongoose.model("properties", PropertySchema);
export default Property;
