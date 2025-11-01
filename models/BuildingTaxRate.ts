import mongoose, { Schema, models } from "mongoose";

const BuildingTaxRateSchema = new Schema(
    {
        buildingType: { type: String, required: true },
        areaSize: { type: Number, required: true },
        buildingRate: { type: Number, default: 0, require: false },
        constructionRate: { type: Number, default: 0, require: false, min: 0 },
        taxRate: { type: Number, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const BuildingTaxRate =
    models.BuildingTaxRate || mongoose.model("BuildingTaxRate", BuildingTaxRateSchema);

export default BuildingTaxRate;
