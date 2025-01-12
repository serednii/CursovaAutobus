import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(req: any) {
  try {
    // Отримуємо дані з тіла запиту
    const { routeId } = await req.json();
    console.log("routedId", routeId);
    // Перевірка, чи передано routeId
    if (!routeId) {
      return NextResponse.json(
        { error: "Поле 'routeId' є обов'язковим" },
        { status: 400 }
      );
    }

    // Видалення маршруту
    const deletedRoute = await prisma.routeDriver.delete({
      where: { id: routeId },
    });

    return NextResponse.json(
      { message: "Маршрут успішно видалено", deletedRoute },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка видалення маршруту:", error);

    // Обробка помилки, якщо маршрут не знайдено
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
