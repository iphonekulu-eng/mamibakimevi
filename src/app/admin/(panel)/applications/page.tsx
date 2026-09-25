import Link from "next/link";
import { prisma } from "@/lib/prisma";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "⏳ Beklemede",
  APPROVED: "✅ Onaylı",
  REJECTED: "❌ Reddedildi",
};

const STATUS_CLASS: Record<string, string> = {
  PENDING: "bg-gold/20 text-ink",
  APPROVED: "bg-teal/10 text-teal",
  REJECTED: "bg-terracotta/10 text-terracotta",
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = ["PENDING", "APPROVED", "REJECTED"].includes(status || "")
    ? status
    : undefined;

  const list = await prisma.caregiver.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.caregiver.groupBy({
    by: ["status"],
    _count: true,
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]));

  const tabs = [
    { label: "Tümü", value: "", count: Object.values(countMap).reduce((a, b) => a + b, 0) },
    { label: "Beklemede", value: "PENDING", count: countMap.PENDING || 0 },
    { label: "Onaylı", value: "APPROVED", count: countMap.APPROVED || 0 },
    { label: "Reddedildi", value: "REJECTED", count: countMap.REJECTED || 0 },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl">Başvurular</h1>

      {/* Filtre sekmeleri */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `/admin/applications?status=${tab.value}` : "/admin/applications"}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              (status || "") === tab.value
                ? "bg-teal text-white"
                : "border border-ink/15 text-muted hover:bg-ink/5"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
              {tab.count}
            </span>
          </Link>
        ))}
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-cream/60">
            <tr>
              <th className="p-3">Ad Soyad</th>
              <th className="p-3">Şehir</th>
              <th className="p-3">Dil</th>
              <th className="p-3">Durum</th>
              <th className="p-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td className="p-4 text-muted" colSpan={5}>Kayıt bulunamadı.</td>
              </tr>
            )}
            {list.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-cream/40">
                <td className="p-3">
                  <Link className="font-semibold text-teal hover:underline" href={`/admin/applications/${c.id}`}>
                    {c.firstName} {c.lastName}
                  </Link>
                </td>
                <td className="p-3">{c.city} / {c.district}</td>
                <td className="p-3 uppercase">{c.applicationLocale}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[c.status] || ""}`}>
                    {STATUS_LABEL[c.status] || c.status}
                  </span>
                </td>
                <td className="p-3 text-muted">{c.createdAt.toLocaleDateString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
