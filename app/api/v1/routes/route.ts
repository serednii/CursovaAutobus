import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

import { createRoute } from "./createroute";
import { parseStringToObject } from "./util";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const selectParams = searchParams.get("select") || "";

  const selectObject = parseStringToObject(selectParams);

  const departureSearch = searchParams.get("departureSearch") || "";
  const arrivalToSearch = searchParams.get("arrivalToSearch") || "";
  const startOfDay = searchParams.get("startOfDay") || new Date().toISOString();
  const endOfDay = searchParams.get("endOfDay");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const wifi = searchParams.get("wifi") === "true";
  const coffee = searchParams.get("coffee") === "true";
  const power = searchParams.get("power") === "true";
  const restRoom = searchParams.get("restRoom") === "true";

  // Фільтр по датах
  const dateFilter =
    startOfDay && endOfDay
      ? {
          departureDate: {
            gte: startOfDay,
            lt: endOfDay,
          },
        }
      : {};

  const where = {
    departureFrom: {
      contains: departureSearch,
    },
    arrivalTo: {
      contains: arrivalToSearch,
    },
    departureDate: {
      gt: new Date(),
    },
    ...dateFilter,
    ...(wifi ? { wifi: true } : {}),
    ...(coffee ? { coffee: true } : {}),
    ...(power ? { power: true } : {}),
    ...(restRoom ? { restRoom: true } : {}),
  };

  const routes = await prisma.routeDriver.findMany({
    where,
    take: limit,
    select: Object.keys(selectObject).length > 0 ? selectObject : undefined,
  });

  return NextResponse.json(routes);
}

export async function POST(req: NextRequest) {
  return await createRoute(req);
}
