import mongoose from "mongoose";

const BuildingTypeSchema = new mongoose.Schema(
  {

    buildingType: { type: String, required: true },

    fixedRate: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);


export default mongoose.models.BuildingType ||
  mongoose.model("BuildingType", BuildingTypeSchema);
