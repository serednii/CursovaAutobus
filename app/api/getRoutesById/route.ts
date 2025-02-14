import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

type TypeGetRoutesById = {
  id: number[];
  select?: any;
};

export async function POST(req: NextRequest) {
  try {
    // Отримуємо дані з тіла запиту
    const body: TypeGetRoutesById = await req.json();
    const { id, select } = body;

    console.log("id---", id, select);

    // Валідація `id`
    if (!Array.isArray(id) || id.length === 0) {
      return NextResponse.json(
        { error: "Поле 'id' має бути непорожнім масивом чисел!" },
        { status: 400 }
      );
    }

    console.log("Валідація `id пройшла успішно  ", id, select);
    // Валідація `select`
    if (!select || typeof select !== "object") {
      return NextResponse.json(
        { error: "Некоректне поле 'select'!" },
        { status: 400 }
      );
    }
    console.log("Валідація `select пройшла успішно", id, select);

    // Запит до бази даних
    const routes = await prisma.routeDriver.findMany({
      where: { id: { in: id } },
      select: select,
    });

    console.log("Найдені маршрути:", routes);

    // Перевірка на порожній результат
    if (routes.length === 0) {
      return NextResponse.json(
        { message: "Маршрути для вказаного ID не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
