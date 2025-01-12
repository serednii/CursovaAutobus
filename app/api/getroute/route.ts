import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req:any) {
  try {
    // Отримуємо дані з тіла запиту
    const { driverId } = await req.json();

    // Перевірка, чи передано id
    if (!driverId) {
      return NextResponse.json(
        { error: "Поле 'id' є обов'язковим" },
        { status: 400 }
      );
    }

    const routes = await prisma.routeDriver.findMany({
      where: { driverId },
    });

    if (!routes.length) {
      return NextResponse.json(
        { message: "No routes found for the specified driverId" },
        { status: 404 }
      );
    }

    return NextResponse.json({ routes });
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
