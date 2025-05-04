// import { middleware } from "@/middleware";
import { validateAllowedFields } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, parseStringRoutesToObject } from "../../util";

import { ALLOWED_FIELDS_DRIVER } from "@/app/api/v1/const";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateApiKey(req);
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || "";
    validateAllowedFields(selectParams, ALLOWED_FIELDS_DRIVER);

    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;
    const selectObject = parseStringRoutesToObject(selectParams);

    if (!selectObject || typeof selectObject !== "object") {
      return NextResponse.json({ error: "Invalid 'select'!" }, { status: 400 });
    }

    const idNumber = parseInt(id || "0", 10);

    // Виконуємо запит до бази даних із включенням зв’язаних таблиць
    const routes = await prisma.routeDriver.findMany({
      where: { driverId: idNumber },
      take: limit,
      skip: offset,
      select: selectObject,
    });

    const total = await prisma.routeDriver.count({ where: { driverId: idNumber } });

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
