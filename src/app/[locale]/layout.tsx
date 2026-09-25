import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/SiteChrome";
import { SplashScreen } from "@/components/SplashScreen";
import { CookieBanner } from "@/components/CookieBanner";
import { isLocale, localeFromParam } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = localeFromParam(locale);
  return (
    <div className="flex min-h-screen flex-col">
      <SplashScreen locale={loc} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
    </div>
  );
}
