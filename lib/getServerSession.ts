import { NextRequest } from "next/server";
import { getSessionById } from "./session";

const COOKIE_NAME = "sid";

export async function getServerSession(req: NextRequest) {
  const sid = req.cookies.get(COOKIE_NAME)?.value;
  if (!sid) return null;
  return await getSessionById(sid);
}
