import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const map: Record<string, string> = {
    "elena@example.com": "/images/portraits/elena.jpg",
    "ayse@example.com": "/images/portraits/ayse.jpg",
    "mehmet@example.com": "/images/portraits/mehmet.jpg",
    "olga@example.com": "/images/portraits/olga.jpg",
  };
  for (const [email, photoPath] of Object.entries(map)) {
    await prisma.caregiver.updateMany({ where: { email }, data: { photoPath } });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
