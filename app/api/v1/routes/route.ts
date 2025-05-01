import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

import { createRoute } from "./createroute";
import { checkApiKey, parseStringRoutesToObject } from "./util";

export async function GET(req: NextRequest) {
  const isApiKeyValid = checkApiKey(req);
  if (!isApiKeyValid) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);

  const selectParams = searchParams.get("select") || "";

  const selectObject = parseStringRoutesToObject(selectParams);

  const departureSearch = searchParams.get("departureSearch") || "";

  const arrivalToSearch = searchParams.get("arrivalToSearch") || "";
  const startOfDay = searchParams.get("startOfDay") || null;
  const startOfDayDate = startOfDay && startOfDay !== "Invalid Date" ? new Date(startOfDay) : null;
  const endOfDay = searchParams.get("endOfDay") || null;
  const endOfDayDate = endOfDay && endOfDay !== "Invalid Date" ? new Date(endOfDay) : null;
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const wifi = searchParams.get("wifi") === "true";
  const coffee = searchParams.get("coffee") === "true";
  const power = searchParams.get("power") === "true";
  const restRoom = searchParams.get("restRoom") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  console.log("selectObject", selectObject);
  console.log("departureSearch", departureSearch);
  console.log("arrivalToSearch", arrivalToSearch);
  console.log("startOfDay", startOfDay, startOfDayDate);
  console.log("endOfDay", endOfDay, endOfDayDate);
  console.log("limit", limit);
  console.log("wifi", wifi);
  console.log("coffee", coffee);
  console.log("power", power);
  console.log("restRoom", restRoom);

  // Фільтр по датах
  const dateFilter =
    startOfDayDate && endOfDayDate
      ? {
          departureDate: {
            gte: startOfDayDate,
            lt: endOfDayDate,
          },
        }
      : {};

  const where = {
    departureFrom: {
      contains: departureSearch ?? "",
    },
    arrivalTo: {
      contains: arrivalToSearch ?? "",
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
    skip: offset,
    select: selectObject,
  });

  const routesCity = await prisma.routeDriver.findMany({
    take: 20,
    select: {
      departureFrom: true,
      arrivalTo: true,
    },
    distinct: ["departureFrom", "arrivalTo"],
  });

  const safeRoutes = Array.isArray(routes) ? routes : []; // Гарантуємо, що це масив
  const saFeRoutesCity = Array.isArray(routesCity) ? routesCity : [];

  const fullRoutes =
    safeRoutes.map((route, index) => ({
      ...route,
      departureFromCity: saFeRoutesCity[index]?.departureFrom,
      arrivalToCity: saFeRoutesCity[index]?.arrivalTo,
    })) ?? [];

  return NextResponse.json(fullRoutes);
}

export async function POST(req: NextRequest) {
  return await createRoute(req);
}

//http://localhost:3000/api/v1/routes?
//departureSearch=Fgh
//&arrivalToSearch=
//&startOfDay=Thu+Apr+17+2025+00%3A00%3A00+GMT%2B0200+%28Центральная+Европа%2C+летнее+время%29
//&endOfDay=Thu+Apr+17+2025+23%3A59%3A59+GMT%2B0200+%28Центральная+Европа%2C+летнее+время%29
//&wifi=false&coffee=false&power=false&restRoom=false
//&select=id,driverId,departureDate,arrivalDate,departureFrom,arrivalTo,routePrice,busNumber,modelBus,maxSeats,bookedSeats,busSeats,passengersSeatsList
