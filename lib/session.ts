import crypto from "crypto";
import cookie from "cookie";
import dbConnect from "lib/db";
import SessionModel from "models/Session";

const COOKIE_NAME = "sid";
const TTL = 3600; // 1 hour
const IS_PROD = process.env.NODE_ENV === "production";

export function createSessionCookieHeader(sessionId: string) {
    const cookieStr = cookie.serialize(COOKIE_NAME, sessionId, {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "strict",
        path: "/",
        maxAge: TTL,
    });
    return cookieStr;
}

export async function createSession({ userId, username, role, ip, userAgent }: any) {
    await dbConnect();

    const sessionId = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + TTL * 1000);

    const session = await SessionModel.create({
        sessionId,
        userId,
        username,
        role,
        expiresAt,
        ip,
        userAgent,
        active: true,
        lastActiveAt: new Date(),
    });

    const cookieHeader = createSessionCookieHeader(sessionId);
    return { session, cookieHeader };
}

export async function getSessionById(sessionId?: string) {
    if (!sessionId) return null;
    await dbConnect();

    const session = await SessionModel.findOne({ sessionId });

    if (!session || session.revoked || !session.active) return null;

    const now = Date.now();
    const lastActive = new Date(session.lastActiveAt).getTime();

    // Check if inactive for more than 1 hour
    if (now - lastActive > 3600 * 1000) {
        session.active = false;
        await session.save();
        return null;
    }

    // Update last active timestamp
    session.lastActiveAt = new Date();
    session.expiresAt = new Date(now + 3600 * 1000);
    await session.save();

    return session.toObject();
}


export async function revokeSession(sessionId: string) {
    await dbConnect();
    return SessionModel.updateOne({ sessionId }, { $set: { revoked: true, active: false } });
}

export async function destroySession(sessionId: string) {
    await dbConnect();
    return SessionModel.deleteOne({ sessionId });
}
