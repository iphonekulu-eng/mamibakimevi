import { saveJob } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function JobsAdminPage() {
  const jobs = await prisma.jobPosting.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={saveJob} className="card space-y-3 p-6">
        <h1 className="font-serif text-3xl">Yeni iş ilanı</h1>
        <label className="field">
          Başlık
          <input className="input" name="title" required />
        </label>
        <label className="field">
          Şehir
          <input className="input" name="city" required />
        </label>
        <label className="field">
          İlçe
          <input className="input" name="district" />
        </label>
        <label className="field">
          Açıklama
          <textarea className="input min-h-32" name="description" required />
        </label>
        <label className="field">
          Durum
          <select className="input" name="status" defaultValue="PUBLISHED">
            <option value="DRAFT">Taslak</option>
            <option value="PUBLISHED">Yayınla</option>
            <option value="CLOSED">Kapalı</option>
          </select>
        </label>
        <button className="btn-primary" type="submit">
          Kaydet
        </button>
      </form>
      <div>
        <h2 className="font-serif text-2xl">Kayıtlı ilanlar</h2>
        <ul className="mt-4 space-y-3">
          {jobs.map((j) => (
            <li key={j.id} className="card p-4">
              <p className="font-semibold">{j.title}</p>
              <p className="text-sm text-muted">
                {j.city} · {j.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
