import { GenerateBooleanType, GenerateType } from "@/types/generaty.types";
import { IRouteDataBase } from "@/types/interface";
import {
  IGetSearchRouteManyOptionData,
  IGetSearchRouteOneOptionData,
} from "@/types/searchRoute.types";
// import {
//   zodSchemaGetRoutesBuDriverId,
//   zodSchemaGetRoutesBuDriverIdListBlocked,
// } from "@/zod_shema/zodGetRoutesBuDriverId";
// import { ZodFetchGetRoutesByICity } from "@/zod_shema/zodGetRoutesById";
import { ZodSchemaSearchRouteMany, ZodSchemaSearchRouteOne } from "@/zod_shema/zodGetSearchRoute";
import { z } from "zod";
import { buildRouteSearchURL } from "../utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type IRouteDataBaseWithCity = IRouteDataBase & {
  departureFromCity?: string;
  arrivalToCity?: string;
};

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
  keyof IRouteDataBaseWithCity;

type selectRouteOneKeys = ("departureDate" | "driverId") & keyof IRouteDataBase;

export type IGetSearchRouteManyOption = GenerateBooleanType<selectRouteManyKeys>;

export type IGetSearchRouteMany = GenerateType<
  IRouteDataBaseWithCity,
  selectRouteManyKeys | ("departureFromCity" | "arrivalToCity")
>;

export type IGetSearchRouteOneOption = GenerateBooleanType<selectRouteOneKeys>;

export type IGetSearchRouteOne = GenerateType<IRouteDataBase, selectRouteOneKeys>;

type selectRouteCityKeys = ("departureFrom" | "arrivalTo") & keyof IRouteDataBase;

export type IGetSearchRouteCityOption = GenerateBooleanType<selectRouteCityKeys>;

export type IGetRouteCity = GenerateType<IRouteDataBase, selectRouteCityKeys>;

//********************************************************** */

// //********************************************************** */

type selectRoutesByIdDriverKeys = (
  | "id"
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "bookedSeats"
  | "maxSeats"
) &
  keyof IRouteDataBase;
export type IGetRoutesByDriverOption = GenerateBooleanType<selectRoutesByIdDriverKeys>;
export type IRoutesByIdDriver = GenerateType<IRouteDataBase, selectRoutesByIdDriverKeys>;

export const selectGetRoutesByDriverId: IGetRoutesByDriverOption = {
  id: true,
  departureDate: true,
  arrivalDate: true,
  departureFrom: true,
  arrivalTo: true,
  routePrice: true,
  bookedSeats: true,
  maxSeats: true,
};
// //********************************************************** */

type selectRoutesByIdDriverListBlockedKeys = ("id" | "departureDate" | "arrivalDate") &
  keyof IRouteDataBase;
export type IGetRoutesByDriverListBlockedOption =
  GenerateBooleanType<selectRoutesByIdDriverListBlockedKeys>;
export type IRoutesByIdDriverListBlocked = GenerateType<
  IRouteDataBase,
  selectRoutesByIdDriverListBlockedKeys
>;

export const selectRouteListBlocked: IGetRoutesByDriverListBlockedOption = {
  id: true,
  departureDate: true, // Залишаємо це поле
  arrivalDate: true, // Залишаємо це поле
};

interface TypeObject<T, K> {
  type: string;
  schema: z.ZodSchema<K>;
  search: (data: T) => Promise<K | null>;
}

class SearchRoute {
  private types: TypeObject<any, any>[] = [];

  addType<T, K>(type: string, schema: z.ZodSchema<K>) {
    this.types.push({
      type,
      schema,
      search: async (
        data: T extends IGetSearchRouteManyOptionData
          ? IGetSearchRouteOneOptionData
          : IGetSearchRouteManyOptionData
      ): Promise<K | null> => {
        const { select, ...rest } = data;
        const selectString = Object.keys(select).join(",");
        const searchURL = buildRouteSearchURL(rest);
        console.log(
          "data searchRoute",
          data,
          rest,
          type,
          `${API_URL}/api/v1/routes?${searchURL}&select=${selectString}`
        );

        try {
          const response = await fetch(
            `${API_URL}/api/v1/routes?${searchURL}&select=${selectString}`,
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
          console.log("createRoute.ts", result);
          // return result; // Перевірка через Zod перед поверненням
          return schema.parse(result.data); // Перевірка через Zod перед поверненням
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

export const getRoute = new SearchRoute();

getRoute.addType<IGetSearchRouteManyOptionData, IGetSearchRouteMany[]>(
  "many",
  ZodSchemaSearchRouteMany.array()
);

getRoute.addType<IGetSearchRouteOneOptionData, IGetSearchRouteOne[]>(
  "one",
  ZodSchemaSearchRouteOne.array()
);
