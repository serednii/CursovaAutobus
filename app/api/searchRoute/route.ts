import { prisma } from "@/prisma/prisma-client";
import { UserSelect } from "@/types/next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Отримуємо дані з тіла запиту
    const {
      departureSearch,
      arrivalToSearch,
      select,
      startOfDay,
      endOfDay,
      wifi,
      limit,
    }: {
      departureSearch?: string;
      arrivalToSearch?: string;
      select: UserSelect;
      startOfDay?: string; // Конкретна дата у форматі YYYY-MM-DD
      endOfDay?: string;
      limit?: number;
      wifi?: boolean;
    } = await req.json();

    // Формуємо діапазон часу для конкретного дня
    let dateFilter = {};
    if (startOfDay && endOfDay) {
      dateFilter = {
        departureDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      };
    }

    // Виконуємо пошук у базі даних
    const routes = await prisma.routeDriver.findMany({
      where: {
        departureFrom: departureSearch,
        arrivalTo: arrivalToSearch,
        wifi,
        arrivalDate: {
          gt: new Date(),
        },
        ...dateFilter, // Додаємо фільтр за конкретним днем, якщо є
      },
      take: limit,
      select: select, // Вкажіть, які поля потрібні
    });

    console.log("routes", routes.length);
    // Якщо маршрути не знайдено

    // Повертаємо дані маршрутів
    return NextResponse.json([...routes]);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
