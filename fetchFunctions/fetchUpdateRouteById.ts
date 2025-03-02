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

// export default async function fetchGetRoutesById<TResult, TSelect>(id: number[], select: TSelect): Promise<TResult> {
//   try {
//     // console.log("Відправка запиту:", id, select);

//     const response = await fetch(`${API_URL}/api/getRoutesById`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, select }),
//     });

//     // console.log("Отримано відповідь:", response.status, response.statusText);

//     if (!response.ok) {
//       throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
//     }

//     // Перевірка на порожню відповідь
//     if (response.headers.get("Content-Length") === "0" || response.status === 204) {
//       throw new Error("Сервер повернув порожню відповідь.");
//     }

//     const data: TResult = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Помилка під час виконання запиту:", error);
//     throw error; // Відхиляємо проміс, щоб `.catch()` його обробив
//   }
// }

// export const fetchGetRoutesByIdSeatSelection = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteSeatSelection[]> => {
//   try {
//     const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

//     if (!res) {
//       throw new Error("Помилка: отримано null або undefined");
//     }
//     console.log("res1111", res);
//     try {
//       const parsedData = ZodFetchGetRoutesByIdSeatSelection.parse(res);
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   } catch (error) {
//     console.error("Помилка при отриманні або парсингу:", error);
//     throw error;
//   }
// };
