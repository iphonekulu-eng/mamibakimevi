import Link from "next/link";
import { localeFromParam, getMessages, tPath } from "@/lib/i18n";

export default async function ApplySuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = localeFromParam(raw);
  const t = getMessages(locale);
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-serif text-4xl">{t.apply.successTitle}</h1>
      <p className="mt-4 text-muted">{t.apply.successText}</p>
      <Link className="btn-primary mt-8" href={tPath(locale, "/")}>
        {t.nav.home}
      </Link>
    </div>
  );
}
