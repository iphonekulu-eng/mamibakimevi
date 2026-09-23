import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";

export const PUBLIC_UPLOAD = path.join(process.cwd(), "public", "uploads");
export const PRIVATE_UPLOAD = path.join(process.cwd(), "uploads");

export async function saveFile(
  file: File,
  destDir: string,
  prefix: string,
): Promise<{ storedPath: string; originalName: string; mimeType: string }> {
  await fs.mkdir(destDir, { recursive: true });
  const ext = path.extname(file.name || "").slice(0, 8) || "";
  const name = `${prefix}-${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const full = path.join(destDir, name);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(full, buf);
  return {
    storedPath: path.relative(process.cwd(), full).replace(/\\/g, "/"),
    originalName: file.name,
    mimeType: file.type || "application/octet-stream",
  };
}

export function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function ageFromYear(year?: number | null) {
  if (!year) return null;
  return new Date().getFullYear() - year;
}
