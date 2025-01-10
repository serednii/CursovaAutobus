import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  try {
    // Очікуємо парсинг JSON
    const data: User = await req.json();
    console.log("api/users", data);
    // Перевірка на валідність даних
    const { firstName, lastName, email, password, phone, role, license } = data;
    console.log("Request data:", data);

    if (!firstName || !lastName || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Invalid data: all fields are required" },
        { status: 400 }
      );
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
        phone: phone,
        role: role || "guest",
        license: license || "no license",
      },
    });

    return NextResponse.json({ user: "kjhijj" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
