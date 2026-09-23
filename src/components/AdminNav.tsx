import Link from "next/link";
import { adminLogout } from "@/app/actions";

const LINKS = [
  ["Özet", "/admin"],
  ["Başvurular", "/admin/applications"],
  ["Bakıcılar", "/admin/caregivers"],
  ["İletişim talepleri", "/admin/requests"],
  ["İş ilanları", "/admin/jobs"],
  ["Kullanıcılar", "/admin/users"],
  ["Şikayetler", "/admin/complaints"],
  ["Ayarlar", "/admin/settings"],
] as const;

export function AdminNav() {
  return (
    <aside className="w-full shrink-0 border-b border-ink/10 bg-teal-dark p-4 text-cream md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <Link href="/admin" className="font-serif text-2xl">
        Mami Admin
      </Link>
      <nav className="mt-6 flex flex-wrap gap-2 md:flex-col">
        {LINKS.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm hover:bg-white/10">
            {label}
          </Link>
        ))}
      </nav>
      <form action={adminLogout} className="mt-8">
        <button className="text-sm text-cream/70 underline" type="submit">
          Çıkış
        </button>
      </form>
    </aside>
  );
}
