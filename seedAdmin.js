// seedAdmins.js
// Run using: node seedAdmins.js

import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
// require("dotenv").config();

// MongoDB URI from .env
const uri = "mongodb://localhost:27017/grampanchayat"
  // "mongodb+srv://dronemart:keRn8WWZL1LcjDyw@cluster0.cirv6wv.mongodb.net/grampanchayat?retryWrites=true&w=majority";

const adminsToSeed = [
  {
    username: "superadmin",
    password: "superadmin123",
    role: "superadmin",
    gpCode: "nagardhan1",
    gpName: "नगरधन ग्रामपंचायत",
    address: "नगरधन",
    village: "नगरधन",
    tehsil: "रामटेक",
    district: "नागपूर",
    pincode: 440001,
    phone: 7121234567,
    mobile: 9876543210,
    email: "superadmin@example.com",
    profileImg: "/images/avatar/avatar.jpg",
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    gpCode: "nagardhan1",
    gpName: "नगरधन ग्रामपंचायत",
    address: "नगरधन",
    village: "नगरधन",
    tehsil: "रामटेक",
    district: "नागपूर",
    pincode: 440002,
    phone: 7129876543,
    mobile: 9876501234,
    email: "admin@example.com",
    profileImg: "/images/avatar/avatar.jpg",
  },
];

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("grampanchayat");
    const col = db.collection("admins");
    const deleteResult = await col.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing admin(s).`);

    for (const a of adminsToSeed) {
      const existing = await col.findOne({ username: a.username });
      if (existing) {
        console.log(`⚠️  Username "${a.username}" already exists — skipping.`);
        continue;
      }

      const hashed = await bcrypt.hash(a.password, 10);
      const result = await col.insertOne({
        ...a,
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✅ Inserted "${a.username}" with id ${result.insertedId}`);
    }

    console.log("🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

run();
