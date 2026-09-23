import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "mami_admin";
const WEEK = 7 * 24 * 60 * 60 * 1000;

function secret() {
  return process.env.ADMIN_SECRET || "dev-mami-bakimevi-secret-change-me";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export async function createAdminSession() {
  const payload = JSON.stringify({ role: "ADMIN", exp: Date.now() + WEEK });
  const value = Buffer.from(payload).toString("base64url") + "." + sign(payload);
  const jar = await cookies();
  jar.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: WEEK / 1000,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdmin() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const [b64, sig] = raw.split(".");
  if (!b64 || !sig) return false;
  const payload = Buffer.from(b64, "base64url").toString("utf8");
  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(payload) as { role?: string; exp?: number };
    return data.role === "ADMIN" && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
