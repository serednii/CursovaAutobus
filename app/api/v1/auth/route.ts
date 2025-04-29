import { middleware } from "@/middleware";
import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";
// import { User } from "@prisma/client";
// import bcrypt from "bcrypt";

// app/api/users/route.ts

export async function GET(req: NextRequest) {
  try {
    // Викликаємо middleware для перевірки авторизації
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }

    const { searchParams } = new URL(req.url);
    const selectParam = searchParams.get("select"); // Наприклад: 'name,email'

    // Якщо параметр select присутній, розбиваємо його на поля
    const selectFields = selectParam ? selectParam.split(",") : [];

    //  Record<string extends keyof UserSelect, boolean>
    const selectObject: Record<string, boolean> = selectFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);

    // Якщо параметр select не вказаний, вибираємо всі поля
    const users = await prisma.user.findMany({
      select: selectObject,
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні користувачів:", error);
    return NextResponse.json({ error: "Не вдалося отримати користувачів" }, { status: 500 });
  }
}
