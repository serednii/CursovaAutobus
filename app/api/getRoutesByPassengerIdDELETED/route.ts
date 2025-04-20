import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const middlewareResponse = await middleware(req);

    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }
    // Отримуємо дані з тіла запиту
    const { passengerId, select } = await req.json();
    // console.log("passengerId", passengerId);
    // Перевірка, чи передано driverId

    if (!passengerId) {
      return NextResponse.json({ error: "Поле 'passengerId' є обов'язковим" }, { status: 400 });
    }

    // Находимо всіх маршрути які заказав даний пасажир
    const uniqueRouteDriversId: { routeDriverId: number }[] = await prisma.busSeat.findMany({
      where: { passenger: passengerId },
      distinct: ["routeDriverId"],
      select: {
        routeDriverId: true, // Залишаємо це поле
      },
    });
    const routeDriverIds: number[] = uniqueRouteDriversId.map((route) => route.routeDriverId);

    const routes = await prisma.routeDriver.findMany({
      where: {
        id: { in: routeDriverIds },
        driverId: { not: passengerId },
      },

      select: select,
    });

    console.log("routeDriversId", routeDriverIds, uniqueRouteDriversId, routes);
    return NextResponse.json([...routes]);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
