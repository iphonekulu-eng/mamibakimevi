import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminNav />
      <div className="flex-1 bg-cream p-6">{children}</div>
    </div>
  );
}
