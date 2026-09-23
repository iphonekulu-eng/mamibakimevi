import Link from "next/link";
import { parseList } from "@/lib/files";
import { getMessages, tPath } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import type { Caregiver } from "@prisma/client";

export function CaregiverCard({
  locale,
  caregiver,
}: {
  locale: Locale;
  caregiver: Caregiver;
}) {
  const t = getMessages(locale);
  const langs = parseList(caregiver.languages);
  const cares = parseList(caregiver.careTypes);
  const works = parseList(caregiver.workTypes);
  return (
    <article className="card overflow-hidden">
      <div className="relative aspect-[4/5] bg-sage/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={caregiver.photoPath || "/images/placeholder-caregiver.jpg"}
          alt={t.images.portrait}
          className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        />
      </div>
      <div className="space-y-1.5 p-3.5">
        <h3 className="font-serif text-xl leading-tight">
          {caregiver.firstName} {caregiver.lastName[0]}.
        </h3>
        <p className="text-xs text-muted">
          {caregiver.city} / {caregiver.district} · {caregiver.experienceYears}{" "}
          {t.search.years}
        </p>
        <p className="flex flex-wrap gap-1 text-[11px]">
          {langs.map((l) => (
            <span key={l} className="rounded-full bg-cream px-2 py-0.5">
              {t.spoken[l as keyof typeof t.spoken] || l}
            </span>
          ))}
        </p>
        <p className="line-clamp-2 text-xs text-muted">{caregiver.bio}</p>
        <div className="flex flex-wrap gap-1 text-[11px] text-teal-dark">
          {cares.map((c) => (
            <span key={c}>{t.care[c as keyof typeof t.care] || c}</span>
          ))}
          {works.map((w) => (
            <span key={w}>· {t.work[w as keyof typeof t.work] || w}</span>
          ))}
        </div>
        <Link
          className="btn-primary mt-1.5 w-full px-3 py-2 text-xs"
          href={tPath(locale, `/caregivers/${caregiver.id}`)}
        >
          {t.search.viewProfile}
        </Link>
      </div>
    </article>
  );
}
