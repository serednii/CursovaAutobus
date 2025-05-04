import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, parseStringRoutesToObject } from "@/app/api/v1/routes/util";
import { validateAllowedFields } from "@/lib/utils";
import { ALLOWED_FIELDS_DRIVER } from "../../const";

const limitEnv = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || "100";

export async function GET(req: NextRequest) {
  try {
    validateApiKey(req);

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "departureFrom,arrivalTo";
    validateAllowedFields(selectParams, ALLOWED_FIELDS_DRIVER);

    const select = parseStringRoutesToObject(selectParams);
    const limit = parseInt(searchParams.get("limit") || limitEnv, 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

    const whereCity = {
      departureDate: {
        gt: new Date(),
      },
    };

    const routes = await prisma.routeDriver.findMany({
      where: whereCity,
      take: limit,
      skip: offset,
      select,
      distinct: ["departureFrom", "arrivalTo"],
    });

    const total = await prisma.routeDriver.count({
      where: whereCity,
    });

    return NextResponse.json(
      {
        data: routes,
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
