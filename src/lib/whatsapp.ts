import { prisma } from "./prisma";

export async function notifyAdminWhatsApp(text: string) {
  const rows = await prisma.setting.findMany({
    where: { key: { in: ["whatsappEnabled", "whatsappPhone", "whatsappToken"] } },
  });
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  if (map.whatsappEnabled !== "true") {
    return { sent: false, reason: "disabled" as const };
  }

  const phone = map.whatsappPhone;
  const token = map.whatsappToken || process.env.WHATSAPP_TOKEN;
  const apiUrl = process.env.WHATSAPP_API_URL;

  if (!phone) return { sent: false, reason: "no-phone" as const };

  if (apiUrl && token) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone.replace(/\D/g, ""),
          type: "text",
          text: { body: text },
        }),
      });
      return { sent: res.ok, reason: res.ok ? ("ok" as const) : ("api-error" as const) };
    } catch {
      return { sent: false, reason: "network" as const };
    }
  }

  const callmeKey = process.env.CALLMEBOT_APIKEY;
  if (callmeKey) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(callmeKey)}`;
    try {
      const res = await fetch(url);
      return { sent: res.ok, reason: res.ok ? ("ok" as const) : ("api-error" as const) };
    } catch {
      return { sent: false, reason: "network" as const };
    }
  }

  return { sent: false, reason: "not-configured" as const };
}
