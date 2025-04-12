import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { middleware } from "@/middleware";
import { IGetUsersByIdBySelect } from "@/fetchFunctions/fetchUsers";
import { zodSchemaUsers, zodSchemaUsersInApi } from "@/zod_shema/zodUser";
import { UserSelect, UserSession } from "@/types/next-auth";

export async function GET(req: NextRequest) {
  try {
    // Викликаємо middleware для перевірки авторизації
    const middlewareResponse = await middleware(req);
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { searchParams } = new URL(req.url);
    const selectParam = searchParams.get("select"); // Наприклад: 'name,email'
    const email = searchParams.get("email");
    const ids = searchParams.get("ids");

    const searchParamsObject: { email?: string } = {};

    if (email) {
      searchParamsObject.email = email;
    }

    console.log("selectParam", searchParamsObject);
    console.log("ids", ids);

    // Перетворюємо select параметр на список полів
    const selectFields = selectParam ? selectParam.split(",") : [];
    console.log("selectFields", selectFields);
    const selectObject: Record<string, boolean> = selectFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);

    try {
      const parsedData: Partial<UserSelect> | null = zodSchemaUsersInApi.parse(selectObject);
      console.log("parsedData", parsedData);

      // Якщо id не передано, повертаємо всіх користувачів
      const users = await prisma.user.findMany({
        where: searchParamsObject,
        select: selectFields.length ? selectObject : undefined,
      });

      return NextResponse.json({ users }, { status: 200 });
    } catch (parseError: unknown) {
      console.error("Помилка парсингу даних:", parseError);
      throw parseError;
    }
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
    return NextResponse.json(
      { error: "Не вдалося отримати користувачів", errorMessage: error },
      { status: 500 }
    );
  }
}

// Структура API
// GET /api/users: Повертає всіх користувачів з усіма полями.

// GET /api/users?select=name,email: Повертає всіх користувачів з полями name та email.

// GET /api/users/:id: Повертає одного користувача за конкретним id.

// GET /api/users/:id/:id2: Повертає кілька користувачів за кількома id (динамічний маршрут).

// POST /api/users: Повертає кілька користувачів за масивом ids з вибраними полями.
