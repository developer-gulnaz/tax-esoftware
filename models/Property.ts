import mongoose from "mongoose";

const BuildingDescriptionSchema = new mongoose.Schema({
  buildingType: String,
  taxRate: Number,
  usageType: String,
  floor: String,
  floor1: String,
  floor2: String,
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
  image: String,

  // कर तपशील
  selectedTaxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tax" }],

  // मालमत्तेची माहिती
  propertyNumber: { type: String, required: true },
  propertyCode: String,
  kabjedar: String,
  propertyType: String,
  propertyAddress: String,
  mDate: Date,
  mAnnualAmount: Number,
  remarks: String,

  // आकारणी तपशील
  selectedAkarani: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tax" }],

  // जमिनिचे व इमारतीचे तपशील
  usageTypes: [String],
  landArea: Number,
  landAreaFeet: Number,
  landAreaMeter: Number,
  squareFoot: String,
  sqrftEast: String,
  sqrftWest: String,
  sqrftNorth: String,
  sqrftSouth: String,

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
});

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
