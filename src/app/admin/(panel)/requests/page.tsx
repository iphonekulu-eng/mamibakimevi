import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function RequestsPage() {
  const list = await prisma.contactRequest.findMany({
    include: { caregiver: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <h1 className="font-serif text-4xl">İletişim talepleri</h1>
      <div className="mt-6 space-y-3">
        {list.map((r) => (
          <Link key={r.id} href={`/admin/requests/${r.id}`} className="card block p-4">
            <div className="flex justify-between gap-4">
              <p className="font-semibold">
                {r.seekerName} → {r.caregiver.firstName} {r.caregiver.lastName}
              </p>
              <span className="text-sm">{r.status}</span>
            </div>
            <p className="text-sm text-muted">
              {r.seekerPhone} · {r.createdAt.toLocaleString("tr-TR")}
              {r.whatsappNotified ? " · WhatsApp bildirildi" : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
