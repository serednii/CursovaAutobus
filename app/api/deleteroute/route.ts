import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Отримуємо дані з тіла запиту
    const { routeId } = await req.json();
    // console.log("routeId", routeId);
    // Перевірка, чи передано routeId
    if (!routeId) {
      return NextResponse.json({ error: "Поле 'routeId' є обов'язковим" }, { status: 400 });
    }

    // Видалення маршруту
    const deletedRoute = await prisma.routeDriver.delete({
      where: { id: routeId },
    });

    return NextResponse.json(deletedRoute, { status: 200 });
  } catch (error: unknown) {
    console.error("Помилка видалення маршруту:", error);

    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}
