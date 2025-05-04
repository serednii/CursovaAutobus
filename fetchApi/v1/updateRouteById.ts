import { GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { IUpdateRoute } from "@/types/route-passenger.types";
import { zodSchemaUpdateRouteResData } from "@/zod_shema/zodGetUpdateRoute";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type TRouteSeatUpdateKeys = (
  | "id"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "bookedSeats"
  | "selectBusLayout"
  | "busNumber"
  | "modelBus"
  | "createdAt"
  | "driverId"
  | "wifi"
  | "coffee"
  | "power"
  | "restRoom"
  | "maxSeats"
  | "notate"
  | "busSeats"
) &
  keyof IRouteDataBase;

export type TRouteUpdateResult = GenerateType<IRouteDataBase, TRouteSeatUpdateKeys>;

async function updateRouteById<TResult extends IUpdateRoute>(updateRouteById: TResult) {
  const id = updateRouteById.id;
  try {
    const response = await fetch(`${API_URL}/api/v1/routes/${id}`, {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify(updateRouteById),
    });

    if (!response.ok) {
      toast.error("Невждалося зарервувати маршрут");
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();

    try {
      const parsedData: TRouteUpdateResult = zodSchemaUpdateRouteResData.parse(result.data);
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

export default updateRouteById;
