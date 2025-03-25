import { IGetSearchRouteManyOption } from "@/fetchFunctions/searchRoute";
import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
// import { UserSelect } from "@/types/next-auth";
// import { ca } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    // Отримуємо дані з тіла запиту
    const {
      departureSearch,
      arrivalToSearch,
      select,
      startOfDay = new Date().toISOString(),
      endOfDay,
      wifi,
      coffee,
      power,
      restRoom,
      limit,
    }: {
      departureSearch?: string;
      arrivalToSearch?: string;
      select: IGetSearchRouteManyOption;
      startOfDay?: string; // Конкретна дата у форматі YYYY-MM-DD
      endOfDay?: string;
      limit?: number;
      wifi?: boolean;
      coffee?: boolean;
      power?: boolean;
      restRoom?: boolean;
    } = await req.json();

    // console.log("services search select");
    // console.log("select", select);
    // console.log("departureSearch", departureSearch);
    // console.log("arrivalToSearch", arrivalToSearch);
    // console.log("startOfDay", startOfDay);
    // console.log("endOfDay", endOfDay);
    // console.log("wifi", wifi);
    // console.log("coffee", coffee);
    // console.log("power", power);
    // console.log("restRoom", restRoom);
    // console.log("limit", limit);

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

    const where: Record<string, unknown> = {
      departureFrom: {
        contains: departureSearch ?? "",
      },
      arrivalTo: {
        contains: arrivalToSearch ?? "",
      },

      departureDate: {
        gt: new Date(),
      },
      ...dateFilter,
    };

    // if (departureSearch) {
    //   where.departureFrom = { contains: departureSearch };
    // }

    // if (arrivalToSearch) {
    //   where.arrivalTo = { contains: arrivalToSearch };
    // }

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

    const routes = await prisma.routeDriver.findMany({
      where,
      take: limit,
      select,
    });

    console.log("routes", routes);

    const routesCity = await prisma.routeDriver.findMany({
      where,
      take: limit,
      select: {
        departureFrom: true,
        arrivalTo: true,
      },
      distinct: ["departureFrom", "arrivalTo"],
    });

    // const routes: RouteDriver[] | null = await prisma.$queryRaw<RouteDriver[]>`
    //   SELECT * FROM "RouteDriver"
    //   WHERE "departureFrom" ILIKE ${`%${departureSearch ?? ""}%`}
    //   AND "arrivalTo" ILIKE ${`%${arrivalToSearch ?? ""}%`}
    //   AND "wifi" = ${wifi}
    //   AND "arrivalDate" > NOW()
    //   LIMIT ${limit}
    // `;

    const safeRoutes = Array.isArray(routes) ? routes : []; // Гарантуємо, що це масив
    const saFeRoutesCity = Array.isArray(routesCity) ? routesCity : [];

    const fullRoutes =
      safeRoutes.map((route, index) => ({
        ...route,
        departureFromCity: saFeRoutesCity[index]?.departureFrom,
        arrivalToCity: saFeRoutesCity[index]?.arrivalTo,
      })) ?? [];

    return NextResponse.json(fullRoutes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}
