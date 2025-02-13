import { IUpdateRouteWithId } from "@/types/route-passenger.types";
import {
  zodSchemaUpdateRouteIn,
  zodSchemaUpdateRouteRes,
} from "@/zod_shema/zodGetUpdateRoute";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


async function fetchUpdateRouteById(updateRouteById: IUpdateRouteWithId) {
  try {
    const updateRouteByIdParsed = zodSchemaUpdateRouteIn.parse(updateRouteById);
    console.log("updateRouteByIdParsed", updateRouteByIdParsed);
    const response = await fetch(`${API_URL}/api/updateRouteById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRouteByIdParsed),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      throw new Error(errorData.error || "Невідома помилка");
    }

    const data = await response.json();
    // console.log("Отриманий маршрут:", data);

    try {
      const parsedData = zodSchemaUpdateRouteRes.parse(data);
      console.log("Отриманий маршрут:", parsedData);
      return parsedData;
    } catch (parseError: unknown) {
      console.error("Помилка парсингу даних:", parseError);
      throw new Error(
        parseError instanceof Error
          ? parseError.message
          : "Помилка парсингу даних"
      );
    }
  } catch (error: unknown) {
    console.error("Помилка під час виконання запиту:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Помилка під час виконання запиту"
    );
  }
}

export default fetchUpdateRouteById;
