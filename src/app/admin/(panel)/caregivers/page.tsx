import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CaregiversAdminPage() {
  const list = await prisma.caregiver.findMany({
    where: { status: "APPROVED" },
    orderBy: { publishedAt: "desc" },
  });
  return (
    <div>
      <h1 className="font-serif text-4xl">Yayınlanan bakıcılar</h1>
      <ul className="mt-6 space-y-3">
        {list.map((c) => (
          <li key={c.id} className="card p-4">
            <Link className="font-semibold text-teal" href={`/admin/caregivers/${c.id}`}>
              {c.firstName} {c.lastName}
            </Link>
            <p className="text-sm text-muted">
              {c.city} / {c.district} · {c.phone}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
