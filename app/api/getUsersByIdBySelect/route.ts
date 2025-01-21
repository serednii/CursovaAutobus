import { prisma } from "@/prisma/prisma-client";
import { UserSelect } from "@/types/users.types";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    // Отримуємо дані з тіла запиту
    const { ids, select }: { ids: number[]; select: UserSelect } =
      await req.json();
    // console.log("Select options oooooooooooooooo:", select, ids);

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Поле 'ids' є обов'язковим і має бути масивом" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: ids, // Пошук за списком id
        },
      },
      select: select,
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Користувачів із заданими ID не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Помилка обробки запиту:", error);
    return NextResponse.json(
      { error: "Не вдалося обробити запит" },
      { status: 500 }
    );
  }
}
