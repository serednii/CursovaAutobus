import { GenerateBooleanType, GenerateType, IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";
import { routeDataBase } from "@/types/interface";
import { ZodFetchGetRoutesByIdMyRoute, ZodFetchGetRoutesByIdSeatSelection } from "@/zod_shema/zodGetRoutesById";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectRouteSeatSelectionKeys = (
  | "id"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "busSeats"
  | "selectBusLayout"
  | "modelBus"
  | "maxSeats"
  | "bookedSeats"
  | "passengersSeatsList"
) &
  keyof routeDataBase;

type selectRouteMyRouteKeys = ("departureDate" | "arrivalDate" | "departureFrom" | "arrivalTo" | "routePrice" | "busSeats" | "passengersSeatsList") &
  keyof routeDataBase;

export type IGetSearchRouteSeatSelectionOption = GenerateBooleanType<Exclude<selectRouteSeatSelectionKeys, "passengersSeatsList" | "busSeats">> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;

export type IGetRouteSeatSelection = GenerateType<routeDataBase, selectRouteSeatSelectionKeys>;

export type IGetSearchRouteMyRouteOption = GenerateBooleanType<Exclude<selectRouteMyRouteKeys, "busSeats" | "passengersSeatsList">> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;

export type IGetRouteMyRoute = GenerateType<routeDataBase, selectRouteMyRouteKeys>;

export default async function fetchGetRoutesById<TResult, TSelect>(id: number[], select: TSelect): Promise<TResult> {
  try {
    console.log("Відправка запиту:", id, select);

    const response = await fetch(`${API_URL}/api/getRoutesById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, select }),
    });

    console.log("Отримано відповідь:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    // Перевірка на порожню відповідь
    if (response.headers.get("Content-Length") === "0" || response.status === 204) {
      throw new Error("Сервер повернув порожню відповідь.");
    }

    const data: TResult = await response.json();
    return data;
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    throw error; // Відхиляємо проміс, щоб `.catch()` його обробив
  }
}

export const fetchGetRoutesByIdSeatSelection = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteSeatSelection[]> => {
  try {
    const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

    if (!res) {
      throw new Error("Помилка: отримано null або undefined");
    }
    console.log("res1111", res);
    try {
      const parsedData = ZodFetchGetRoutesByIdSeatSelection.parse(res);
      return parsedData;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  } catch (error) {
    console.error("Помилка при отриманні або парсингу:", error);
    throw error;
  }
};

export const fetchGetRoutesByIdMyRoute = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteMyRoute[]> => {
  try {
    const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

    console.log("res2222", res);

    if (!res) {
      throw new Error("Помилка: отримано null або undefined");
    }

    // Якщо потрібно валідувати через Zod, раскоментуйте цей рядок:

    try {
      const parsedData = ZodFetchGetRoutesByIdMyRoute.parse(res);
      return parsedData;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }

    // return res;
  } catch (error) {
    console.error("Помилка при отриманні або парсингу:", error);
    throw error;
  }
};
