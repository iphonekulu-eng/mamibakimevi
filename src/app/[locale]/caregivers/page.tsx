import { CaregiverCard } from "@/components/CaregiverCard";
import { PageBanner } from "@/components/PageBanner";
import { CARE_TYPES, CITY_NAMES, CITIES, GENDERS, LANGUAGES, WORK_TYPES } from "@/lib/constants";
import { localeFromParam, getMessages, tPath } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function CaregiversPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: raw } = await params;
  const locale = localeFromParam(raw);
  const t = getMessages(locale);
  const q = await searchParams;
  const city = String(q.city || "");
  const district = String(q.district || "");
  const careType = String(q.careType || "");
  const workType = String(q.workType || "");
  const gender = String(q.gender || "");
  const language = String(q.language || "");
  const experience = Number(q.experience || 0);

  const where: Prisma.CaregiverWhereInput = { status: "APPROVED" };
  if (city) where.city = city;
  if (district) where.district = district;
  if (gender) where.gender = gender;
  if (experience) where.experienceYears = { gte: experience };
  if (careType) where.careTypes = { contains: careType };
  if (workType) where.workTypes = { contains: workType };
  if (language) where.languages = { contains: `"${language}"` };

  let list: Awaited<ReturnType<typeof prisma.caregiver.findMany>> = [];
  try {
    list = await prisma.caregiver.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // DB bağlantısı yoksa boş liste ile devam et
  }

  const districts = city ? CITIES[city] || [] : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PageBanner
        src="/images/search-banner.jpg"
        alt={t.images.search}
        title={t.search.title}
        subtitle={t.search.subtitle}
      />
      <form className="card mt-8 grid gap-4 p-5 md:grid-cols-4" method="get">
        <label className="field">
          {t.search.city}
          <select className="input" name="city" defaultValue={city}>
            <option value="">{t.search.all}</option>
            {CITY_NAMES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.district}
          <select className="input" name="district" defaultValue={district}>
            <option value="">{t.search.all}</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.careType}
          <select className="input" name="careType" defaultValue={careType}>
            <option value="">{t.search.all}</option>
            {CARE_TYPES.map((c) => (
              <option key={c} value={c}>
                {t.care[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.workType}
          <select className="input" name="workType" defaultValue={workType}>
            <option value="">{t.search.all}</option>
            {WORK_TYPES.map((c) => (
              <option key={c} value={c}>
                {t.work[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.gender}
          <select className="input" name="gender" defaultValue={gender}>
            <option value="">{t.search.all}</option>
            {GENDERS.map((c) => (
              <option key={c} value={c}>
                {t.gender[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.language}
          <select className="input" name="language" defaultValue={language}>
            <option value="">{t.search.all}</option>
            {LANGUAGES.map((c) => (
              <option key={c} value={c}>
                {t.spoken[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          {t.search.experience}
          <input className="input" name="experience" type="number" min={0} defaultValue={experience || ""} />
        </label>
        <div className="flex items-end gap-2">
          <button className="btn-primary" type="submit">
            {t.search.applyFilters}
          </button>
          <a className="btn-ghost" href={tPath(locale, "/caregivers")}>
            {t.search.reset}
          </a>
        </div>
      </form>
      {list.length === 0 ? (
        <p className="mt-10 text-muted">{t.search.empty}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <CaregiverCard key={c.id} locale={locale} caregiver={c} />
          ))}
        </div>
      )}
    </div>
  );
}
