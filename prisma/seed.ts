import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Seed Categories
  const categories = [
    { name: "Starters" },
    { name: "Main Course" },
    { name: "Desserts" },
    { name: "Drinks" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories seeded");

  // 2. Seed Admin User
  const adminEmail = "lotusblanc@email.com";
  const hashedPassword = await bcrypt.hash("123123", 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log("✅ Admin user created");

  console.log("🏁 Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
