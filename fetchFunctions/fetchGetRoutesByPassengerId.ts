import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { zodGetRoutesByPassengerId } from "@/zod_shema/zodGetRoutesByPassengerId";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByPassengerId<TSelect>(
  passengerId: number,
  select: TSelect
): Promise<Omit<GetRoutesByPassengerId, "isReservation">[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/getRoutesByPassengerId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passengerId, select }),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    try {
      const res = zodGetRoutesByPassengerId.parse(data); // Валідуємо схему
      return res;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    throw new Error(`Помилка сервера:${error}`);
  }
}

export default fetchGetRoutesByPassengerId;
