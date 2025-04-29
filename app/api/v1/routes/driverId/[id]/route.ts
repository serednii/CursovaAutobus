// import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { checkApiKey, parseStringRoutesToObject } from "../../util";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    const selectObject = parseStringRoutesToObject(selectParams);

    if (!selectObject || typeof selectObject !== "object") {
      return NextResponse.json({ error: "Некоректне поле 'select'!" }, { status: 400 });
    }

    const idNumber = parseInt(id || "0", 10);

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: { driverId: idNumber },
      select: selectObject,
    });

    // Якщо маршрути не знайдено
    if (!routes.length) {
      return NextResponse.json(
        { message: "Маршрути для вказаного driverId не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
