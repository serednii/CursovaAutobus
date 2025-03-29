import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Отримуємо дані з тіла запиту
    const { driverId, select } = await req.json();
    // Перевірка, чи передано driverId
    if (!driverId) {
      return NextResponse.json({ error: "Поле 'driverId' є обов'язковим" }, { status: 400 });
    }

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: { driverId: { in: driverId } },
      select: select,
    });
    // console.log("getRoutesByDriverId XXXXXXXXXXXXXXXXX", routes);
    // Якщо маршрути не знайдено
    if (!routes.length) {
      return NextResponse.json({ message: "Маршрути для вказаного driverId не знайдено" }, { status: 404 });
    }

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
