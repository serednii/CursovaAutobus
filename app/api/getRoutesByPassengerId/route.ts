import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    // Отримуємо дані з тіла запиту
    const { passengerId, select } = await req.json();
    // console.log("passengerId", passengerId);
    // Перевірка, чи передано driverId

    if (!passengerId) {
      return NextResponse.json({ error: "Поле 'passengerId' є обов'язковим" }, { status: 400 });
    }

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routeDriversId: { routeDriverId: number }[] = await prisma.busSeat.findMany({
      where: { passenger: passengerId },
      select: {
        routeDriverId: true, // Залишаємо це поле
        // Усі інші поля не будуть включені, якщо вони не вказані як `true`
      },
    });

    const uniqueRouteDriversId: number[] = Array.from(new Set(routeDriversId.map((route) => route.routeDriverId)));

    console.log("XXXXXXXXXXXXXXXXX", uniqueRouteDriversId);
    const routes = await prisma.routeDriver.findMany({
      where: {
        id: { in: uniqueRouteDriversId },
      },

      select: select,
    });

    return NextResponse.json([...routes]);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
