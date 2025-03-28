import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import { IGetSearchRouteManyOptionData, IGetSearchRouteOneOptionData } from "@/types/searchRoute.types";
import { ZodFetchGetRoutesByICity } from "@/zod_shema/zodGetRoutesById";
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
      search: async (data: T): Promise<K | null> => {
        console.log("data searchRoute", data);
        try {
          const response = await fetch(`${API_URL}/api/getUniqueRoutes`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);

          const result = await response.json();
          return schema.parse(result); // Перевірка через Zod перед поверненням
        } catch (error) {
          console.error("Error fetching data:", (error as Error).message);
          return null;
        }
      },
    });
  }
  //pattern
  async searchRoute<T, K>(data: T, type: string): Promise<K | null> {
    const foundType = this.types.find((item) => item.type === type);
    if (!foundType) {
      console.error(`Type "${type}" not found`);
      return null;
    }
    return foundType.search(data);
  }
}

export const fetchGetUniqueRoutes = new FetchGetUniqueRoutes();

fetchGetUniqueRoutes.addType<IGetSearchRouteCityOption, IGetRouteCity[]>("byCity", ZodFetchGetRoutesByICity.array());
