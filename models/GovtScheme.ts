import mongoose, { Schema, models } from "mongoose";

const GovtSchemeSchema = new Schema(
  {
    schemeName: { type: String, required: true },
    schemeCode: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const GovtScheme =
  models.GovtScheme || mongoose.model("GovtScheme", GovtSchemeSchema);

export default GovtScheme;
