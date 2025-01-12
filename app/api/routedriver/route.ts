import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { PrismaClient } from "@prisma/client";

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
      notate?: string;
      wifi?: boolean;
      coffee?: boolean;
      power?: boolean;
      restRoom?: boolean;
      passengerLength: number;
      intermediateStops: string;
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
      passengerLength,
      intermediateStops,
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
      !passengerLength ||
      !intermediateStops
    ) {
      return NextResponse.json(
        { error: "Invalid data: required fields are missing" },
        { status: 400 }
      );
    }

    console.log("Creating route driver");

    // Створення маршруту з проміжними зупинками як рядок
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
        passengerLength, // Кількість пасажирів = кількість місць
        modelBus: "Volvo 240", // Можна додавати динамічно
        intermediateStops, // Збереження як рядок
      },
    });

    console.log("Route driver created");

    return NextResponse.json({ routeDriver }, { status: 201 });
  } catch (error) {
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

// export async function POST(req: NextRequest) {
//   const prisma = new PrismaClient();
//   try {
//     // Парсинг даних з запиту
//     const data: {
//       driverId: number;
//       departureDate: string;
//       arrivalDate: string;
//       departureFrom: string;
//       arrivalTo: string;
//       busNumber: string;
//       routePrice: number;
//       selectBusLayout: string;
//       notate: string;
//       wifi: boolean;
//       coffee: boolean;
//       power: boolean;
//       restRoom: boolean;
//       passengerLength: number;
//       intermediateStops: string;
//     } = await req.json();

//     console.log("Request data:", data);

//     // Validate intermediateStops field
//     // if (
//     //   !Array.isArray(data.intermediateStops) ||
//     //   data.intermediateStops.some((stop) => typeof stop !== "string")
//     // ) {
//     //   return NextResponse.json(
//     //     {
//     //       error: "Invalid data: intermediateStops must be an array of strings",
//     //     },
//     //     { status: 400 }
//     //   );
//     // }

//     // Перевірка на валідність даних
//     const {
//       driverId,
//       departureDate,
//       arrivalDate,
//       departureFrom,
//       arrivalTo,
//       selectBusLayout,
//       busNumber,
//       routePrice,
//       passengerLength,
//       intermediateStops,
//       wifi,
//       coffee,
//       power,
//       restRoom,
//     } = data;

//     console.log("Data validation passed");

//     if (
//       !driverId ||
//       !departureDate ||
//       !arrivalDate ||
//       !departureFrom ||
//       !arrivalTo ||
//       !selectBusLayout ||
//       !busNumber ||
//       !routePrice ||
//       !passengerLength ||
//       !intermediateStops ||
//       !wifi ||
//       !coffee ||
//       !power ||
//       !restRoom
//     ) {
//       return NextResponse.json(
//         { error: "Invalid data: required fields are missing" },
//         { status: 400 }
//       );
//     }

//     console.log("Creating route driver");

//     // Створення маршруту з проміжними зупинками як JSON
//     const routeDriver = await prisma.routeDriver.create({
//       data: {
//         driverId,
//         departureDate: new Date(departureDate),
//         arrivalDate: new Date(arrivalDate),
//         departureFrom,
//         arrivalTo,
//         busNumber,
//         routePrice,
//         selectBusLayout,
//         notate: data.notate || "",
//         wifi,
//         coffee,
//         power,
//         restRoom,
//         passengerLength, // Кількість пасажирів = кількість місць
//         modelBus: "Volvo 240", // Можна додавати динамічно
//         intermediateStops,
//       },
//     });

//     console.log("Route driver created");

//     return NextResponse.json({ routeDriver }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating route driver:", error);
//     console.error("Error details:", error.message);
//     return NextResponse.json(
//       { error: "Internal server error", details: error.message },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
