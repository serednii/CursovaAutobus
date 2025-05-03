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
  // | "passengersSeatsList"
  keyof IRouteDataBase;

export type TRouteUpdateResult = GenerateType<IRouteDataBase, TRouteSeatUpdateKeys>;

async function updateRouteById<TResult extends IUpdateRoute>(updateRouteById: TResult) {
  const id = updateRouteById.id;
  console.log(
    "updateRouteById.ts",
    updateRouteById,
    "============",
    `${API_URL}/api/v1/routes/${id}`
  );
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

    const data: unknown = await response.json();
    console.log("Отриманий маршрут fetchUpdateRouteById:", data);

    try {
      // const parsedData: TRouteUpdateResult = zodSchemaUpdateRouteResData.parse(data);
      // return parsedData;
      return data;
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
// driverId: number;
// departureDate: string;
// arrivalDate: string;
// busSeats: IBusSeats[];
// modelBus: string;
// wifi: boolean;
// coffee: boolean;
// power: boolean;
// restRoom: boolean;
// routePrice: number;
// busNumber: string;
// maxSeats: number;
// bookedSeats: number;
// selectBusLayout: string;
// notate: string;
// departureFrom: string;
// arrivalTo: string;
// id: number;

// id: number;
// departureDate: string;
// arrivalDate: string;
// departureFrom: string;
// arrivalTo: string;
// routePrice: number;
// busSeats: IBusSeats[];
// driverId: number;
// busNumber: string;
// selectBusLayout: string;
// notate: string;
// modelBus: string;
// maxSeats: number;
// bookedSeats: number;
// wifi: boolean;
// coffee: boolean;
// power: boolean;
// restRoom: boolean;
