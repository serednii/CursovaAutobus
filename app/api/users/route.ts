import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { prisma } from "@/prisma/prisma-client";
import bcrypt from "bcrypt";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  license: string;
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  try {
    // Очікуємо парсинг JSON
    const data: UserData = await req.json();
    console.log("Request data:", data);

    // Перевірка на валідність даних
    const { firstName, lastName, email, password, phone, role, license } = data;

    if (!firstName || !email || !password) {
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
        lastName: lastName || "",
        email,
        password: hashedPassword, // Збереження хешованого пароля
        phone: phone || "",
        role: role || "guest",
        license: license || "",
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
