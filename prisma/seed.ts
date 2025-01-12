import { routerDriver, users } from "./constants";
import { prisma } from "./prisma-client";

async function up() {
  await prisma.user.createMany({
    data: users,
  });

  await prisma.routeDriver.createMany({
    data: routerDriver,
  });
}

async function down() {
  await prisma.$executeRaw`DELETE FROM "User"`;
  await prisma.$executeRaw`DELETE FROM "RouteDriver"`;
  // Видаляйте інші таблиці, якщо це потрібно:
  // await prisma.$executeRaw`DELETE FROM "IntermediateStop"`;
  // await prisma.$executeRaw`DELETE FROM "Passenger"`;
  // await prisma.$executeRaw`DELETE FROM "OrderedRoute"`;
  // await prisma.$executeRaw`DELETE FROM "OrderSeat"`;
  // await prisma.$executeRaw`DELETE FROM "VariantBusSeats"`;

  // Скидання ідентифікаторів для таблиць (SQLite специфічне):
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "User"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "RouteDriver"`;
  // Додайте для інших таблиць за необхідності
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
