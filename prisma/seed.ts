import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@mamibakimevi.com" },
    update: { passwordHash, role: "ADMIN" },
    create: {
      email: "admin@mamibakimevi.com",
      name: "Mami Admin",
      role: "ADMIN",
      passwordHash,
    },
  });

  await prisma.setting.upsert({
    where: { key: "whatsappEnabled" },
    update: {},
    create: { key: "whatsappEnabled", value: "false" },
  });
  await prisma.setting.upsert({
    where: { key: "whatsappPhone" },
    update: {},
    create: { key: "whatsappPhone", value: "" },
  });

  await prisma.caregiver.deleteMany();

  const approved = await prisma.caregiver.create({
    data: {
      firstName: "Elena",
      lastName: "Petrova",
      gender: "FEMALE",
      birthYear: 1988,
      city: "İstanbul",
      district: "Kadıköy",
      phone: "+905551111111",
      whatsapp: "+905551111111",
      email: "elena@example.com",
      languages: JSON.stringify(["ru", "tr"]),
      careTypes: JSON.stringify(["ELDERLY", "ALZHEIMER"]),
      workTypes: JSON.stringify(["LIVE_IN", "DAYTIME"]),
      experienceYears: 8,
      bio: "Yaşlı bakımı ve Alzheimer konusunda deneyimliyim. Rusça ve Türkçe konuşuyorum.",
      photoPath: "/images/portraits/elena.jpg",
      status: "APPROVED",
      publishedAt: new Date(),
      applicationLocale: "ru",
    },
  });

  await prisma.caregiver.createMany({
    data: [
      {
        firstName: "Ayşe",
        lastName: "Yılmaz",
        gender: "FEMALE",
        birthYear: 1982,
        city: "Ankara",
        district: "Çankaya",
        phone: "+905552222222",
        whatsapp: "+905552222222",
        email: "ayse@example.com",
        languages: JSON.stringify(["tr"]),
        careTypes: JSON.stringify(["ELDERLY", "PATIENT"]),
        workTypes: JSON.stringify(["DAYTIME", "HOURLY"]),
        experienceYears: 12,
        bio: "Hasta ve yaşlı bakımında 12 yıllık deneyim. Gündüzlü ve saatlik çalışabilirim.",
        photoPath: "/images/portraits/ayse.jpg",
        status: "APPROVED",
        publishedAt: new Date(),
        applicationLocale: "tr",
      },
      {
        firstName: "Mehmet",
        lastName: "Demir",
        gender: "MALE",
        birthYear: 1990,
        city: "İzmir",
        district: "Karşıyaka",
        phone: "+905553333333",
        whatsapp: "+905553333333",
        email: "mehmet@example.com",
        languages: JSON.stringify(["tr", "en"]),
        careTypes: JSON.stringify(["PATIENT", "POST_OP"]),
        workTypes: JSON.stringify(["LIVE_IN"]),
        experienceYears: 6,
        bio: "Ameliyat sonrası ev bakımı ve hasta refakati yapıyorum.",
        photoPath: "/images/portraits/mehmet.jpg",
        status: "APPROVED",
        publishedAt: new Date(),
        applicationLocale: "tr",
      },
      {
        firstName: "Olga",
        lastName: "Ivanova",
        gender: "FEMALE",
        birthYear: 1985,
        city: "Antalya",
        district: "Muratpaşa",
        phone: "+905554444444",
        email: "olga@example.com",
        languages: JSON.stringify(["ru", "en"]),
        careTypes: JSON.stringify(["ELDERLY", "PALLIATIVE"]),
        workTypes: JSON.stringify(["LIVE_IN", "FLEXIBLE"]),
        experienceYears: 9,
        bio: "Пalliative and elderly care. I speak Russian and English.",
        photoPath: "/images/portraits/olga.jpg",
        status: "PENDING",
        applicationLocale: "ru",
      },
      {
        firstName: "Dilnoza",
        lastName: "Karimova",
        gender: "FEMALE",
        birthYear: 1991,
        city: "İstanbul",
        district: "Pendik",
        phone: "+905555555555",
        whatsapp: "+905555555555",
        email: "dilnoza@example.com",
        languages: JSON.stringify(["uz", "ru", "tr"]),
        careTypes: JSON.stringify(["ELDERLY", "PATIENT"]),
        workTypes: JSON.stringify(["LIVE_IN", "DAYTIME"]),
        experienceYears: 7,
        bio: "Özbekistan’dan geldim. Yaşlı ve hasta bakımında çalışıyorum. Özbekçe, Rusça ve Türkçe konuşuyorum.",
        photoPath: "/images/portraits/dilnoza.jpg",
        status: "APPROVED",
        publishedAt: new Date(),
        applicationLocale: "ru",
      },
    ],
  });

  await prisma.contactRequest.create({
    data: {
      caregiverId: approved.id,
      seekerName: "Can Özkan",
      seekerPhone: "+905559999000",
      city: "İstanbul",
      district: "Kadıköy",
      careNeed: "Yaşlı bakımı",
      message: "Annem için yatılı bakıcı arıyoruz.",
      status: "NEW",
    },
  });

  await prisma.complaint.create({
    data: {
      reporterName: "Ziyaretçi",
      subject: "Örnek şikayet",
      body: "Demo kayıt.",
      status: "NEW",
    },
  });

  await prisma.jobPosting.create({
    data: {
      title: "Kadıköy’de gündüzlü yaşlı bakımı",
      city: "İstanbul",
      district: "Kadıköy",
      careType: "ELDERLY",
      workType: "DAYTIME",
      description: "Gündüz saatlerinde evde yaşlı bakımı.",
      status: "PUBLISHED",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
