import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { ZodSchemaSearchRouteMany, ZodSchemaSearchRouteOne } from "@/zod_shema/zodGetSearchRoute";

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

const searchRoute = async <T, K>(data: T): Promise<unknown> => {
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

    const res: K = await response.json();

    return res;
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
    return null;
  }
};

export default searchRoute;

export const searchRouteMany = async <T, K extends IGetSearchRouteMany[]>(data: T): Promise<K | null> =>
  searchRoute<T, K>(data).then((res: unknown) => {
    try {
      const parsedData = ZodSchemaSearchRouteMany.array().parse(res) as K;
      return parsedData;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  });

export const searchRouteOne = async <T, K extends IGetSearchRouteOne[]>(data: T): Promise<K | null> =>
  searchRoute<T, K>(data).then((res: unknown) => {
    try {
      const parsedData = ZodSchemaSearchRouteOne.array().parse(res) as K;
      return parsedData;
    } catch (parseError) {
      throw new Error(parseError instanceof Error ? parseError.message : "Помилка парсингу даних");
    }
  });
