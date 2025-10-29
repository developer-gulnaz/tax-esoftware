import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Replace with your MongoDB URI
const uri = "mongodb+srv://dronemart:keRn8WWZL1LcjDyw@cluster0.cirv6wv.mongodb.net/grampanchayat?retryWrites=true&w=majority&appName=Cluster0";

// Admin info to insert
const admin = {
  gramPanchayat: "uppalwadi",
  username: "admin1",
  password: "123456", // plaintext, will be hashed
  role: "superadmin",
};

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("grampanchayat"); // replace with your DB name
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const result = await db.collection("admins").insertOne({
      gramPanchayat: admin.gramPanchayat,
      username: admin.username,
      password: hashedPassword,
      role: admin.role,
      createdAt: new Date(),
    });

    console.log("Admin inserted with ID:", result.insertedId);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
