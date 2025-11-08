import mongoose from "mongoose";
import "./TaxDetails";

const BuildingDescriptionSchema = new mongoose.Schema({
  buildingType: String,
  taxRate: Number,
  usageType: String,
  floorName: String,
  dimension: String,
  sqFt: Number,
  sqM: Number,
  year: Number,
});

const PropertySchema = new mongoose.Schema({
  // मालकाची माहिती
  ownerName: { type: String, required: true },
  ownerAddress: String,
  mobile: { type: Number, required: true },
  phone: Number,
  email: String,
  dateOfBirth: Date,
  image: { type: String, require: false },

  // कर तपशील
  selectedTaxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaxDetails" }],

  // मालमत्तेची माहिती
  propertyNumber: { type: String, required: true },
  propertyCode: String, 
  propertyWard: String,
  kabjedar: String,
  propertyType: String,
  mDate: Date,
  mAnnualAmount: Number,
  remarks: String,

  // आकारणी तपशील
  // selectedAkarani: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaxDetails" }],

  // जमिनिचे व इमारतीचे तपशील
  usageTypes: [String],
  landArea: String,
  landAreaFeet: Number,
  landAreaMeter: Number,
  squareFoot: String,
  eastSide: String,
  westSide: String,
  northSide: String,
  southSide: String,

  // इमारत प्रकारानुसार दर
  buildingDescriptions: [BuildingDescriptionSchema],

  // इमारत वापर तपशील
  buildingUsage: [String],

  // वैयक्तिक व कौटुंबिक माहिती
  familyHead: String,
  fhAge: Number,
  fhAdhar: String,
  fhAdharName: String,
  rashionCardType: String,
  rashionCardNo: String,
  caste: String,
  subCaste: String,
  houseType: String,
  wardNum: String,
  houseNum: String,
  khasraNum: String,
  roadNum: String,
  incomesource: String,
  jamin: String,
  landSize: String,

  // घरातील सदस्य
  memberCount: Number,
  boy: Number,
  girl: Number,
  vidhva: Number,
  isRental: Boolean,
  rentalName: String,
  rentedMemberCount: Number,
  familyMembers: [
    {
      name: String,
      age: Number,
      relation: String,
      occupation: String,
    },
  ],

  // योजना आणि प्राणी तपशील
  schemeName: String,
  schemeDate: Date,
  schemeRemarks: String,
  animalName: String,
  animalCount: Number,
}, { timestamps: true });

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
