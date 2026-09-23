import { localeFromParam, getMessages } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { PageBanner } from "@/components/PageBanner";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = localeFromParam((await params).locale);
  const t = getMessages(locale);
  const jobs = await prisma.jobPosting.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageBanner
        src="/images/jobs-home.jpg"
        alt={t.images.jobs}
        title={t.jobs.title}
        subtitle={t.jobs.subtitle}
      />
      {jobs.length === 0 ? (
        <p className="mt-10 text-muted">{t.jobs.empty}</p>
      ) : (
        <div className="mt-8 space-y-4">
          {jobs.map((job) => (
            <article key={job.id} className="card p-6">
              <h2 className="font-serif text-2xl">{job.title}</h2>
              <p className="text-sm text-muted">
                {job.city}
                {job.district ? ` / ${job.district}` : ""}
              </p>
              <p className="mt-3 whitespace-pre-wrap">{job.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
