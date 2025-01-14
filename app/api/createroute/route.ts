import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    // Парсинг даних з запиту
    const data: {
      driverId: number;
      departureDate: string;
      arrivalDate: string;
      departureFrom: string;
      arrivalTo: string;
      busNumber: string;
      routePrice: number;
      selectBusLayout: string;
      notate: string;
      wifi: boolean;
      coffee: boolean;
      power: boolean;
      restRoom?: boolean;
      modelBus: string;
      maxSeats: number;
      bookedSeats: number;
      intermediateStops: string[];
      busSeats: {
        passenger: number | null;
        number: number;
        busSeatStatus: string;
      }[];
    } = await req.json();

    console.log("Request data:", data);

    // // Validate intermediateStops field
    // if (
    //   !Array.isArray(data.intermediateStops) ||
    //   data.intermediateStops.some((stop) => typeof stop !== "string")
    // ) {
    //   return NextResponse.json(
    //     {
    //       error: "Invalid data: intermediateStops must be an array of strings",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Validate busSeats field
    if (
      !Array.isArray(data.busSeats) ||
      data.busSeats.some(
        (seat) =>
          typeof seat.number !== "number" ||
          typeof seat.busSeatStatus !== "string"
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid data: busSeats must be an array of valid seat objects",
        },
        { status: 400 }
      );
    }

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
      intermediateStops,
      busSeats,
      wifi,
      coffee,
      power,
      restRoom,
      maxSeats,
      bookedSeats,
    } = data;

    console.log("Data validation passed");

    if (
      !driverId ||
      !departureDate ||
      !arrivalDate ||
      !departureFrom ||
      !arrivalTo ||
      !selectBusLayout ||
      !busNumber ||
      !routePrice ||
      !modelBus ||
      !intermediateStops ||
      !wifi ||
      !coffee ||
      !power ||
      !restRoom ||
      !busSeats ||
      !maxSeats ||
      !bookedSeats
    ) {
      return NextResponse.json(
        { error: "Invalid data: required fields are missing" },
        { status: 400 }
      );
    }

    // Створення маршруту без проміжних зупинок
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
        notate: data.notate || "",
        wifi,
        coffee,
        power,
        restRoom,
        modelBus, // Модель автобуса
        maxSeats,
        bookedSeats,
      },
    });

    console.log("Route driver created:", routeDriver);

    // Створення проміжних зупинок
    const intermediateStopPromises = data.intermediateStops.map((stop) =>
      prisma.intermediateStop.create({
        data: {
          stopName: stop,
          routeId: routeDriver.id,
        },
      })
    );

    await Promise.all(intermediateStopPromises);

    // Створення місць у автобусі
    const busSeatPromises = data.busSeats.map((seat) =>
      prisma.busSeat.create({
        data: {
          passenger: seat.passenger,
          number: seat.number,
          busSeatStatus: seat.busSeatStatus,
          routeDriverId: routeDriver.id,
        },
      })
    );

    await Promise.all(busSeatPromises);

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
