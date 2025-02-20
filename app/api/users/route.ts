import { middleware } from "@/middleware";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  try {
    // Викликаємо middleware для перевірки авторизації
    const middlewareResponse = await middleware(req);

    // Якщо middleware повернув помилку, повертаємо її
    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    // Отримуємо всіх користувачів з бази даних
    const users = await prisma.user.findMany();
    console.log("routeDriver", users);

    // Повертаємо успішну відповідь з даними користувачів
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);

    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Не вдалося отримати користувачів" }, { status: 500 });
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
    console.log("api/users", data);

    // Перевірка на валідність даних
    const { firstName, lastName, email, password, phone, role, license } = data;
    console.log("Request data:", data);

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
