import { GenerateType } from "@/types/generaty.types";
import { IIntermediateStops, IRouteDataBase } from "@/types/interface";
import { SuccessResponse, ErrorResponse } from "@/types/response.types";
import { allParametersRoute } from "@/zod_shema/zodBase";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function deleteRouteById(routeId: number) {
  try {
    // console.log("fetchDeleteRouteById", routeId);
    // Відправка DELETE-запиту
    const response = await fetch(`${API_URL}/api/v1/routes/id/${routeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Обробка відповіді
    const data: unknown = await response.json();
    // console.log("Отримані маршрути:", data);
    try {
      const res = z.object(allParametersRoute).parse(data);
      const successResponse: SuccessResponse = {
        message: "Пасажир успішно видалений",
      };
      return successResponse;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }

    // // Повертаємо успішну відповідь
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);

    // Повертаємо помилкову відповідь
    const errorResponse: ErrorResponse = {
      error: error instanceof Error ? error.message : "Невідома помилка",
    };
    return errorResponse;
  }
}

export default deleteRouteById;
