import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
// import { method } from "lodash";
import { validateApiKey, parseStringUserToObject } from "../routes/util";
import { validateAllowedFields } from "@/lib/utils";
import { allowedFieldsUser } from "@/app/api/v1/const";
import { ALLOWED_FIELDS_USER } from "@/app/api/v1/const";

const limitEnv = process.env.NEXT_PUBLIC_DEFAULT_LIMIT || "100";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    validateApiKey(req);
    const selectParams = searchParams.get("select") || allowedFieldsUser; // Наприклад: 'name,email'
    validateAllowedFields(selectParams, ALLOWED_FIELDS_USER);

    const email = searchParams.get("email");
    const searchParamsObject: { email?: string; id?: { in: number[] } } = {};
    const idsStr = searchParams.get("filter[ids]");
    const ids = idsStr && idsStr.split(",").map(Number);

    if (email) {
      searchParamsObject.email = email;
    } else if (ids && ids.length > 0) {
      searchParamsObject.id = { in: ids };
    }

    const selectObject = parseStringUserToObject(selectParams);
    const limit = parseInt(searchParams.get("limit") || limitEnv, 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const offset = (page - 1) * limit;

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
    console.error("Помилка при отриманні користувачів:", error);
    return NextResponse.json(
      { error: "Не вдалося отримати користувачів", errorMessage: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    validateApiKey(req);
    const data: User = await req.json();

    const { firstName, lastName, email, password, phone, role, license } = data;
    const selectParams = Object.keys(data).join(",");

    validateAllowedFields(selectParams, ALLOWED_FIELDS_USER);

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
    const users = await prisma.user.create({
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
    return NextResponse.json({ users }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
