import { isAllowedField } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

import { createRoute } from "./createroute";
import { checkApiKey, parseStringRoutesToObject } from "./util";
import { allowedFieldsDriver } from "@/app/api/v1/const";

export async function GET(req: NextRequest) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    const isAllowedFieldResult = isAllowedField(allowedFieldsDriver, selectParams);

    if (!isAllowedFieldResult) {
      return NextResponse.json({ error: "Invalid select" }, { status: 400 });
    }

    const selectObject = parseStringRoutesToObject(selectParams);
    const departureSearch = searchParams.get("departureSearch") || "";
    const arrivalToSearch = searchParams.get("arrivalToSearch") || "";
    const startOfDay = searchParams.get("startOfDay") || null;
    const startOfDayDate =
      startOfDay && startOfDay !== "Invalid Date" ? new Date(startOfDay) : null;
    const endOfDay = searchParams.get("endOfDay") || null;
    const endOfDayDate = endOfDay && endOfDay !== "Invalid Date" ? new Date(endOfDay) : null;
    const wifi = searchParams.get("wifi") === "true";
    const coffee = searchParams.get("coffee") === "true";
    const power = searchParams.get("power") === "true";
    const restRoom = searchParams.get("restRoom") === "true";
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

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

    const whereCity = {
      departureDate: {
        gt: new Date(),
      },
    };

    const routes = await prisma.routeDriver.findMany({
      where,
      take: limit,
      skip: offset,
      select: selectObject,
    });

    const routesCity = await prisma.routeDriver.findMany({
      take: 20,
      where: whereCity,
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

    const total = await prisma.routeDriver.count({ where });

    return NextResponse.json(
      {
        data: fullRoutes,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при отриманні маршрутів:", error);
    return NextResponse.json(
      { error: "Не вдалося отримати Маршрути", errorMessage: error },
      { status: 500 }
    );
  }
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
