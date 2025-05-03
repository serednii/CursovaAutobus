import { ISelectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { zodGetRoutesByPassengerId } from "@/zod_shema/zodGetRoutesByPassengerId";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getRoutesByPassengerId<TSelect extends ISelectMyBookings>(
  passengerId: number,
  select: TSelect
): Promise<Omit<GetRoutesByPassengerId, "isReservation">[] | null> {
  try {
    const selectString = Object.keys(select).join(",");

    const response = await fetch(
      `${API_URL}/api/v1/routes/passengers/${passengerId}?select=${selectString}`,
      {
        cache: "no-store",
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("XXXXXXX", result);
    try {
      const res = zodGetRoutesByPassengerId.parse(result.data); // Валідуємо схему
      return res;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    throw new Error(`Помилка сервера:${error}`);
  }
}

export default getRoutesByPassengerId;
