import { prisma } from "@/prisma/prisma-client";
import { UserSelect } from "@/types/next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, RouteDriver } from "@prisma/client";
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
      coffee,
      power,
      restRoom,
      isOption,
      limit,
    }: {
      departureSearch?: string;
      arrivalToSearch?: string;
      select: UserSelect;
      startOfDay?: string; // Конкретна дата у форматі YYYY-MM-DD
      endOfDay?: string;
      limit?: number;
      wifi?: boolean;
      coffee?: boolean;
      power?: boolean;
      restRoom?: boolean;
      isOption?: boolean;
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
    // const routes = await prisma.routeDriver.findMany({
    //   where: {
    //     departureFrom: departureSearch,
    //     arrivalTo: arrivalToSearch,
    //     wifi,
    //     arrivalDate: {
    //       gt: new Date(),
    //     },
    //     ...dateFilter, // Додаємо фільтр за конкретним днем, якщо є
    //   },
    //   take: limit,
    //   select: select, // Вкажіть, які поля потрібні
    // });
    const where: any = {
      departureFrom: {
        contains: departureSearch ?? "",
        // mode: "insensitive",
      },
      arrivalTo: {
        contains: arrivalToSearch ?? "",
      },

      arrivalDate: {
        gt: new Date(),
      },
      ...dateFilter,
    };

    if (isOption) {
      if (wifi) {
        where.wifi = wifi;
      }
      if (coffee) {
        where.coffee = coffee;
      }
      if (power) {
        where.power = power;
      }
      if (restRoom) {
        where.restRoom = restRoom;
      }
    }
    const routes = await prisma.routeDriver.findMany({
      where,
      take: limit,
      select: select,
    });

    //   const routes: RouteDriver[] | null = await prisma.$queryRaw<RouteDriver[]>`
    //   SELECT * FROM "RouteDriver"
    //   WHERE "departureFrom" ILIKE ${`%${departureSearch ?? ""}%`}
    //   AND "arrivalTo" ILIKE ${`%${arrivalToSearch ?? ""}%`}
    //   AND "wifi" = ${wifi}
    //   AND "arrivalDate" > NOW()
    //   LIMIT ${limit}
    // `;

    // console.log("routes****************", routes);

    const safeRoutes = Array.isArray(routes) ? routes : []; // Гарантуємо, що це масив

    return NextResponse.json(safeRoutes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
