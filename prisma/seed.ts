import createRoute from "@/api/v1/createRoute";
import { routerDrivers, users } from "./constants";
import { prisma } from "./prisma-client";

// const routerDriverFetch = async (routeDriver: any) => {
//   try {
//     const response = await fetch("http://localhost:3000/api/createroute", {
//       method: "POST",
// headers: {
//   "Content-Type": "application/json",
//   apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
// },
//       body: JSON.stringify(routeDriver),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error(
//         "Помилка запиту:",
//         errorData.error || "Невідома помилка",
//         routeDriver.routePrice
//       );
//       return null;
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Помилка під час виконання запиту:", error);
//     return null;
//   }
// };

//9 14 15 20 19 13
async function up() {
  await prisma.user.createMany({
    data: users,
  });

  const processRoutes = async () => {
    try {
      for (const [index, routeDriver] of routerDrivers.entries()) {
        try {
          const result = await createRoute(routeDriver);
          // console.log("result", routeDriver);
          // if (result) {
          //   console.log("Маршрути успішно створені", index);
          // } else {
          //   console.error("Помилка створення маршрутів", index);
          // }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  processRoutes();
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
