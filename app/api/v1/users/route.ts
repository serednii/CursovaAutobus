import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { middleware } from "@/middleware";
import { zodSchemaUsersInApi } from "@/zod_shema/zodUser";
import { UserSelect } from "@/types/next-auth";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
// import { method } from "lodash";
import { checkApiKey, parseStringUserToObject } from "../routes/util";

const allowedFields = "id,email,firstName,lastName,phone,role,license";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    const selectParams = searchParams.get("select") || allowedFields; // Наприклад: 'name,email'
    const selectObject = parseStringUserToObject(selectParams);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;
    const idsStr = searchParams.get("filter[ids]");
    const ids = idsStr ? idsStr.split(",").map(Number) : [];
    const searchParamsObject: { email?: string; id?: { in: number[] } } = {};

    if (email) {
      searchParamsObject.email = email;
    } else if (ids && ids.length > 0) {
      searchParamsObject.id = { in: ids };
    }

    try {
      const parsedData: Partial<UserSelect> | null = zodSchemaUsersInApi.parse(selectObject);
      console.log("parsedData", parsedData);
    } catch (parseError: unknown) {
      return NextResponse.json(
        { error: "Invalid select", errorMessage: parseError },
        { status: 400 }
      );
    }

    try {
      const users = await prisma.user.findMany({
        where: searchParamsObject,
        take: limit,
        skip: offset,
        select: Object.keys(selectObject).length > 0 ? selectObject : undefined,
      });
      const total = await prisma.user.count({ where: searchParamsObject });

      return NextResponse.json(
        {
          data: users,
          meta:
            !email && !ids
              ? {
                  page,
                  limit,
                  total,
                  totalPages: Math.ceil(total / limit),
                }
              : undefined,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Не вдалося отримати користувачів", errorMessage: error },
        { status: 500 }
      );
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
    const isApiKeyValid = checkApiKey(req);
    if (!isApiKeyValid) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    const data: User = await req.json();

    const { firstName, lastName, email, password, phone, role, license } = data;

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
