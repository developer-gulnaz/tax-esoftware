import { NextRequest, NextResponse } from "next/server";
import clientPromise from "lib/db";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("gramp-panchayat"); // replace with your DB
 
    const admin = await db.collection("admin").findOne({ username: username.trim() });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Return admin info (you can also generate JWT here later)
    return NextResponse.json({
      message: "Login successful",
      admin: { id: admin._id, gramPanchayat: admin.gramPanchayat, username: admin.username, role: admin.role },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
