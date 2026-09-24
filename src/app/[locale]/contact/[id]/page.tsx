import { notFound } from "next/navigation";
import { submitContactRequest } from "@/app/actions";
import { CityDistrictFields } from "@/components/CityDistrictFields";
import { PageBanner } from "@/components/PageBanner";
import { localeFromParam, getMessages } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

const ADMIN_WHATSAPP = "905556874803";

function buildWaMessage(locale: string, caregiver: {
  firstName: string; lastName: string; city: string; district: string; experienceYears: number;
}) {
  if (locale === "ru") {
    return `Здравствуйте! Я хочу связаться через Mami Bakımevi.\n\nСиделка: ${caregiver.firstName} ${caregiver.lastName[0]}.\nГород: ${caregiver.city} / ${caregiver.district}\nОпыт: ${caregiver.experienceYears} лет`;
  }
  return `Merhaba, Mami Bakımevi üzerinden iletişime geçmek istiyorum.\n\nBakıcı: ${caregiver.firstName} ${caregiver.lastName[0]}.\nŞehir: ${caregiver.city} / ${caregiver.district}\nDeneyim: ${caregiver.experienceYears} yıl`;
}

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

  const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
    buildWaMessage(locale, caregiver)
  )}`;

  const waLabel = locale === "ru" ? "Написать в WhatsApp" : "WhatsApp ile Hızlı İletişim";
  const orLabel = locale === "ru" ? "или заполните форму ниже" : "ya da formu doldurabilirsiniz";

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

      {/* WhatsApp butonu */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 px-6 py-4 font-semibold text-[#128c5e] transition-all hover:bg-[#25d366]/20 hover:shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        {waLabel}
      </a>

      {/* Ayraç */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-ink/10" />
        <span className="text-sm text-muted">{orLabel}</span>
        <div className="h-px flex-1 bg-ink/10" />
      </div>

      {/* Form */}
      {error ? <p className="mb-4 text-terracotta">{t.apply.error}</p> : null}
      <form action={submitContactRequest} className="card space-y-4 p-6">
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
        <button className="btn-primary w-full" type="submit">
          {t.contact.submit}
        </button>
      </form>
    </div>
  );
}
