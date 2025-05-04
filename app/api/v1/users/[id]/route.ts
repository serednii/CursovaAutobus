import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { validateApiKey, parseStringUserToObject } from "../../routes/util";
import { validateAllowedFields } from "@/lib/utils";
import { allowedFieldsUser, ALLOWED_FIELDS_USER } from "@/app/api/v1/const";

type CustomError = {
  message: string;
  status?: number;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateApiKey(req);
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const selectParams = searchParams.get("select") || allowedFieldsUser; // Наприклад: 'name,email'
    validateAllowedFields(selectParams, ALLOWED_FIELDS_USER);

    const selectObject: Record<string, boolean> = parseStringUserToObject(selectParams);

    // Якщо id передано в параметрах запиту, шукаємо за цими id
    if (!id) {
      return NextResponse.json({ error: "Ви непередали ID" }, { status: 400 });
    }

    const idNumber = parseInt(id || "0", 10);

    const users = await prisma.user.findMany({
      where: {
        id: idNumber, // Пошук користувачів за кількома id
      },
      select: selectParams ? selectObject : undefined,
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Користувачів із заданими ID не знайдено" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error: unknown) {
    // console.error("Помилка при отриманні користувачів:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as CustomError).message
        : "Невідома помилка";

    return NextResponse.json(
      { error: "Не вдалося отримати користувачів", errorMessage },
      { status: (error as CustomError).status || 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateApiKey(req);

    // Отримуємо дані з тіла запиту
    const { id } = await params;
    const idNumber = parseInt(id || "0", 10);
    // Перевірка, чи існує користувач з таким id
    const existingUser = await prisma.user.findUnique({
      where: { id: idNumber },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Видалення користувача
    const deletedUser = await prisma.user.delete({
      where: { id: idNumber },
    });

    // Повертаємо успішну відповідь з видаленим користувачем
    return NextResponse.json({ data: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);

    // Повертаємо повідомлення про помилку
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
