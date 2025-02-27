import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Отримуємо дані з тіла запиту
    const { driverId } = await req.json();

    // Перевірка, чи передано driverId
    if (!driverId) {
      return NextResponse.json({ error: "Поле 'driverId' є обов'язковим" }, { status: 400 });
    }

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: { driverId },

      select: {
        id: true, // Залишаємо це поле
        departureDate: true, // Залишаємо це поле
        arrivalDate: true, // Залишаємо це поле
        departureFrom: true, // Залишаємо це поле
        arrivalTo: true, // Залишаємо це поле
        routePrice: true, // Залишаємо це поле
        bookedSeats: true,
        maxSeats: true,
        // Усі інші поля не будуть включені, якщо вони не вказані як `true`
      },
    });
    console.log("getRoutesByDriverId XXXXXXXXXXXXXXXXX", routes);
    // Якщо маршрути не знайдено
    if (!routes.length) {
      return NextResponse.json({ message: "Маршрути для вказаного driverId не знайдено" }, { status: 404 });
    }

    return NextResponse.json([...routes]);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
