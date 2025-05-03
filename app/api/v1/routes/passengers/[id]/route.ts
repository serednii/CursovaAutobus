import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { checkApiKey, parseStringRoutesToObject } from "@/app/api/v1/routes/util";
import { IBusSeats } from "@/types/interface";
import { ErrorResponse, SuccessResponse } from "@/types/response.types";
import { Prisma } from "@prisma/client";
import { updatedBusSeats } from "@/app/api/v1/routes/updatedBusSeats";
import { allowedFieldsDriver } from "@/app/api/v1/const";
import { isAllowedField } from "@/lib/utils";
const limitEnv = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || "100";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    const isAllowedFieldResult = isAllowedField(allowedFieldsDriver, selectParams);

    if (!isAllowedFieldResult) {
      return NextResponse.json({ error: "Invalid select" }, { status: 400 });
    }
    const selectObject = parseStringRoutesToObject(selectParams);
    const passengerId = parseInt(id || "0", 10);
    const limit = parseInt(searchParams.get("limit") || limitEnv, 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;
    // Находимо всіх маршрути які заказав даний пасажир
    const uniqueRouteDriversId: { routeDriverId: number }[] = await prisma.busSeat.findMany({
      where: { passenger: passengerId },
      distinct: ["routeDriverId"],
      select: {
        routeDriverId: true, // Залишаємо це поле
      },
    });

    const routeDriverIds: number[] = uniqueRouteDriversId.map((route) => route.routeDriverId);

    const routes = await prisma.routeDriver.findMany({
      where: {
        id: { in: routeDriverIds },
        driverId: { not: passengerId },
      },
      take: limit,
      skip: offset,
      select: selectObject,
    });

    const total = await prisma.routeDriver.count({
      where: {
        id: { in: routeDriverIds },
        driverId: { not: passengerId },
      },
    });

    return NextResponse.json(
      {
        data: [...routes],
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Отримуємо дані з тіла запиту
    const { idPassenger, busSeats }: { idPassenger: number; busSeats: IBusSeats[] } =
      await req.json();
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }
    const routeDriverId = parseInt(id || "0", 10);

    // Перевірка, чи передано routeId та idPassenger
    if (!routeDriverId || !idPassenger) {
      const responseError: ErrorResponse = {
        error: "Поле 'routeId' і 'idPassenger' є обов'язковим",
      };
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
        const responseError: ErrorResponse = {
          error: "Маршрут із зазначеним 'routeId' не знайдено",
        };
        return NextResponse.json(responseError, { status: 404 });
      }
      console.error("Помилка Prisma:", error.message);
    }
    const responseError: ErrorResponse = { error: "Не вдалося обробити запит" };
    // Загальна обробка помилок
    return NextResponse.json(responseError, { status: 500 });
  }
}
