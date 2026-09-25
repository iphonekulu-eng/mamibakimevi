import { saveSettings, changeAdminPassword } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ pwError?: string; pwOk?: string }>;
}) {
  const rows = await prisma.setting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const { pwError, pwOk } = await searchParams;

  const pwErrors: Record<string, string> = {
    "1": "Yeni şifre en az 8 karakter olmalı veya alanlar boş bırakılamaz.",
    "2": "Yeni şifre ve tekrarı eşleşmiyor.",
    "3": "Mevcut şifre yanlış.",
  };

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="font-serif text-4xl">Ayarlar</h1>

      {/* WhatsApp bildirimleri */}
      <form action={saveSettings} className="card space-y-4 p-6">
        <h2 className="font-serif text-2xl">WhatsApp bildirimleri</h2>
        <p className="text-sm text-muted">
          Yeni iletişim taleplerinde admin'e bildirim gönderir. CALLMEBOT_APIKEY veya
          WhatsApp Cloud API (WHATSAPP_API_URL + WHATSAPP_TOKEN) gerekir.
        </p>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name="whatsappEnabled"
            defaultChecked={map.whatsappEnabled === "true"}
          />
          WhatsApp bildirimi açık
        </label>
        <label className="field">
          Admin WhatsApp numarası
          <input
            className="input"
            name="whatsappPhone"
            defaultValue={map.whatsappPhone || ""}
            placeholder="905556874803"
          />
        </label>
        <label className="field">
          API token (opsiyonel)
          <input
            className="input"
            name="whatsappToken"
            defaultValue={map.whatsappToken || ""}
          />
        </label>
        <button className="btn-primary" type="submit">Kaydet</button>
      </form>

      {/* Şifre değiştirme */}
      <form action={changeAdminPassword} className="card space-y-4 p-6">
        <h2 className="font-serif text-2xl">Şifre değiştir</h2>

        {pwOk && (
          <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm text-teal font-semibold">
            ✅ Şifre başarıyla değiştirildi.
          </p>
        )}
        {pwError && (
          <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta font-semibold">
            ❌ {pwErrors[pwError] || "Bir hata oluştu."}
          </p>
        )}

        <label className="field">
          Mevcut şifre
          <input className="input" name="currentPassword" type="password" required />
        </label>
        <label className="field">
          Yeni şifre <span className="text-muted font-normal">(en az 8 karakter)</span>
          <input className="input" name="newPassword" type="password" minLength={8} required />
        </label>
        <label className="field">
          Yeni şifre tekrar
          <input className="input" name="confirmPassword" type="password" required />
        </label>
        <button className="btn-primary" type="submit">Şifreyi değiştir</button>
      </form>
    </div>
  );
}
