import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { RouteDriver } from "@prisma/client";

export async function GET() {
  // Вибірка маршрутів по driverId
  const routeDriver = await prisma.routeDriver.findMany({
    where: {
      driverId: 9, // Потрібно змінити на актуальний driverId
    },
  });
  return NextResponse.json({ routeDriver });
}

export async function POST(req: NextRequest) {
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
      notate?: string;
      wifi?: boolean;
      coffee?: boolean;
      power?: boolean;
      restRoom?: boolean;
      busSeats: {
        seatNumber: number;
        busSeatStatus: string;
        passengerId: number | null;
      }[]; // Модель для busSeats
      intermediateStops: string[];
      passengersListId: number[];
    } = await req.json();

    console.log("Request data:", data);

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
      busSeats,
      intermediateStops,
    } = data;

    if (
      !driverId ||
      !departureDate ||
      !arrivalDate ||
      !departureFrom ||
      !arrivalTo ||
      !selectBusLayout ||
      !busNumber ||
      !routePrice ||
      !busSeats ||
      !intermediateStops
    ) {
      return NextResponse.json(
        { error: "Invalid data: required fields are missing" },
        { status: 400 }
      );
    }

    // Створення маршруту
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
        wifi: data.wifi || false,
        coffee: data.coffee || false,
        power: data.power || false,
        restRoom: data.restRoom || false,
        passengerLength: busSeats.length, // Кількість пасажирів = кількість місць
        modelBus: "Volvo 240", // Можна додавати динамічно
        busSeats: {
          create: busSeats.map((seat) => ({
            seatNumber: seat.seatNumber,
            busSeatStatus: seat.busSeatStatus,
            passenger: seat.passengerId
              ? { connect: { id: seat.passengerId } }
              : undefined,
          })),
        },
        intermediateStops: {
          create: intermediateStops.map((stop) => ({
            stopName: stop,
          })),
        },
      },
    });

    // Додавання замовлень для пасажирів
    await prisma.orderedRoute.createMany({
      data: data.passengersListId.map((passengerId) => ({
        passengerId,
        routeDriverId: routeDriver.id,
      })),
    });

    return NextResponse.json({ routeDriver }, { status: 201 });
  } catch (error) {
    console.error("Error creating route driver:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
