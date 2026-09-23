import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  const list = await prisma.caregiver.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-serif text-4xl">Başvurular</h1>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-cream/60">
            <tr>
              <th className="p-3">Ad</th>
              <th className="p-3">Şehir</th>
              <th className="p-3">Dil</th>
              <th className="p-3">Durum</th>
              <th className="p-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="p-3">
                  <Link className="font-semibold text-teal" href={`/admin/applications/${c.id}`}>
                    {c.firstName} {c.lastName}
                  </Link>
                </td>
                <td className="p-3">
                  {c.city} / {c.district}
                </td>
                <td className="p-3 uppercase">{c.applicationLocale}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">{c.createdAt.toLocaleDateString("tr-TR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
