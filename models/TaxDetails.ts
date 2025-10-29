import mongoose from "mongoose";

const TaxDetailsSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
      immutable: true, // ✅ makes it readonly (cannot change once set)
    },
    taxName: { type: String, required: true },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

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

// ✅ Auto-code always works
TaxDetailsSchema.pre("validate", async function (next) {
  if (this.code) return next();

  const lastDoc = await mongoose
    .model("TaxDetails")
    .findOne()
    .sort({ code: -1 });

  this.code = lastDoc ? lastDoc.code + 1 : 1;

  next();
});

export default mongoose.models.TaxDetails ||
  mongoose.model("TaxDetails", TaxDetailsSchema);
