import { routerDrivers, users } from "./constants";
import { prisma } from "./prisma-client";

const routerDriverFetch = async (routeDriver: any) => {
  try {
    const response = await fetch("http://localhost:3000/api/createroute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routeDriver),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
};

async function up() {
  await prisma.user.createMany({
    data: users,
  });

  routerDrivers.forEach(async (routeDriver) => {
    const result = await routerDriverFetch(routeDriver);
    console.log("result", result);
    if (result) {
      console.log("Маршрути успішно створені");
    } else {
      console.error("Помилка створення маршрутів");
    }
  });
}

async function down() {
  // await prisma.$executeRaw`DELETE FROM "User"`;
  // await prisma.$executeRaw`DELETE FROM "RouteDriver"`;
  // // Видаляйте інші таблиці, якщо це потрібно:
  // await prisma.$executeRaw`DELETE FROM "IntermediateStop"`;
  // await prisma.$executeRaw`DELETE FROM "Passenger"`;
  // await prisma.$executeRaw`DELETE FROM "OrderedRoute"`;
  // await prisma.$executeRaw`DELETE FROM "OrderSeat"`;
  // await prisma.$executeRaw`DELETE FROM "BusSeat"`;

  // Скидання ідентифікаторів для таблиць (SQLite специфічне):
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "User"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "RouteDriver"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "IntermediateStop"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "Passenger"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "OrderedRoute"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "OrderSeat"`;
  await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = "BusSeat"`;

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
