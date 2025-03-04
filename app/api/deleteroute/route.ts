import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Отримуємо дані з тіла запиту
    const { routeId } = await req.json();
    console.log("routeId", routeId);
    // Перевірка, чи передано routeId
    if (!routeId) {
      return NextResponse.json({ error: "Поле 'routeId' є обов'язковим" }, { status: 400 });
    }

    // Видалення маршруту
    const deletedRoute = await prisma.routeDriver.delete({
      where: { id: routeId },
    });

    return NextResponse.json(deletedRoute, { status: 200 });
  } catch (error: any) {
    console.error("Помилка видалення маршруту:", error);

    // Обробка помилки, якщо маршрут не знайдено
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Маршрут із зазначеним 'routeId' не знайдено" }, { status: 404 });
    }

    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
