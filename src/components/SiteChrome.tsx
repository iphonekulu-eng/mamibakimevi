import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getMessages, tPath } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

export function Header({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const links = [
    [t.nav.home, tPath(locale, "/")],
    [t.nav.caregivers, tPath(locale, "/caregivers")],
    [t.nav.apply, tPath(locale, "/apply")],
    [t.nav.jobs, tPath(locale, "/jobs")],
    [t.nav.about, tPath(locale, "/about")],
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={tPath(locale, "/")} className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold text-teal-dark">
            {t.brand}
          </span>
          <span className="hidden text-xs text-muted sm:inline">{t.tagline}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-teal">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link className="btn-primary px-4 py-1.5 text-sm" href={tPath(locale, "/apply")}>
            {t.nav.apply}
          </Link>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto px-4 pb-3 text-sm md:hidden">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="whitespace-nowrap text-teal-dark">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <footer className="mt-auto border-t border-ink/10 bg-teal-dark text-cream">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="font-serif text-2xl">{t.brand}</p>
        <p className="mt-2 max-w-2xl text-sm text-cream/80">{t.footer.disclaimer}</p>
        <p className="mt-6 text-xs text-cream/60">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
