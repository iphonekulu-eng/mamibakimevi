import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const full = path.join(process.cwd(), "uploads", "documents", path.basename(doc.storedPath));
  try {
    const buf = await readFile(full);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(doc.originalName)}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Missing file" }, { status: 404 });
  }
}
