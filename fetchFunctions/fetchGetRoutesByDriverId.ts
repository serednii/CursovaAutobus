import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import { zodSchemaGetRoutesBuDriverId } from "@/zod_shema/zodGetRoutesBuDriverId";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByDriverId(driverId: number): Promise<IRoutesByIdDriver[] | null> {
  try {
    // Відправка POST-запиту
    const response = await fetch(`${API_URL}/api/getRoutesByDriverId`, {
      cache: "no-store",
      next: { revalidate: 50 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ driverId }), // Передаємо driverId
    });

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Обробка відповіді
    const data: unknown = await response.json();

    try {
      const res: IRoutesByIdDriver[] = zodSchemaGetRoutesBuDriverId.array().parse(data);
      return res;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchGetRoutesByDriverId;
