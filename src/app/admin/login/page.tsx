import { adminLogin } from "@/app/actions";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form action={adminLogin} className="card w-full max-w-md space-y-4 p-8">
        <h1 className="font-serif text-3xl">Mami Bakimevi Admin</h1>
        {error ? <p className="text-terracotta">E-posta veya şifre hatalı.</p> : null}
        <label className="field">
          E-posta
          <input className="input" name="email" type="email" required defaultValue="admin@mamibakimevi.com" />
        </label>
        <label className="field">
          Şifre
          <input className="input" name="password" type="password" required />
        </label>
        <button className="btn-primary w-full" type="submit">
          Giriş
        </button>
      </form>
    </div>
  );
}
