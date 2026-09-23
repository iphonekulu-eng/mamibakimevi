import { localeFromParam, getMessages } from "@/lib/i18n";
import { PageBanner } from "@/components/PageBanner";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeFromParam((await params).locale);
  const t = getMessages(locale);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <PageBanner src="/images/about-home.jpg" alt={t.images.about} title={t.about.title} />
      <div className="space-y-4 text-lg text-muted">
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <p>{t.about.p3}</p>
      </div>
    </div>
  );
}
