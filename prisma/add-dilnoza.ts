import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.caregiver.findFirst({
    where: { email: "dilnoza@example.com" },
  });
  if (existing) {
    await prisma.caregiver.update({
      where: { id: existing.id },
      data: { photoPath: "/images/portraits/dilnoza.jpg", status: "APPROVED" },
    });
    return;
  }
  await prisma.caregiver.create({
    data: {
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
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
