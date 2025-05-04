import { validateAllowedFields } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, parseStringRoutesToObject } from "./util";
import { ALLOWED_FIELDS_DRIVER } from "@/app/api/v1/const";
import { ICreateRoute } from "../../../../types/interface";
import {
  createBusSeats,
  createIntermediateStops,
  createPassengersSeatsList,
} from "./createFunctions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { zodRouteDriverInputSchema } from "@/zod_shema/zodCreateRoute";
const limitEnv = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || "100";

export async function GET(req: NextRequest) {
  try {
    validateApiKey(req);

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    validateAllowedFields(selectParams, ALLOWED_FIELDS_DRIVER);

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
    const limit = parseInt(searchParams.get("limit") || limitEnv, 10);
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
  try {
    validateApiKey(req);
    const data: ICreateRoute = await req.json();

    const {
      driverId,
      departureDate,
      arrivalDate,
      departureFrom,
      arrivalTo,
      selectBusLayout,
      busNumber,
      routePrice,
      modelBus,
      wifi,
      coffee,
      power,
      notate,
      restRoom,
      maxSeats,
      bookedSeats,
      intermediateStops,
      busSeats,
      passengersSeatsList,
    } = data;

    try {
      zodRouteDriverInputSchema.parse(data);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Невідома помилка" },
        { status: 422 } // або 422 для помилки валідації
      );
    }

    const routeDriver = await prisma.routeDriver.create({
      data: {
        driverId,
        departureDate: new Date(departureDate),
        arrivalDate: new Date(arrivalDate),
        departureFrom,
        arrivalTo,
        busNumber,
        routePrice,
        selectBusLayout,
        notate,
        wifi,
        coffee,
        power,
        restRoom,
        modelBus,
        maxSeats,
        bookedSeats,
      },
    });

    if (!routeDriver) {
      return NextResponse.json({ error: "Failed to create route driver" }, { status: 500 });
    }

    // // Створення проміжних зупинок
    const resultIntermediateStops = await createIntermediateStops(
      intermediateStops,
      routeDriver.id
    );

    // Створення місць у автобусі
    const resultBusSeats = await createBusSeats(busSeats, routeDriver.id);

    // Створення списку пасажирів
    const resultPassengersSeatsList = await createPassengersSeatsList(
      passengersSeatsList,
      routeDriver.id
    );

    return NextResponse.json(
      {
        data: {
          ...routeDriver,
          intermediateStops: resultIntermediateStops,
          busSeats: resultBusSeats,
          passengersSeatsList: resultPassengersSeatsList,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено", message: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
