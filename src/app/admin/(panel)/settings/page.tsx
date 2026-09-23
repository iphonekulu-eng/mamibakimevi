import { saveSettings } from "@/app/actions";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const rows = await prisma.setting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return (
    <form action={saveSettings} className="card max-w-xl space-y-4 p-6">
      <h1 className="font-serif text-3xl">Sistem ayarları</h1>
      <p className="text-sm text-muted">
        Yeni iletişim taleplerinde admin WhatsApp bildirimi. WhatsApp Cloud API için
        WHATSAPP_API_URL ve WHATSAPP_TOKEN ortam değişkenlerini de doldurun. Alternatif:
        CALLMEBOT_APIKEY.
      </p>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" name="whatsappEnabled" defaultChecked={map.whatsappEnabled === "true"} />
        WhatsApp bildirimi açık
      </label>
      <label className="field">
        Admin WhatsApp numarası
        <input className="input" name="whatsappPhone" defaultValue={map.whatsappPhone || ""} placeholder="90555..." />
      </label>
      <label className="field">
        API token (opsiyonel, ayar olarak saklanır)
        <input className="input" name="whatsappToken" defaultValue={map.whatsappToken || ""} />
      </label>
      <button className="btn-primary" type="submit">
        Kaydet
      </button>
    </form>
  );
}
