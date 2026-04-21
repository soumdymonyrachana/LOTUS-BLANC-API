import { PrismaClient } from "@prisma/client";

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
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: "password123", // NOTE: In production, hash this with bcrypt!
    },
  });
  console.log(`✅ Admin user created: ${adminEmail}`);

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
