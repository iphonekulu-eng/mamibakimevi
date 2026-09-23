import { submitComplaint } from "@/app/actions";
import { localeFromParam, getMessages } from "@/lib/i18n";
import { PageBanner } from "@/components/PageBanner";

export default async function ComplaintPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ok?: string }>;
}) {
  const locale = localeFromParam((await params).locale);
  const t = getMessages(locale);
  const { ok } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <PageBanner
        src="/images/complaint-help.jpg"
        alt={t.images.complaint}
        title={t.complaint.title}
        subtitle={t.complaint.subtitle}
      />
      {ok ? <p className="mt-4 text-teal">{t.complaint.success}</p> : null}
      <form action={submitComplaint} className="card mt-8 space-y-4 p-6">
        <input type="hidden" name="locale" value={locale} />
        <label className="field">
          {t.complaint.name}
          <input className="input" name="reporterName" required />
        </label>
        <label className="field">
          {t.complaint.phone}
          <input className="input" name="reporterPhone" />
        </label>
        <label className="field">
          {t.complaint.subject}
          <input className="input" name="subject" required />
        </label>
        <label className="field">
          {t.complaint.caregiverId}
          <input className="input" name="caregiverId" />
        </label>
        <label className="field">
          {t.complaint.body}
          <textarea className="input min-h-32" name="body" required />
        </label>
        <button className="btn-primary" type="submit">
          {t.complaint.submit}
        </button>
      </form>
    </div>
  );
}
