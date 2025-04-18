import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";

import { ZodFetchGetRoutesByICity } from "@/zod_shema/zodGetRoutesById";
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

type selectRouteCityKeys = ("departureFrom" | "arrivalTo") & keyof IRouteDataBase;
export type IGetSearchRouteCityOption = GenerateBooleanType<selectRouteCityKeys>;
export type IGetRouteCity = GenerateType<IRouteDataBase, selectRouteCityKeys>;

//********************************************************** */

interface TypeObject<T, K> {
  type: string;
  schema: z.ZodSchema<K>;
  search: (data: T) => Promise<K | null>;
}

class FetchGetUniqueRoutes {
  private types: TypeObject<any, any>[] = [];

  addType<T, K>(type: string, schema: z.ZodSchema<K>) {
    this.types.push({
      type,
      schema,
      search: async (data: { select: IGetSearchRouteCityOption }): Promise<K | null> => {
        const { select } = data;
        const selectString = Object.keys(select).join(",");
        console.log("data searchRoute", data);
        console.log("fetchGetUniqueRoutes API_URL", `${API_URL}/api/getUniqueRoutes`);
        try {
          const response = await fetch(
            `${API_URL}/api/v1/routes/uniqueCity?select=${selectString}`,
            {
              cache: "no-store",
              headers: {
                apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
              },
            }
          );

          if (!response.ok)
            throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);

          const result = await response.json();
          return result; // Перевірка через Zod перед поверненням
        } catch (error) {
          console.error("Error fetching data:", (error as Error).message);
          return null;
        }
      },
    });
  }

  //pattern
  async searchRoute<T, K>(data: T, type: string): Promise<K | null> {
    console.log("data", data);
    console.log("type", type);
    const foundType = this.types.find((item) => item.type === type);
    if (!foundType) {
      console.error(`Type "${type}" not found`);
      return null;
    }
    return foundType.search(data);
  }
}
// localhost:3000/api/getUniqueRoutes
// localhost:3000/api/getUniqueRoutes
// http: http:
export const fetchGetUniqueRoutes = new FetchGetUniqueRoutes();

fetchGetUniqueRoutes.addType<IGetSearchRouteCityOption, IGetRouteCity[]>(
  "byCity",
  ZodFetchGetRoutesByICity.array()
);
