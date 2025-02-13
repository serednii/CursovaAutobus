import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { routeDataBase } from "@/types/interface";
import {
  ZodSchemaSearchRouteMany,
  ZodSchemaSearchRouteOne,
} from "@/zod_shema/zodGetSearchRoute";

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
  | "notate"
  | "wifi"
  | "coffee"
  | "power"
  | "restRoom"
  | "modelBus"
  | "maxSeats"
  | "bookedSeats"
) &
  keyof routeDataBase;

type selectRouteOneKeys = "departureDate" & keyof routeDataBase;

export type IGetSearchRouteManyOption =
  GenerateBooleanType<selectRouteManyKeys>;

export type IGetSearchRouteMany = GenerateType<
  routeDataBase,
  selectRouteManyKeys
>;

export type IGetSearchRouteOneOption = GenerateBooleanType<selectRouteOneKeys>;
export type IGetSearchRouteOne = GenerateType<
  routeDataBase,
  selectRouteOneKeys
>;

const searchRoute = async <T, K>(data: T): Promise<K | null> => {
  try {
    console.log("data*****----****", data);
    const response = await fetch(`${API_URL}/api/searchRoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res: K = await response.json();

    if (!res || !Array.isArray(res)) {
      throw new Error("Invalid response format");
    }

    return res;
  } catch (error) {
    console.error("Error fetching data:", (error as Error).message);
    return null;
  }
};

export default searchRoute;

export const searchRouteMany = async <T, K extends IGetSearchRouteMany[]>(
  data: T
): Promise<K | null> =>
  searchRoute<T, K>(data).then((res: unknown) => {
    try {
      const parsedData = ZodSchemaSearchRouteMany.array().parse(res) as K;
      return parsedData;
    } catch (error) {
      throw new Error("Invalid response format: " + error);
    }
  });

export const searchRouteOne = async <T, K extends IGetSearchRouteOne[]>(
  data: T
): Promise<K | null> =>
  searchRoute<T, K>(data).then((res: unknown) => {
    try {
      const parsedData = ZodSchemaSearchRouteOne.array().parse(res) as K;
      return parsedData;
    } catch (error) {
      throw new Error("Invalid response format: " + error);
    }
  });
