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
    // console.log("getUniqueRoutes search select", selectParams);
    const selectObject = parseStringRoutesToObject(selectParams);
    const passengerId = parseInt(id || "0", 10);

    // Находимо всіх маршрути які заказав даний пасажир
    const uniqueRouteDriversId: { routeDriverId: number }[] = await prisma.busSeat.findMany({
      where: { passenger: passengerId },
      distinct: ["routeDriverId"],
      select: {
        routeDriverId: true, // Залишаємо це поле
      },
    });
    const routeDriverIds: number[] = uniqueRouteDriversId.map((route) => route.routeDriverId);

    const routes = await prisma.routeDriver.findMany({
      where: {
        id: { in: routeDriverIds },
        driverId: { not: passengerId },
      },
      select: selectObject,
    });

    console.log("routeDriversId", routeDriverIds, uniqueRouteDriversId, routes);
    return NextResponse.json([...routes]);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
