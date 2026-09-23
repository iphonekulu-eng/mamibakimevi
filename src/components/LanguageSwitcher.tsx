"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

function withLocale(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  if (parts[1] === "tr" || parts[1] === "ru") {
    parts[1] = next;
    const joined = parts.join("/") || `/${next}`;
    return joined.startsWith("/") ? joined : `/${joined}`;
  }
  return `/${next}`;
}

function FlagTR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" rx="3" fill="#E30A17" fillOpacity="0.72" />
      <circle cx="9.6" cy="8" r="4.1" fill="#fff" fillOpacity="0.92" />
      <circle cx="10.9" cy="8" r="3.25" fill="#E30A17" fillOpacity="0.72" />
      <polygon
        fill="#fff"
        fillOpacity="0.92"
        points="14.1,8 16.35,8.75 15.4,6.55 16.95,5.15 14.5,5.4 14.1,3.15 13.7,5.4 11.25,5.15 12.8,6.55 11.85,8.75"
      />
    </svg>
  );
}

function FlagRU({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden>
      <rect width="24" height="16" rx="3" fill="#fff" fillOpacity="0.55" />
      <rect y="5.35" width="24" height="5.3" fill="#0039A6" fillOpacity="0.68" />
      <path
        d="M0 10.65h24V13a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-2.35Z"
        fill="#D52B1E"
        fillOpacity="0.68"
      />
    </svg>
  );
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const t = getMessages(locale);
  const options: { code: Locale; Flag: typeof FlagTR }[] = [
    { code: "tr", Flag: FlagTR },
    { code: "ru", Flag: FlagRU },
  ];

  return (
    <div
      className="inline-flex items-center rounded-full border border-teal/20 bg-white/45 p-0.5 shadow-sm backdrop-blur-md"
      role="group"
      aria-label={t.lang.switch}
    >
      <span className="flex items-center gap-1 pl-2 pr-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
          <path
            d="M3.5 12h17M12 3c2.6 2.8 4 5.8 4 9s-1.4 6.2-4 9c-2.6-2.8-4-5.8-4-9s1.4-6.2 4-9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.85"
          />
        </svg>
        <span>{t.lang.label}</span>
      </span>
      {options.map(({ code, Flag }) => {
        const active = locale === code;
        return (
          <Link
            key={code}
            href={withLocale(pathname, code)}
            aria-current={active ? "true" : undefined}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition ${
              active
                ? "bg-teal text-white shadow-sm"
                : "text-teal-dark hover:bg-white/70"
            }`}
          >
            <Flag className={`h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 ${active ? "opacity-90" : "opacity-70"}`} />
            <span className="hidden min-[480px]:inline">{t.lang[code]}</span>
          </Link>
        );
      })}
    </div>
  );
}
