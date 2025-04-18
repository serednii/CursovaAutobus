import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { middleware } from "@/middleware";
import { zodSchemaUsersInApi } from "@/zod_shema/zodUser";
import { UserSelect } from "@/types/next-auth";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { method } from "lodash";
import { checkApiKey, parseStringUserToObject } from "../routes/util";

export async function GET(req: NextRequest) {
  try {
    // Викликаємо middleware для перевірки авторизації
    // const middlewareResponse = await middleware(req);
    // if (middlewareResponse.status !== 200) {
    //   return middlewareResponse;
    // }

    const { searchParams } = new URL(req.url);

    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const selectParams = searchParams.get("select") || ""; // Наприклад: 'name,email'
    const selectObject = parseStringUserToObject(selectParams);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const idsStr = searchParams.get("filter[ids]");
    console.log("+++++++++++", req.headers.get("apiKey"));

    const ids = idsStr ? idsStr.split(",").map(Number) : [];

    const searchParamsObject: { email?: string; id?: { in: number[] } } = {};

    if (email) {
      searchParamsObject.email = email;
    } else if (ids && ids.length > 0) {
      searchParamsObject.id = { in: ids };
    }
    // console.log("searchParamsObject", searchParamsObject, ids, email);

    try {
      const parsedData: Partial<UserSelect> | null = zodSchemaUsersInApi.parse(selectObject);
      // console.log("parsedData", parsedData);

      // Якщо id не передано, повертаємо всіх користувачів
      const users = await prisma.user.findMany({
        where: searchParamsObject,
        take: limit,
        select: Object.keys(selectObject).length > 0 ? selectObject : undefined,
      });

      return NextResponse.json({ data: users }, { status: 200 });
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

export async function POST(req: NextRequest) {
  try {
    // Викликаємо middleware для перевірки авторизації
    const middlewareResponse = await middleware(req);

    // Якщо middleware повернув помилку, повертаємо її
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    // Очікуємо парсинг JSON
    const data: User = await req.json();
    // console.log("api/users", data);

    // Перевірка на валідність даних
    const { firstName, lastName, email, password, phone, role, license } = data;
    // console.log("Request data:", data);

    if (!firstName || !lastName || !email || !password || !phone) {
      return NextResponse.json({ error: "Invalid data: all fields are required" }, { status: 400 });
    }

    // Перевірка, чи існує користувач з таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    // Хешування пароля перед збереженням
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення користувача
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword, // Збереження хешованого пароля
        phone,
        role: role || "guest", // Роль за замовчуванням
        license: license || "no license", // Ліцензія за замовчуванням
      },
    });

    // Повертаємо успішну відповідь
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Викликаємо middleware для перевірки авторизації
    const middlewareResponse = await middleware(req); // Викликаємо middleware для перевірки авторизації

    // Якщо middleware повернув помилку, повертаємо її
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    // Отримуємо дані з тіла запиту
    const { id } = await req.json();

    // Перевірка, чи існує користувач з таким id
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Видалення користувача
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    // Повертаємо успішну відповідь з видаленим користувачем
    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Структура API
// GET /api/users: Повертає всіх користувачів з усіма полями.

// GET /api/users?select=name,email: Повертає всіх користувачів з полями name та email.

// GET /api/users/:id: Повертає одного користувача за конкретним id.

// GET /api/users/:id/:id2: Повертає кілька користувачів за кількома id (динамічний маршрут).

// POST /api/users: Повертає кілька користувачів за масивом ids з вибраними полями.
