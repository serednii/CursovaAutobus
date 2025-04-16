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
  const startOfDay = searchParams.get("startOfDay") || null;
  const startOfDayDate = startOfDay && startOfDay !== "Invalid Date" ? new Date(startOfDay) : null;
  const endOfDay = searchParams.get("endOfDay") || null;
  const endOfDayDate = endOfDay && endOfDay !== "Invalid Date" ? new Date(endOfDay) : null;
  // const limit = parseInt(searchParams.get("limit") || "10", 100);
  const limit = 100;
  const wifi = searchParams.get("wifi") === "true";
  const coffee = searchParams.get("coffee") === "true";
  const power = searchParams.get("power") === "true";
  const restRoom = searchParams.get("restRoom") === "true";

  console.log("selectObject", selectObject);
  console.log("departureSearch", selectObject);
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
    ...(departureSearch
      ? {
          departureFrom: {
            contains: departureSearch,
          },
        }
      : {}),
    ...(arrivalToSearch
      ? {
          arrivalTo: {
            contains: arrivalToSearch,
          },
        }
      : {}),

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

//http://localhost:3000/api/v1/routes?
//departureSearch=Fgh
//&arrivalToSearch=
//&startOfDay=Thu+Apr+17+2025+00%3A00%3A00+GMT%2B0200+%28Центральная+Европа%2C+летнее+время%29
//&endOfDay=Thu+Apr+17+2025+23%3A59%3A59+GMT%2B0200+%28Центральная+Европа%2C+летнее+время%29
//&wifi=false&coffee=false&power=false&restRoom=false
//&select=id,driverId,departureDate,arrivalDate,departureFrom,arrivalTo,routePrice,busNumber,modelBus,maxSeats,bookedSeats,busSeats,passengersSeatsList
