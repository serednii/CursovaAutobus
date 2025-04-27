import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { middleware } from "@/middleware";
import { IGetUsersByIdBySelect } from "@/fetchApi/fetchUsersDELETE";
import { zodSchemaUsers, zodSchemaUsersInApi } from "@/zod_shema/zodUser";
import { UserSelect } from "@/types/next-auth";
import { checkApiKey, parseStringUserToObject } from "../../routes/util";

export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
  try {
    // Викликаємо middleware для перевірки авторизації
    // const middlewareResponse = await middleware(req);
    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || ""; // Наприклад: 'name,email'

    const selectObject: Record<string, boolean> = parseStringUserToObject(selectParams);

    try {
      const parsedData: Partial<UserSelect> | null = zodSchemaUsersInApi.parse(selectObject);
      console.log("parsedData", parsedData);
      if (!parsedData) {
        return NextResponse.json({ error: "Некоректні дані" }, { status: 400 });
      }

      // Якщо id передано в параметрах запиту, шукаємо за цими id
      if (!id) {
        return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
      }

      const idNumber = parseInt(id || "0", 10);
      console.log("ids", id);
      const users = await prisma.user.findMany({
        where: {
          id: idNumber, // Пошук користувачів за кількома id
        },
        select: selectParams ? selectObject : undefined,
      });

      if (users.length === 0) {
        return NextResponse.json(
          { message: "Користувачів із заданими ID не знайдено" },
          { status: 404 }
        );
      }
      return NextResponse.json(users);

      // Якщо id не передано
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
// where: {
//     id: { in: ids }, // Пошук користувачів за кількома id
//   },
