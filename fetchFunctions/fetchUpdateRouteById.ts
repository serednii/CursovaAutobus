import { GenerateBooleanType, GenerateType, IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";
import { routeDataBase } from "@/types/interface";
import { IUpdateRoute } from "@/types/route-passenger.types";
import { zodSchemaUpdateRouteIn, zodSchemaUpdateRouteRes } from "@/zod_shema/zodGetUpdateRoute";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchUpdateRouteById<TResult>(updateRouteById: TResult) {
  try {
    console.log("updateRouteByIdParsed", updateRouteById);

    const response = await fetch(`${API_URL}/api/updateRouteById`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRouteById),
    });

    if (!response.ok) {
      toast.error("Невждалося зарервувати маршрут");
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    // console.log("Отриманий маршрут:", data);

    try {
      const parsedData = zodSchemaUpdateRouteRes.parse(data);
      console.log("Отриманий маршрут:", parsedData);
      return parsedData;
    } catch (parseError: unknown) {
      console.error("Помилка парсингу даних:", parseError);
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error: unknown) {
    console.error("Помилка під час виконання запиту:", error);
    toast.error("Невждалося зарервувати маршрут");
    throw new Error(error instanceof Error ? error.message : "Помилка під час виконання запиту");
  }
}

export default fetchUpdateRouteById;
