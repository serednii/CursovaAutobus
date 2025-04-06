import { IGetSearchRouteUpdateOption } from "@/fetchFunctions/fetchGetRoutesById";
// import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

type TypeGetRoutesById = {
  id: number[];
  select?: IGetSearchRouteUpdateOption;
};

export async function POST(req: NextRequest) {
  try {
    // const middlewareResponse = await middleware(req);
    // console.log("middlewareResponse", req);
    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }

    // const allowedOrigin = "https://yourwebsite.com"; // Замените на ваш домен

    // const origin = req.headers.get("origin") || req.headers.get("referer") || "UNKNOWN";
    // const userAgent = req.headers.get("user-agent") || "";
    // console.log("Received Origin:", origin, "User Agent:", userAgent);
    // if (!origin || !origin.startsWith(allowedOrigin)) {
    //   return res.status(403).json({ error: "Access denied" });
    // }
    // Отримуємо дані з тіла запиту
    const body: TypeGetRoutesById = await req.json();
    const { id, select } = body;

    // Валідація `id`
    if (!Array.isArray(id) || id.length === 0) {
      return NextResponse.json(
        { error: "Поле 'id' має бути непорожнім масивом чисел!" },
        { status: 400 }
      );
    }
    // Валідація `select`
    if (!select || typeof select !== "object") {
      return NextResponse.json({ error: "Некоректне поле 'select'!" }, { status: 400 });
    }

    // Запит до бази даних
    const routes = await prisma.routeDriver.findMany({
      where: { id: { in: id } },
      select: select,
    });

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
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
