import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

type TypeGetRoutesById = {
  id: number[];
  select: any;
};

export async function POST(req: NextRequest) {
  try {
    // Отримуємо дані з тіла запиту
    const { id, select }: TypeGetRoutesById = await req.json();
    console.log("id---", id, select);
    // Перевірка, чи передано Id
    if (!id || !Array.isArray(id)) {
      return NextResponse.json(
        { error: "Поле 'id' має бути масиво або нічого непередано взагалі!" },
        { status: 400 }
      );
    }

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: {
        id: { in: id },
      },
      select: select,
    });

    console.log("route.ts", routes);
    // Якщо маршрути не знайдено
    if (!routes || routes.length === 0) {
      return NextResponse.json(
        { message: "Маршрути для вказаного Id не знайдено" },
        { status: 404 }
      );
    }
    console.log("route.ts----", routes);

    return NextResponse.json({ routes });
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
