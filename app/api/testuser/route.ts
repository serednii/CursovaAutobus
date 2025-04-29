// import { middleware } from "@/middleware";
import { NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";

export async function POST() {
  try {
    // Викликаємо middleware для перевірки авторизації

    // Отримуємо всіх користувачів з бази даних
    const users = await prisma.user.findMany();
    // console.log("routeDriver", users);

    // Повертаємо успішну відповідь з даними користувачів
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);

    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Не вдалося отримати користувачів" }, { status: 500 });
  }
}
