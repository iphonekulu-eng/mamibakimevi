import { updateComplaintStatus } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function ComplaintsPage() {
  const list = await prisma.complaint.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-serif text-4xl">Şikayetler</h1>
      <div className="mt-6 space-y-4">
        {list.map((c) => (
          <article key={c.id} className="card p-5">
            <h2 className="font-semibold">{c.subject}</h2>
            <p className="text-sm text-muted">
              {c.reporterName} · {c.reporterPhone || "—"} · {c.status}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{c.body}</p>
            <form action={updateComplaintStatus} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="id" value={c.id} />
              <select className="input max-w-xs" name="status" defaultValue={c.status}>
                <option value="NEW">Yeni</option>
                <option value="REVIEWED">İncelendi</option>
                <option value="RESOLVED">Çözüldü</option>
                <option value="DISMISSED">Reddedildi</option>
              </select>
              <input className="input max-w-xs" name="adminNotes" placeholder="Not" defaultValue={c.adminNotes || ""} />
              <button className="btn-primary" type="submit">
                Güncelle
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
