import { middleware } from "@/middleware";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";

export async function POST(req: NextRequest) {
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
