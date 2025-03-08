import { GenerateBooleanType, GenerateType, IGetBusSeatsBoolean, IGetPassengersSeatsList } from "@/types/generaty.types";
import { IIntermediateStops, IRouteDataBase } from "@/types/interface";
import {
  ZodFetchGetRoutesByIdAgain,
  ZodFetchGetRoutesByIdMyRoute,
  ZodFetchGetRoutesByIdSeatSelection,
  ZodFetchGetRoutesByIdUpdate,
} from "@/zod_shema/zodGetRoutesById";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

//********************************************************** */

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
  | "driverId"
) &
  keyof IRouteDataBase;
export type IGetSearchRouteSeatSelectionOption = GenerateBooleanType<Exclude<selectRouteSeatSelectionKeys, "passengersSeatsList" | "busSeats">> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;
export type IGetRouteSeatSelection = GenerateType<IRouteDataBase, selectRouteSeatSelectionKeys>;

//********************************************************** */

type selectRouteMyRouteKeys = ("departureDate" | "arrivalDate" | "departureFrom" | "arrivalTo" | "routePrice" | "busSeats" | "passengersSeatsList") &
  keyof IRouteDataBase;
export type IGetSearchRouteMyRouteOption = GenerateBooleanType<Exclude<selectRouteMyRouteKeys, "busSeats" | "passengersSeatsList">> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;
export type IGetRouteMyRoute = GenerateType<IRouteDataBase, selectRouteMyRouteKeys>;

//********************************************************** */

type selectRouteSeatUpdateKeys = (
  | "id"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "busSeats"
  | "selectBusLayout"
  | "modelBus"
  | "passengersSeatsList"
  | "driverId"
  | "wifi"
  | "coffee"
  | "power"
  | "restRoom"
  | "bookedSeats"
  | "maxSeats"
  | "intermediateStops"
) &
  keyof IRouteDataBase;
export type IGetSearchRouteUpdateOption = GenerateBooleanType<Exclude<selectRouteSeatUpdateKeys, "busSeats" | "passengersSeatsList">> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;
export type IGetRouteUpdate = GenerateType<IRouteDataBase, Exclude<selectRouteSeatUpdateKeys, "intermediateStops">> & {
  intermediateStops: IIntermediateStops[];
};

//********************************************************** */

type selectRouteAgainKeys = ("departureFrom" | "arrivalTo" | "routePrice" | "modelBus" | "driverId" | "intermediateStops") & keyof IRouteDataBase;
export type IGetSearchRouteAgainOption = GenerateBooleanType<selectRouteAgainKeys>;
export type IGetRouteAgain = GenerateType<IRouteDataBase, Exclude<selectRouteAgainKeys, "intermediateStops">> & {
  intermediateStops: IIntermediateStops[];
};

//********************************************************** */

export default async function fetchGetRoutesById<TResult, TSelect>(id: number[], select: TSelect): Promise<TResult | null> {
  try {
    // console.log("Відправка запиту:", id, select);

    const response = await fetch(`${API_URL}/api/getRoutesById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, select }),
    });

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

const createFetchGetRoutesByIdFetcher = <TResult, TSelect>(schema: z.ZodSchema<TResult>) => {
  return async (id: number[], select: TSelect): Promise<TResult | null> => {
    try {
      const result = await fetchGetRoutesById<TResult, TSelect>(id, select);
      if (!result) {
        throw new Error("Помилка: отримано null або undefined");
      }
      return schema.parse(result);
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  };
};

export const fetchGetRoutesByIdSeatSelection = createFetchGetRoutesByIdFetcher<IGetRouteSeatSelection[], IGetSearchRouteSeatSelectionOption>(
  ZodFetchGetRoutesByIdSeatSelection
);

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

export const fetchGetRoutesByIdMyRoute = createFetchGetRoutesByIdFetcher<IGetRouteMyRoute[], IGetSearchRouteMyRouteOption>(
  ZodFetchGetRoutesByIdMyRoute
);
// export const fetchGetRoutesByIdMyRoute1 = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteMyRoute[]> => {
//   try {
//     const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

//     // console.log("res2222", res);

//     if (!res) {
//       throw new Error("Помилка: отримано null або undefined");
//     }

//     // Якщо потрібно валідувати через Zod, раскоментуйте цей рядок:

//     try {
//       const parsedData = ZodFetchGetRoutesByIdMyRoute.parse(res);
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }

//     // return res;
//   } catch (error) {
//     console.error("Помилка при отриманні або парсингу:", error);
//     throw error;
//   }
// };

export const fetchGetRoutesByIdUpdate = createFetchGetRoutesByIdFetcher<IGetRouteUpdate[], IGetSearchRouteUpdateOption>(ZodFetchGetRoutesByIdUpdate);
// export const fetchGetRoutesByIdUpdate = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteUpdate[]> => {
//   try {
//     const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

//     // console.log("res2222", res);

//     if (!res) {
//       throw new Error("Помилка: отримано null або undefined");
//     }

//     // Якщо потрібно валідувати через Zod, раскоментуйте цей рядок:

//     try {
//       const parsedData = ZodFetchGetRoutesByIdUpdate.parse(res);
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }

//     // return res;
//   } catch (error) {
//     console.error("Помилка при отриманні або парсингу:", error);
//     throw error;
//   }
// };
export const fetchGetRoutesByIdAgain = createFetchGetRoutesByIdFetcher<IGetRouteAgain[], IGetSearchRouteAgainOption>(ZodFetchGetRoutesByIdAgain);
// export const fetchGetRoutesByIdAgain = async <TSelect, TResult>(id: number[], data: TSelect): Promise<IGetRouteAgain[]> => {
//   try {
//     const res = await fetchGetRoutesById<TResult, TSelect>(id, data);

//     console.log("res2222", res);

//     if (!res) {
//       throw new Error("Помилка: отримано null або undefined");
//     }

//     // Якщо потрібно валідувати через Zod, раскоментуйте цей рядок:

//     try {
//       const parsedData = ZodFetchGetRoutesByIdAgain.parse(res);
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }

//     // return res;
//   } catch (error) {
//     console.error("Помилка при отриманні або парсингу:", error);
//     throw error;
//   }
// };
