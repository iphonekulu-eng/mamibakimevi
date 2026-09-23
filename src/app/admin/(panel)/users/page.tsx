import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-serif text-4xl">Kullanıcılar</h1>
      <p className="mt-2 text-muted">
        Bakıcı arayanların üye olması zorunlu değildir. Bu listede admin ve ileride eklenecek hesaplar yer alır.
      </p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-cream/60">
            <tr>
              <th className="p-3">Ad</th>
              <th className="p-3">E-posta</th>
              <th className="p-3">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
