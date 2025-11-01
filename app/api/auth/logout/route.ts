import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import dbConnect from "lib/db";
import SessionModel from "models/Session";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "sid";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const sid = req.cookies.get(COOKIE_NAME)?.value;

    if (sid) {
      // Mark session as inactive instead of deleting it
      await SessionModel.updateOne(
        { sessionId: sid },
        { $set: { active: false, revoked: true, expiresAt: new Date() } }
      );
    }

    // Clear session cookie
    const cleared = cookie.serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    const res = NextResponse.json({ success: true, message: "Logged out successfully" });
    res.headers.set("Set-Cookie", cleared);
    return res;
  } catch (err: any) {
    console.error("Logout error:", err);
    return NextResponse.json(
      { success: false, message: "Logout failed", error: err.message },
      { status: 500 }
    );
  }
}
