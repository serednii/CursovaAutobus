import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { ICreateRoute } from "../../../../types/interface";
import {
  createBusSeats,
  createIntermediateStops,
  createPassengersSeatsList,
} from "./createFunctions";
import { middleware } from "@/middleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createRoute(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

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

    console.log("Data validation passed");

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
    if (!resultIntermediateStops) {
      return NextResponse.json({ error: "Failed to create intermediate stops" }, { status: 500 });
    }

    // Створення місць у автобусі
    const resultBusSeats = await createBusSeats(busSeats, routeDriver.id);
    if (!resultBusSeats) {
      return NextResponse.json({ error: "Failed to create bus seats" }, { status: 500 });
    }

    // Створення списку пасажирів
    const resultPassengersSeatsList = await createPassengersSeatsList(
      passengersSeatsList,
      routeDriver.id
    );
    if (!resultPassengersSeatsList) {
      return NextResponse.json(
        { error: "Failed to create passengers seats list" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { routeDriver, resultIntermediateStops, resultBusSeats },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
