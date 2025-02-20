import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import validateFields from "./validateFields";
import { ICreateRoute } from "../../../types/interface";
import { createBusSeats, createIntermediateStops } from "./createFunctions";
import { middleware } from "@/middleware";

export async function createRoute(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Парсинг даних з запиту
    const data: ICreateRoute = await req.json();

    // console.log("Request data:", data);

    // Validate busSeats field

    // Перевірка на валідність даних
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
    } = data;

    console.log("Data validation passed");

    const errors = validateFields(data);

    console.log("errors", errors);
    // Якщо є помилки, повертаємо їх у відповіді
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Invalid data", details: errors }, { status: 400 });
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
    // console.log("Route driver created:", routeDriver);

    // // Створення проміжних зупинок
    const resultIntermediateStops = await createIntermediateStops(intermediateStops, routeDriver.id);
    if (!resultIntermediateStops) {
      return NextResponse.json({ error: "Failed to create intermediate stops" }, { status: 500 });
    }
    // Створення місць у автобусі
    const resultBusSeats = await createBusSeats(busSeats, routeDriver.id);
    if (!resultBusSeats) {
      return NextResponse.json({ error: "Failed to create bus seats" }, { status: 500 });
    }

    // Створення списку пасажирів
    // await createPassengersSeatsList(passengersSeatsList, routeDriver.id);

    return NextResponse.json({ routeDriver, resultIntermediateStops, resultBusSeats }, { status: 201 });
    // @typescript-eslint/no-explicit-any
  } catch (error: Error | any) {
    console.error("Error creating route driver:", error);
    console.error("Error details:", error.message);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
