// import { IGetSearchRouteUpdateOption } from "@/fetchFunctions/v1/getRoutesById";
import { prisma } from "@/prisma/prisma-client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

import { updateRoute } from "../../updateRoute";
import { checkApiKey, parseStringRoutesToObject } from "../../util";

// type TypeGetRoutesById = {
//   id: number[];
//   select?: IGetSearchRouteUpdateOption;
// };

export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    console.log("getUniqueRoutes search select", selectParams);
    const selectObject = parseStringRoutesToObject(selectParams);
    // Отримуємо дані з тіла запиту
    // const body: TypeGetRoutesById = await req.json();
    // const { id, select } = body;

    const { id } = await params;
    console.log("getUniqueRoutes search select", selectObject);
    console.log("getUniqueRoutes search id", id);

    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }

    const idNumber = parseInt(id || "0", 10);

    // if (!selectObject || typeof selectObject !== "object") {
    //   return NextResponse.json({ error: "Некоректне поле 'select'!" }, { status: 400 });
    // }

    // Запит до бази даних
    const routes = await prisma.routeDriver.findMany({
      where: { id: idNumber },
      select: selectObject,
    });

    console.log("routes", routes);
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

// API route handler for updating a route
export async function PATCH(req: NextRequest, { params }: { params: { id?: string } }) {
  const isApiKeyValid = checkApiKey(req);
  if (!isApiKeyValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }
  const { id } = await params;
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  const numberId = parseInt(id || "0", 10);

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  return await updateRoute(req, numberId);
}

export async function DELETE(req: NextRequest) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    // const middlewareResponse = await middleware(req);

    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }
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
