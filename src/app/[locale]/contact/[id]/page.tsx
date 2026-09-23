import { notFound } from "next/navigation";
import { submitContactRequest } from "@/app/actions";
import { CityDistrictFields } from "@/components/CityDistrictFields";
import { PageBanner } from "@/components/PageBanner";
import { localeFromParam, getMessages } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale: raw, id } = await params;
  const locale = localeFromParam(raw);
  const t = getMessages(locale);
  const { error } = await searchParams;
  const caregiver = await prisma.caregiver.findFirst({
    where: { id, status: "APPROVED" },
  });
  if (!caregiver) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <PageBanner
        src="/images/contact-care.jpg"
        alt={t.images.contact}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />
      <p className="mt-4 font-medium">
        {caregiver.firstName} {caregiver.lastName[0]}. · {caregiver.city}
      </p>
      {error ? <p className="mt-3 text-terracotta">{t.apply.error}</p> : null}
      <form action={submitContactRequest} className="card mt-8 space-y-4 p-6">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="caregiverId" value={caregiver.id} />
        <label className="field">
          {t.contact.name}
          <input className="input" name="seekerName" required />
        </label>
        <label className="field">
          {t.contact.phone}
          <input className="input" name="seekerPhone" required />
        </label>
        <label className="field">
          {t.contact.email}
          <input className="input" name="seekerEmail" type="email" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <CityDistrictFields cityLabel={t.contact.city} districtLabel={t.contact.district} />
        </div>
        <label className="field">
          {t.contact.careNeed}
          <input className="input" name="careNeed" />
        </label>
        <label className="field">
          {t.contact.message}
          <textarea className="input min-h-32" name="message" required />
        </label>
        <button className="btn-primary" type="submit">
          {t.contact.submit}
        </button>
      </form>
    </div>
  );
}
