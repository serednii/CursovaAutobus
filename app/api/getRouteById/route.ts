import { prisma } from "@/prisma/prisma-client";
import { IGetRouteById, GetRoutesByDriverId } from "@/types/route-driver.types";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    // Отримуємо дані з тіла запиту
    const { id, select } = await req.json();
    // console.log("id", id);
    // Перевірка, чи передано Id
    if (!id) {
      return NextResponse.json(
        { error: "Поле 'driverId' є обов'язковим" },
        { status: 400 }
      );
    }

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: { id },

      select: select,
    });

    // Якщо маршрути не знайдено
    if (!routes) {
      return NextResponse.json(
        { message: "Маршрути для вказаного Id не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ routes });
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
