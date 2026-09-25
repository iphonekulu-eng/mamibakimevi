import Link from "next/link";
import { toggleFeatured } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function CaregiversAdminPage() {
  const list = await prisma.caregiver.findMany({
    where: { status: "APPROVED" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-serif text-4xl">Yayınlanan bakıcılar</h1>
      <p className="mt-1 text-sm text-muted">
        ⭐ öne çıkan bakıcılar ana sayfada gösterilir.
      </p>
      <ul className="mt-6 space-y-3">
        {list.map((c) => (
          <li key={c.id} className={`card flex items-center justify-between gap-4 p-4 ${c.featured ? "border-gold/50 bg-gold/5" : ""}`}>
            <div>
              <div className="flex items-center gap-2">
                {c.featured && <span className="text-gold">⭐</span>}
                <Link className="font-semibold text-teal" href={`/admin/caregivers/${c.id}`}>
                  {c.firstName} {c.lastName}
                </Link>
              </div>
              <p className="text-sm text-muted">
                {c.city} / {c.district} · {c.phone}
              </p>
            </div>
            <form action={toggleFeatured}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  c.featured
                    ? "bg-gold/20 text-ink hover:bg-gold/40"
                    : "border border-gold/40 text-muted hover:bg-gold/10"
                }`}
              >
                {c.featured ? "⭐ Öne çıkarıldı" : "Öne çıkar"}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
