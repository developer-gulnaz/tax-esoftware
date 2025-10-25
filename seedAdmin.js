import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Replace with your MongoDB URI
const uri = "mongodb+srv://dronemart:keRn8WWZL1LcjDyw@cluster0.cirv6wv.mongodb.net/gampanchayat?retryWrites=true&w=majority&appName=Cluster0";

// Admin info to insert
const admin = {
  gramPanchayat: "uppalwadi",
  email: "superadmin@example.com",
  password: "123456", // plaintext, will be hashed
  role: "superadmin",
};

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("your_db_name"); // replace with your DB name
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const result = await db.collection("admins").insertOne({
      name: admin.name,
      email: admin.email,
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
