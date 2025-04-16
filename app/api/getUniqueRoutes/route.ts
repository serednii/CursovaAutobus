import { middleware } from "@/middleware";
import { prisma } from "@/prisma/prisma-client";
import { UserSelect } from "@/types/next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // console.log("getUniqueRoutes", req);
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
      startOfDay,
      endOfDay,
      wifi,
      coffee,
      power,
      restRoom,
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
    } = await req.json();

    console.log(
      "getUniqueRoutes search select",
      departureSearch,
      arrivalToSearch,
      select,
      startOfDay,
      endOfDay,
      wifi,
      coffee,
      power,
      restRoom,
      limit
    );

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
      // departureFrom: {
      //   contains: departureSearch ?? "",
      // },
      // arrivalTo: {
      //   contains: arrivalToSearch ?? "",
      // },

      departureDate: {
        gt: new Date(),
      },
      ...dateFilter,
      ...(wifi ? { wifi: true } : {}),
      ...(coffee ? { coffee: true } : {}),
      ...(power ? { power: true } : {}),
      ...(restRoom ? { restRoom: true } : {}),
    };

    if (departureSearch) {
      where.departureFrom = { contains: departureSearch };
    }

    if (arrivalToSearch) {
      where.arrivalTo = { contains: arrivalToSearch };
    }
    console.log("select getUniqueRoutes", select);
    const routes = await prisma.routeDriver.findMany({
      where,
      take: limit,
      select,
      distinct: ["departureFrom", "arrivalTo"],
    });

    // console.log("routes****************", routes);

    const safeRoutes = Array.isArray(routes) ? routes : []; // Гарантуємо, що це масив

    return NextResponse.json(safeRoutes);
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json({ error: "Не вдалося обробити запит" }, { status: 500 });
  }
}

// {departureFrom: 'Houston', arrivalTo: 'San Antonio'}
// {departureFrom: 'Miami', arrivalTo: 'Orlando'}
// {departureFrom: 'Chicago', arrivalTo: 'Detroit'}
// {departureFrom: 'Los Angeles', arrivalTo: 'San Francisco'}
// {departureFrom: 'Seattle', arrivalTo: 'Portland'}
// {departureFrom: 'Austin', arrivalTo: 'Dallas'}
// {departureFrom: 'Houston', arrivalTo: 'San Antonio'}
// {departureFrom: 'New York', arrivalTo: 'Overland Park'}
// {departureFrom: 'New York', arrivalTo: 'Memphis'}
// {departureFrom: 'Paris', arrivalTo: 'London'}
// {departureFrom: 'New York', arrivalTo: 'Oakland'}
// {departureFrom: 'New York', arrivalTo: 'Madison'}
// {departureFrom: 'New York', arrivalTo: 'London'}
// {departureFrom: 'Macon', arrivalTo: 'Omaha'}
