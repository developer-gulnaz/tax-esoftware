import mongoose from "mongoose";

const TaxDetailsSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
      immutable: true,
    },
    taxName: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    amountType: {
      type: String,
      enum: ["रकमेमध्ये", "टक्केवारी म्हणून", "संख्यानुसार"],
      required: true,
    },
    showInDemandRegister: { type: Boolean, default: true },
    showInAssessmentSheet: { type: Boolean, default: true },
    showInSummaryList: { type: Boolean, default: true },
    type: {
      type: String,
      enum: ["सामान्य", "जादे", "सवलत", "घरकर"],
      default: "सामान्य",
    },
  },
  { timestamps: true }
);

TaxDetailsSchema.pre("validate", async function (next) {
  if (this.code) return next();

  // Explicitly cast to Model
  const Model = this.constructor as mongoose.Model<any>;
  const lastDoc = await Model.findOne().sort({ code: -1 });

  this.code = lastDoc ? lastDoc.code + 1 : 1;
  next();
});

export default mongoose.models.TaxDetails ||
  mongoose.model("TaxDetails", TaxDetailsSchema);
