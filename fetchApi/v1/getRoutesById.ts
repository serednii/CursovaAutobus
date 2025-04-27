import {
  GenerateBooleanType,
  GenerateType,
  IGetBusSeatsBoolean,
  IGetPassengersSeatsList,
} from "@/types/generaty.types";
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
export type IGetSearchRouteSeatSelectionOption = GenerateBooleanType<
  Exclude<selectRouteSeatSelectionKeys, "passengersSeatsList" | "busSeats">
> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;
export type IGetRouteSeatSelection = GenerateType<IRouteDataBase, selectRouteSeatSelectionKeys>;

//********************************************************** */

type selectRouteMyRouteKeys = (
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "busSeats"
  | "passengersSeatsList"
) &
  keyof IRouteDataBase;
export type IGetSearchRouteMyRouteOption = GenerateBooleanType<
  Exclude<selectRouteMyRouteKeys, "busSeats" | "passengersSeatsList">
> &
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
  | "busNumber"
  | "restRoom"
  | "bookedSeats"
  | "maxSeats"
  | "intermediateStops"
) &
  keyof IRouteDataBase;
export type IGetSearchRouteUpdateOption = GenerateBooleanType<
  Exclude<selectRouteSeatUpdateKeys, "busSeats" | "passengersSeatsList">
> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;
export type IGetRouteUpdate = GenerateType<
  IRouteDataBase,
  Exclude<selectRouteSeatUpdateKeys, "intermediateStops">
> & {
  intermediateStops: IIntermediateStops[];
};

//********************************************************** */

type selectRouteAgainKeys = (
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "modelBus"
  | "busNumber"
  | "driverId"
  | "intermediateStops"
) &
  keyof IRouteDataBase;
export type IGetSearchRouteAgainOption = GenerateBooleanType<selectRouteAgainKeys>;
export type IGetRouteAgain = GenerateType<
  IRouteDataBase,
  Exclude<selectRouteAgainKeys, "intermediateStops">
> & {
  intermediateStops: IIntermediateStops[];
};

interface TypeObject<T, K> {
  type: string;
  schema: z.ZodSchema<K>;
  search: (id: number, select: T) => Promise<K | null>;
}

class GetRoutesById {
  private types: TypeObject<any, any>[] = [];

  addType<T, K>(type: string, schema: z.ZodSchema<K>) {
    this.types.push({
      type,
      schema,
      search: async (id: number, select: T): Promise<K | null> => {
        try {
          const selectString = Object.keys(select).join(",");
          // console.log("data searchRoute", id, select);
          console.log("API_URL", `${API_URL}/api/v1/routes/id/${id}?select=${selectString}`);
          const response = await fetch(`${API_URL}/api/v1/routes/id/${id}?select=${selectString}`, {
            cache: "no-store",
            headers: {
              apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
            },
          });

          if (!response.ok)
            throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);

          const result = await response.json();
          console.log("result search route", result);
          return result; // Перевірка через Zod перед поверненням
        } catch (error) {
          console.error("Error fetching data:", (error as Error).message);
          return null;
        }
      },
    });
  }

  async searchRoute<T, K>(id: number, data: T, type: string): Promise<K | null> {
    const foundType = this.types.find((item) => item.type === type);

    if (!foundType) {
      console.error(`Type "${type}" not found`);
      return null;
    }

    return foundType.search(id, data);
  }
}

export const getRoutesById = new GetRoutesById();

getRoutesById.addType<IGetSearchRouteSeatSelectionOption, IGetRouteSeatSelection[]>(
  "seatSelection",
  ZodFetchGetRoutesByIdSeatSelection.array()
);
getRoutesById.addType<IGetSearchRouteMyRouteOption, IGetRouteMyRoute[]>(
  "byIdMyRoute",
  ZodFetchGetRoutesByIdMyRoute.array()
);
getRoutesById.addType<IGetSearchRouteUpdateOption, IGetRouteUpdate[]>(
  "ByIdUpdate",
  ZodFetchGetRoutesByIdUpdate.array()
);
getRoutesById.addType<IGetSearchRouteAgainOption, IGetRouteAgain[]>(
  "byIdAgain",
  ZodFetchGetRoutesByIdAgain.array()
);
