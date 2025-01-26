import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import validateFields from "./validateFields";
import { ICreateRoute } from "../../../types/interface";
import {
  createBusSeats,
  createIntermediateStops,
  createPassengersSeatsList,
} from "./createFunctions";

export async function createRoute(req: NextRequest) {
  try {
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
      passengersSeatsList,
    } = data;

    console.log("Data validation passed");

    const errors = validateFields(data);

    console.log("errors", errors);
    // Якщо є помилки, повертаємо їх у відповіді
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Invalid data", details: errors },
        { status: 400 }
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

    console.log("Route driver created:", routeDriver);

    // Створення проміжних зупинок
    await createIntermediateStops(intermediateStops, routeDriver.id);

    // Створення місць у автобусі
    await createBusSeats(busSeats, routeDriver.id);

    // Створення списку пасажирів
    await createPassengersSeatsList(passengersSeatsList, routeDriver.id);

    return NextResponse.json({ routeDriver }, { status: 201 });
  } catch (error: Error | any) {
    console.error("Error creating route driver:", error);
    console.error("Error details:", error.message);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
