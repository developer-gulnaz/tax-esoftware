// seed.js
import mongoose from "mongoose";

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/gram-panchayat"; // replace with your DB if different

// Define Property schema
const propertySchema = new mongoose.Schema({
  serialNo: Number,
  propertyCode: String,
  propertyNumber: String,
  address: String,
  ownerName: String,
  occupantName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  seeMore: {
    type: String,
    default: "See More",
  },
  management: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Model
const Property = mongoose.model("Property", propertySchema);

// Dummy Property Data
const property = [
  {
    serialNo: 1,
    propertyCode: "550",
    propertyNumber: "1/550",
    address: "वार्ड क्र. -1",
    ownerName: "संदीप इंगळे",
    occupantName: "",
    description: "",
  },
  {
    serialNo: 2,
    propertyCode: "3/8-2",
    propertyNumber: "3/8",
    address: "वार्ड क्र. -1",
    ownerName: "शकुंतला मोतीराम बावनकुळे",
  },
  {
    serialNo: 3,
    propertyCode: "3/150",
    propertyNumber: "3/150",
    address: "वार्ड क्र. -1",
    ownerName: "आशिष कुमार",
  },
  {
    serialNo: 4,
    propertyCode: "5/1-",
    propertyNumber: "5/1",
    address: "",
    ownerName: "पंचफुला बुद्धू माहुले",
  },
  {
    serialNo: 5,
    propertyCode: "5/112",
    propertyNumber: "5/112",
    address: "",
    ownerName: "शंकर रामाजी नासरे",
  },
  {
    serialNo: 6,
    propertyCode: "5/450",
    propertyNumber: "5/450",
    address: "वार्ड क्र. -4",
    ownerName: "अमित कुमार",
  },
  {
    serialNo: 7,
    propertyCode: "6/250",
    propertyNumber: "6/250",
    address: "वार्ड क्र. -6",
    ownerName: "आशिष कुमार",
  },
  {
    serialNo: 8,
    propertyCode: "6/340",
    propertyNumber: "6/340",
    address: "वार्ड क्र. -4",
    ownerName: "विनोद कुमार",
  },
  {
    serialNo: 9,
    propertyCode: "6/500",
    propertyNumber: "6/500",
    address: "वार्ड क्र. -6",
    ownerName: "अमित शाहा",
  },
  {
    serialNo: 10,
    propertyCode: "6/750",
    propertyNumber: "6/750",
    address: "वार्ड क्र. -6",
    ownerName: "शशिकांत वाहाणे",
  },
];

// Seed Function
const seedProperties = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: Clear existing records before seeding
    await Property.deleteMany();

    await Property.insertMany(property);
    console.log("🌱 Properties seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding properties:", error);
    mongoose.connection.close();
  }
};

seedProperties();
