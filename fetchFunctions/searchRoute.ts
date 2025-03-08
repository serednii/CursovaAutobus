import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { IGetSearchRouteManyOptionData, IGetSearchRouteOneOptionData } from "@/types/searchRoute.types";
import { ZodSchemaSearchRouteMany, ZodSchemaSearchRouteOne } from "@/zod_shema/zodGetSearchRoute";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type selectRouteManyKeys = (
  | "id"
  | "driverId"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "busNumber"
  | "routePrice"
  | "modelBus"
  | "maxSeats"
  | "bookedSeats"
  | "busSeats"
  | "passengersSeatsList"
) &
  keyof IRouteDataBase;

type selectRouteOneKeys = ("departureDate" | "driverId") & keyof IRouteDataBase;

export type IGetSearchRouteManyOption = GenerateBooleanType<selectRouteManyKeys>;

export type IGetSearchRouteMany = GenerateType<IRouteDataBase, selectRouteManyKeys>;

export type IGetSearchRouteOneOption = GenerateBooleanType<selectRouteOneKeys>;
export type IGetSearchRouteOne = GenerateType<IRouteDataBase, selectRouteOneKeys>;

const searchRoute = async <T, K>(data: T): Promise<K | null> => {
  try {
    const response = await fetch(`${API_URL}/api/searchRoute`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
    return null;
  }
};

export default searchRoute;

// Фабрика для створення запитів із перевіркою даних  Патерн "Фабрика запитів" (Request Factory)
const createSearchRouteFetcher = <T, K>(schema: z.ZodSchema<K>) => {
  return async (data: T): Promise<K | null> => {
    const result = await searchRoute<T, K>(data);
    try {
      return schema.parse(result);
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  };
};

// Використання фабрики для конкретних запитів
export const searchRouteMany = createSearchRouteFetcher<IGetSearchRouteManyOptionData[], IGetSearchRouteMany[]>(ZodSchemaSearchRouteMany.array());

export const searchRouteOne = createSearchRouteFetcher<IGetSearchRouteOneOptionData[], IGetSearchRouteOne[]>(ZodSchemaSearchRouteOne.array());

// export const searchRouteMany = async <T, K extends IGetSearchRouteMany[]>(data: T): Promise<K | null> =>
//   searchRoute<T, K>(data).then((res: unknown) => {
//     console.log("search route many", data);
//     try {
//       const parsedData = ZodSchemaSearchRouteMany.array().parse(res) as K;
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   });

// export const searchRouteOne = async <T, K extends IGetSearchRouteOne[]>(data: T): Promise<K | null> =>
//   searchRoute<T, K>(data).then((res: unknown) => {
//     try {
//       const parsedData = ZodSchemaSearchRouteOne.array().parse(res) as K;
//       return parsedData;
//     } catch (parseError) {
//       throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
//     }
//   });
