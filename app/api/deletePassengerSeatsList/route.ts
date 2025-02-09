import { prisma } from "@/prisma/prisma-client";
import { IBusSeats } from "@/types/interface";
import { NextResponse } from "next/server";
import { updatedBusSeats } from "../updateRouteById/updateFunction";

export async function DELETE(req: any) {
  try {
    // Отримуємо дані з тіла запиту
    const {
      routeDriverId,
      idPassenger,
      busSeats,
    }: { routeDriverId: number; idPassenger: number; busSeats: IBusSeats[] } =
      await req.json();
    console.log("routedId", routeDriverId, idPassenger, busSeats);
    // Перевірка, чи передано routeId

    if (!routeDriverId || !idPassenger) {
      return NextResponse.json(
        { error: "Поле 'routeId' і 'idPassenger' є обов'язковим" },
        { status: 400 }
      );
    }

    const resultDeletePassengerSeatsList = await prisma.routeDriver.update({
      where: { id: routeDriverId },
      data: {
        passengersSeatsList: {
          deleteMany: { idPassenger },
        },
      },
    });

    if (!resultDeletePassengerSeatsList) {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не видалено" },
        { status: 404 }
      );
    }

    const resultUpdateBusSeats = await updatedBusSeats(busSeats, routeDriverId);

    if (!resultUpdateBusSeats) {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не видалено" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Маршрут успішно видалено" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Помилка видалення маршруту:", error);

    // Обробка помилки, якщо маршрут не знайдено
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Маршрут із зазначеним 'routeId' не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
