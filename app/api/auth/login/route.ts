import bcrypt from "bcryptjs";
import dbConnect from "lib/db";
import Admin from "models/Admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // ✅ ensure mongoose connected

    const { username, gpCode, financialYear, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username: username.trim() });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful ✅",
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        gpCode: admin.gpCode,
        gpName: admin.gpName,
        address: admin.address,
        tehsil: admin.tehsil,
        district: admin.district,
        pincode: admin.pincode,
        phone: admin.phone,
        mobile: admin.mobile,
        email: admin.email,
        profileImg: admin.profileImg,
      },
    });

  } catch (error: any) {
    console.error("Login Error:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
