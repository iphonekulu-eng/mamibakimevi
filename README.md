# Mami Bakimevi

Admin kontrollü bakıcı eşleştirme platformu. Türkçe ve Rusça arayüz. Bakıcı telefonu ziyaretçilere gösterilmez; iletişim talepleri admin paneline düşer.

## Çalıştırma

Node.js PATH’te olmalı (`C:\Program Files\nodejs`).

```bash
cd mami-web
copy .env.example .env
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Açılan adres: [http://localhost:3000](http://localhost:3000) (Türkçe `/tr`, Rusça `/ru`).

### Admin

- Adres: `/admin/login`
- E-posta: `admin@mamibakimevi.com`
- Şifre: `Admin123!`

## Akış

1. Bakıcı `/tr/apply` veya `/ru/apply` üzerinden başvuru doldurur, belge yükler.
2. Başvuru **PENDING** kalır; admin onaylamadan yayınlanmaz.
3. Onaylanan bakıcılar arama sayfasında listelenir (telefon / WhatsApp / e-posta gizli).
4. “İletişime Geçmek İstiyorum” admin’e talep oluşturur.
5. Admin ayarlarından WhatsApp bildirimi açılabilir (`WHATSAPP_API_URL` + token veya `CALLMEBOT_APIKEY`).

Admin onayı resmi veya mesleki doğrulama anlamına gelmez; bu uyarı profillerde görünür.
