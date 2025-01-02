import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  try {
    // Очікуємо парсинг JSON
    const data = await req.json();

    // Перевірка на валідність даних
    if (!data || !data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: "Invalid data: name, email, and password are required" },
        { status: 400 }
      );
    }

    // Створення користувача
    const user = await prisma.user.create({
      data: {
        // name: data.name,
        // email: data.email,
        // password: data.password, // У реальному проєкті слід хешувати пароль
        name: "Olena",
        email: "olena@gmail.com",
        password: "12345dfdfbSW45",
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
