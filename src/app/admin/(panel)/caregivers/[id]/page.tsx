import { notFound } from "next/navigation";
import { updateCaregiverAdmin } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function CaregiverEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await prisma.caregiver.findUnique({ where: { id } });
  if (!c) notFound();
  return (
    <form action={updateCaregiverAdmin} className="card max-w-2xl space-y-4 p-6">
      <h1 className="font-serif text-3xl">Profili düzenle</h1>
      <input type="hidden" name="id" value={c.id} />
      <label className="field">
        Ad
        <input className="input" name="firstName" defaultValue={c.firstName} />
      </label>
      <label className="field">
        Soyad
        <input className="input" name="lastName" defaultValue={c.lastName} />
      </label>
      <label className="field">
        Şehir
        <input className="input" name="city" defaultValue={c.city} />
      </label>
      <label className="field">
        İlçe
        <input className="input" name="district" defaultValue={c.district} />
      </label>
      <label className="field">
        Telefon
        <input className="input" name="phone" defaultValue={c.phone} />
      </label>
      <label className="field">
        WhatsApp
        <input className="input" name="whatsapp" defaultValue={c.whatsapp || ""} />
      </label>
      <label className="field">
        E-posta
        <input className="input" name="email" defaultValue={c.email} />
      </label>
      <label className="field">
        Deneyim
        <input className="input" name="experienceYears" type="number" defaultValue={c.experienceYears} />
      </label>
      <label className="field">
        Hakkında
        <textarea className="input min-h-32" name="bio" defaultValue={c.bio} />
      </label>
      <label className="field">
        Admin notu
        <textarea className="input" name="adminNotes" defaultValue={c.adminNotes || ""} />
      </label>
      <button className="btn-primary" type="submit">
        Kaydet
      </button>
    </form>
  );
}
