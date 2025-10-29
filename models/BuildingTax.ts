import mongoose, { Schema, models } from "mongoose";

const BuildingTaxSchema = new Schema(
    {
        buildingType: { type: String, required: true },
        areaSize: { type: Number, required: true },
        buildingRate: { type: Number, default: 0, require: false },
        constructionRate: { type: Number, default: 0, require: false },
        taxRate: { type: Number, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const BuildingTax =
    models.BuildingTax || mongoose.model("BuildingTax", BuildingTaxSchema);

export default BuildingTax;
