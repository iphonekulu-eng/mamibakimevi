import { notFound } from "next/navigation";
import { setApplicationStatus } from "@/app/actions";
import { parseList } from "@/lib/files";
import { prisma } from "@/lib/prisma";

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await prisma.caregiver.findUnique({
    where: { id },
    include: { documents: true },
  });
  if (!c) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-serif text-4xl">
        {c.firstName} {c.lastName}
      </h1>
      <p className="text-sm text-muted">Durum: {c.status}</p>
      <div className="card space-y-2 p-6 text-sm">
        <p>
          <b>Telefon:</b> {c.phone}
        </p>
        <p>
          <b>WhatsApp:</b> {c.whatsapp || "—"}
        </p>
        <p>
          <b>E-posta:</b> {c.email}
        </p>
        <p>
          <b>Konum:</b> {c.city} / {c.district}
        </p>
        <p>
          <b>Diller:</b> {parseList(c.languages).join(", ")}
        </p>
        <p>
          <b>Bakım:</b> {parseList(c.careTypes).join(", ")}
        </p>
        <p>
          <b>Çalışma:</b> {parseList(c.workTypes).join(", ")}
        </p>
        <p className="whitespace-pre-wrap">{c.bio}</p>
      </div>
      <div className="card p-6">
        <h2 className="font-semibold">Belgeler</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {c.documents.length === 0 ? <li>Belge yok</li> : null}
          {c.documents.map((d) => (
            <li key={d.id}>
              <a className="text-teal underline" href={`/api/admin/documents/${d.id}`}>
                {d.originalName}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form action={setApplicationStatus} className="card space-y-3 p-6">
        <input type="hidden" name="id" value={c.id} />
        <label className="field">
          Karar
          <select className="input" name="status" defaultValue={c.status}>
            <option value="PENDING">Beklemede</option>
            <option value="APPROVED">Onayla ve yayınla</option>
            <option value="REJECTED">Reddet</option>
          </select>
        </label>
        <label className="field">
          Red gerekçesi
          <textarea className="input" name="rejectionReason" defaultValue={c.rejectionReason || ""} />
        </label>
        <button className="btn-primary" type="submit">
          Kaydet
        </button>
      </form>
    </div>
  );
}
