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
      passengersSeatsList: [
        {
          idPassenger: number;
          subPassengersList: [
            {
              subFirstName: string;
              subLastName: string;
              subPhone: string;
              subEmail: string;
            }
          ];
        }
      ];
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
      passengersSeatsList,
    } = data;

    console.log("Data validation passed");

    const errors: any = {};

    if (typeof driverId !== "number") {
      errors.driverId = "driverId must be a number";
    }

    if (typeof departureDate !== "string") {
      errors.departureDate = "departureDate must be a string";
    }

    if (typeof arrivalDate !== "string") {
      errors.arrivalDate = "arrivalDate must be a string";
    }

    if (typeof departureFrom !== "string") {
      errors.departureFrom = "departureFrom must be a string";
    }

    if (typeof arrivalTo !== "string") {
      errors.arrivalTo = "arrivalTo must be a string";
    }

    if (typeof selectBusLayout !== "string") {
      errors.selectBusLayout = "selectBusLayout must be a string";
    }

    if (typeof busNumber !== "string") {
      errors.busNumber = "busNumber must be a string";
    }

    if (typeof routePrice !== "number") {
      errors.routePrice = "routePrice must be a number";
    }

    if (typeof modelBus !== "string") {
      errors.modelBus = "modelBus must be a string";
    }

    if (!Array.isArray(intermediateStops)) {
      errors.intermediateStops = "intermediateStops must be an array";
    }

    if (typeof wifi !== "boolean") {
      errors.wifi = "wifi must be a boolean";
    }

    if (typeof coffee !== "boolean") {
      errors.coffee = "coffee must be a boolean";
    }

    if (typeof power !== "boolean") {
      errors.power = "power must be a boolean";
    }

    if (typeof restRoom !== "boolean") {
      errors.restRoom = "restRoom must be a boolean";
    }

    if (!Array.isArray(busSeats)) {
      errors.busSeats = "busSeats must be an array";
    }

    if (typeof maxSeats !== "number") {
      errors.maxSeats = "maxSeats must be a number";
    }

    if (typeof bookedSeats !== "number") {
      errors.bookedSeats = "bookedSeats must be a number";
    }

    if (!Array.isArray(passengersSeatsList)) {
      errors.passengersSeatsList = "passengersSeatsList must be an array";
    }

    console.log("errors", errors);
    // Якщо є помилки, повертаємо їх у відповіді
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Invalid data", details: errors },
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

    const passengersSeatsListPromises = passengersSeatsList.map((seat) =>
      tx.passengersSeatsList.create({
        data: {
          idPassenger: seat.idPassenger,
          routeDriverId: routeDriver.id,
          subPassengersList: {
            create: seat.subPassengersList.map((subPassenger) => ({
              subFirstName: subPassenger.subFirstName,
              subLastName: subPassenger.subLastName,
              subPhone: subPassenger.subPhone,
              subEmail: subPassenger.subEmail,
            })),
          },
        },
      })
    );

    await Promise.all(passengersSeatsListPromises);

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
