// seed.js
import mongoose from "mongoose";

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/grampanchayat"
// "mongodb+srv://dronemart:keRn8WWZL1LcjDyw@cluster0.cirv6wv.mongodb.net/grampanchayat?retryWrites=true&w=majority&appName=Cluster0";

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
  // Existing 10 records here...

  {
    serialNo: 11,
    propertyCode: "7/120",
    propertyNumber: "7/120",
    address: "वार्ड क्र. -5",
    ownerName: "सुनिता गिरीधर",
    occupantName: "रमेश गिरीधर",
    description: "निवासी घर",
  },
  {
    serialNo: 12,
    propertyCode: "7/300",
    propertyNumber: "7/300",
    address: "वार्ड क्र. -5",
    ownerName: "शीतल रामटेके",
    occupantName: "",
    description: "मोकळे प्लॉट",
  },
  {
    serialNo: 13,
    propertyCode: "8/220",
    propertyNumber: "8/220",
    address: "वार्ड क्र. -4",
    ownerName: "रामू बोरकर",
    occupantName: "विठ्ठल बोरकर",
    description: "टिनशेड घर",
  },
  {
    serialNo: 14,
    propertyCode: "8/360",
    propertyNumber: "8/360",
    address: "वार्ड क्र. -4",
    ownerName: "सुभाष कोटे",
    occupantName: "",
    description: "मंजुरी घर",
  },
  {
    serialNo: 15,
    propertyCode: "9/110",
    propertyNumber: "9/110",
    address: "वार्ड क्र. -3",
    ownerName: "गजानन उईके",
    occupantName: "सावित्री उईके",
    description: "निवासी इमारत",
  },
  {
    serialNo: 16,
    propertyCode: "9/250",
    propertyNumber: "9/250",
    address: "वार्ड क्र. -3",
    ownerName: "प्रकाश नागपुरे",
    occupantName: "",
    description: "गाळा / दुकान",
  },
  {
    serialNo: 17,
    propertyCode: "10/180",
    propertyNumber: "10/180",
    address: "वार्ड क्र. -2",
    ownerName: "विजय सहारे",
    occupantName: "महेश सहारे",
    description: "निवृत्त घाट घर",
  },
  {
    serialNo: 18,
    propertyCode: "10/400",
    propertyNumber: "10/400",
    address: "वार्ड क्र. -2",
    ownerName: "संगीता धोटे",
    occupantName: "",
    description: "नवीन घर",
  },
  {
    serialNo: 19,
    propertyCode: "11/320",
    propertyNumber: "11/320",
    address: "वार्ड क्र. -1",
    ownerName: "राजू खडसे",
    occupantName: "संतोष खडसे",
    description: "पक्की बांधकाम",
  },
  {
    serialNo: 20,
    propertyCode: "11/510",
    propertyNumber: "11/510",
    address: "वार्ड क्र. -1",
    ownerName: "शुभांशू चव्हाण",
    occupantName: "",
    description: "व्यावसायिक जागा",
  },
  {
    serialNo: 21,
    propertyCode: "3/90",
    propertyNumber: "3/90",
    address: "वार्ड क्र. -2",
    ownerName: "सुदाम वाघमारे",
    occupantName: "शिवाजी वाघमारे",
    description: "टिनशेड घर",
  },
  {
    serialNo: 22,
    propertyCode: "5/390",
    propertyNumber: "5/390",
    address: "वार्ड क्र. -3",
    ownerName: "मीना बोरकर",
    occupantName: "",
    description: "विटांचे घर",
  },
  {
    serialNo: 23,
    propertyCode: "4/450",
    propertyNumber: "4/450",
    address: "वार्ड क्र. -4",
    ownerName: "योगेश गेडाम",
    occupantName: "",
    description: "पक्का घर",
  },
  {
    serialNo: 24,
    propertyCode: "4/530",
    propertyNumber: "4/530",
    address: "वार्ड क्र. -4",
    ownerName: "निशा चौधरी",
    occupantName: "भागवत चौधरी",
    description: "दुमजली घर",
  },
  {
    serialNo: 25,
    propertyCode: "2/210",
    propertyNumber: "2/210",
    address: "वार्ड क्र. -5",
    ownerName: "बाबूजी घोगरे",
    occupantName: "",
    description: "मोकळा प्लॉट",
  },
  {
    serialNo: 26,
    propertyCode: "2/350",
    propertyNumber: "2/350",
    address: "वार्ड क्र. -5",
    ownerName: "प्रवीण येनगुरले",
    occupantName: "जागृती येनगुरले",
    description: "स्वमालकीचे घर",
  },
  {
    serialNo: 27,
    propertyCode: "1/180",
    propertyNumber: "1/180",
    address: "वार्ड क्र. -6",
    ownerName: "गणेश कदम",
    occupantName: "प्रियांका कदम",
    description: "निवासी घर",
  },
  {
    serialNo: 28,
    propertyCode: "1/260",
    propertyNumber: "1/260",
    address: "वार्ड क्र. -6",
    ownerName: "तानाजी निकम",
    occupantName: "",
    description: "छोटे घर",
  },
  {
    serialNo: 29,
    propertyCode: "12/140",
    propertyNumber: "12/140",
    address: "वार्ड क्र. -3",
    ownerName: "विजया लांडगे",
    occupantName: "सुमित लांडगे",
    description: "पक्के घर",
  },
  {
    serialNo: 30,
    propertyCode: "12/300",
    propertyNumber: "12/300",
    address: "वार्ड क्र. -3",
    ownerName: "विक्रम सोनवणे",
    occupantName: "",
    description: "साधारण घर",
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
