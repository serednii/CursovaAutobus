import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { zodGetRoutesByPassengerId } from "@/zod_shema/zodGetRoutesByPassengerId";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchGetRoutesByPassengerId<TSelect>(
  passengerId: number,
  select: TSelect
): Promise<GetRoutesByPassengerId[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/getRoutesByPassengerId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passengerId, select }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    const res = zodGetRoutesByPassengerId.parse(data); // Валідуємо схему
    console.log("Отримані маршрути:", res);
    return res;
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export default fetchGetRoutesByPassengerId;
