// import { IGetSearchRouteUpdateOption } from "@/fetchFunctions/v1/getRoutesById";
import { prisma } from "@/prisma/prisma-client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

import { updateRoute } from "../updateRoute";
import { validateApiKey, parseStringRoutesToObject } from "../util";
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateApiKey(req);
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

    // Запит до бази даних
    const routes = await prisma.routeDriver.findMany({
      where: { id: idNumber },
      select: selectObject,
    });

    return NextResponse.json({ data: routes }, { status: 200 });
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}

// API route handler for updating a route

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  validateApiKey(req);
  const { id } = await params;
  const numberId = parseInt(id || "0", 10);

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  return await updateRoute(req, numberId);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateApiKey(req);

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }

    const routeId = parseInt(id || "0", 10);
    const deletedRoute = await prisma.routeDriver.delete({
      where: { id: routeId },
    });
    return NextResponse.json(deletedRoute, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}
