import {
  IGetSearchRouteMany,
  IGetSearchRouteOne,
} from "@/types/searchroute.types";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const schemaRouteMany: z.ZodType<IGetSearchRouteMany> = z.object({
  id: z.number(),
  driverId: z.number(),
  departureDate: z.string(),
  arrivalDate: z.string(),
  departureFrom: z.string(),
  arrivalTo: z.string(),
  busNumber: z.string(),
  routePrice: z.number(),
  notate: z.string(),
  wifi: z.boolean(),
  coffee: z.boolean(),
  power: z.boolean(),
  restRoom: z.boolean(),
  modelBus: z.string(),
  maxSeats: z.number(),
  bookedSeats: z.number(),
});

const schemaRouteOne: z.ZodType<IGetSearchRouteOne> = z.object({
  departureDate: z.string(),
});

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
      const parsedData = schemaRouteMany.array().parse(res) as K;
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
      const parsedData = schemaRouteOne.array().parse(res) as K;
      return parsedData;
    } catch (error) {
      throw new Error("Invalid response format: " + error);
    }
  });
