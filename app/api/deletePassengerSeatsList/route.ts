import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { IBusSeats } from "@/types/interface";
import { ErrorResponse, SuccessResponse } from "@/types/response.types";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { updatedBusSeats } from "../updateRouteById/updatedBusSeats";

export async function DELETE(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    // Отримуємо дані з тіла запиту
    const { routeDriverId, idPassenger, busSeats }: { routeDriverId: number; idPassenger: number; busSeats: IBusSeats[] } = await req.json();
    console.log("Отримані дані:", { routeDriverId, idPassenger, busSeats });

    // Перевірка, чи передано routeId та idPassenger
    if (!routeDriverId || !idPassenger) {
      const responseError: ErrorResponse = { error: "Поле 'routeId' і 'idPassenger' є обов'язковим" };
      return NextResponse.json(responseError, { status: 400 });
    }

    // Видалення пасажира з маршруту
    const resultDeletePassengerSeatsList = await prisma.routeDriver.update({
      where: { id: routeDriverId },
      data: {
        passengersSeatsList: {
          deleteMany: { idPassenger },
        },
      },
    });

    if (!resultDeletePassengerSeatsList) {
      const responseError: ErrorResponse = { error: "Маршрут із зазначеним 'routeId' не видалено" };
      return NextResponse.json(responseError, { status: 404 });
    }

    // Оновлення місць у автобусі
    const resultUpdateBusSeats = await updatedBusSeats(busSeats, routeDriverId);

    if (!resultUpdateBusSeats) {
      const responseError: ErrorResponse = { error: "Не вдалося оновити місця в автобусі" };
      return NextResponse.json(responseError, { status: 404 });
    }

    // Повернення успішної відповіді
    const successResponse: SuccessResponse = { message: "Маршрут успішно видалено" };
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error: unknown) {
    console.error("Помилка видалення маршруту:", error);

    // Обробка помилок Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        const responseError: ErrorResponse = { error: "Маршрут із зазначеним 'routeId' не знайдено" };
        return NextResponse.json(responseError, { status: 404 });
      }
      console.error("Помилка Prisma:", error.message);
    }
    const responseError: ErrorResponse = { error: "Не вдалося обробити запит" };
    // Загальна обробка помилок
    return NextResponse.json(responseError, { status: 500 });
  }
}

// import { middleware } from "@/middleware";
// import { prisma } from "@/prisma/prisma-client";
// import { IBusSeats } from "@/types/interface";
// import { NextResponse } from "next/server";
// import { updatedBusSeats } from "../updateRouteById/updatedBusSeats";

// export async function DELETE(req: any) {
//   try {
//     const middlewareResponse = await middleware(req);

//     if (middlewareResponse.status !== 200) {
//       return middlewareResponse;
//     }
//     // Отримуємо дані з тіла запиту
//     const { routeDriverId, idPassenger, busSeats }: { routeDriverId: number; idPassenger: number; busSeats: IBusSeats[] } = await req.json();
//     console.log("DELETE DELETE routedId", routeDriverId, idPassenger, busSeats);
//     // Перевірка, чи передано routeId

//     if (!routeDriverId || !idPassenger) {
//       return NextResponse.json({ error: "Поле 'routeId' і 'idPassenger' є обов'язковим" }, { status: 400 });
//     }

//     const resultDeletePassengerSeatsList = await prisma.routeDriver.update({
//       where: { id: routeDriverId },
//       data: {
//         passengersSeatsList: {
//           deleteMany: { idPassenger },
//         },
//       },
//     });

//     if (!resultDeletePassengerSeatsList) {
//       return NextResponse.json({ error: "Маршрут із зазначеним 'routeId' не видалено", status: 404 });
//     }

//     const resultUpdateBusSeats = await updatedBusSeats(busSeats, routeDriverId);

//     if (!resultUpdateBusSeats) {
//       return NextResponse.json({ message: "Маршрут із зазначеним 'routeId' не видалено", status: 404 });
//     }

//     return NextResponse.json({ message: "Маршрут успішно видалено", status: 200 });
//   } catch (error: any) {
//     console.error("Помилка видалення маршруту:", error);

//     // Обробка помилки, якщо маршрут не знайдено
//     if (error.code === "P2025") {
//       return NextResponse.json({ error: "Маршрут із зазначеним 'routeId' не знайдено", status: 404 });
//     }

//     return NextResponse.json({ error: "Не вдалося обробити запит", status: 500 });
//   }
// }
