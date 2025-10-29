import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;
if (!MONGODB_URI) throw new Error("❌ MONGO_URI is missing in .env");

let isConnected = false;

async function dbConnect() {
  if (isConnected) return;

  const db = await mongoose.connect(MONGODB_URI, {
    dbName: "grampanchayat", // ✅ update if your DB name is different
  });

  isConnected = db.connections[0].readyState === 1;
  console.log("✅ MongoDB Connected (Mongoose)");
}

export default dbConnect;
