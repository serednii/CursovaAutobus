import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";
import { RouteDriver } from "@prisma/client";

export async function GET() {
  const routeDriver = await prisma.routeDriver.findMany();
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
      notate?: string;
      wifi?: boolean;
      coffee?: boolean;
      power?: boolean;
      restRoom?: boolean;
      busSeats: Record<string, any>;
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

    // Створення запису маршруту
    const routeDriver = await prisma.routeDriver.create({
      data: {
        driverId,
        departureDate: new Date(departureDate),
        arrivalDate: new Date(arrivalDate),
        departureFrom,
        arrivalTo,
        busNumber,
        routePrice,
        notate: data.notate || "",
        wifi: data.wifi || false,
        coffee: data.coffee || false,
        power: data.power || false,
        restRoom: data.restRoom || false,
        busSeats: data.busSeats,
        intermediateStops,
        passengersListId: data.passengersListId || [],
      },
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
