import {
  GenerateBooleanType,
  GenerateType,
  IGetBusSeatsBoolean,
  IGetPassengersSeatsList,
} from "@/types/generaty.types";
import { IBusSeats, routeDataBase } from "@/types/interface";
import {
  ZodFetchGetRoutesByIdMyRoute,
  ZodFetchGetRoutesByIdSeatSelection,
} from "@/zod_shema.ts/fetchGetRoutesByIdMyRoute";

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

type selectRouteMyRouteKeys = (
  | "departureDate"
  | "arrivalDate"
  | "departureFrom"
  | "arrivalTo"
  | "routePrice"
  | "busSeats"
  | "passengersSeatsList"
  | "AvailableSeats"
) &
  keyof routeDataBase;

export type IGetSearchRouteSeatSelectionOption = GenerateBooleanType<
  Exclude<selectRouteSeatSelectionKeys, "passengersSeatsList" | "busSeats">
> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;

export type IGetRouteSeatSelection = GenerateType<
  routeDataBase,
  selectRouteSeatSelectionKeys
>;

export type IGetSearchRouteMyRouteOption = GenerateBooleanType<
  Exclude<selectRouteMyRouteKeys, "busSeats" | "passengersSeatsList">
> &
  IGetBusSeatsBoolean &
  IGetPassengersSeatsList;

export type IGetRouteMyRoute = GenerateType<
  routeDataBase,
  selectRouteMyRouteKeys
>;

export default async function fetchGetRoutesById<TSelect, TResult>(
  id: number[],
  select: TSelect
): Promise<TResult | null> {
  try {
    console.log("iddd ", id, select);
    const response = await fetch(`${API_URL}/api/getRoutesById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, select }),
    });

    console.log("response ", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Помилка запиту:", errorData.error || "Невідома помилка");
      return null;
    }

    const data = await response.json();
    return data.routes as TResult; // Приводимо результат до типу TResult
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
    return null;
  }
}

export const fetchGetRoutesByIdSeatSelection = async <
  T,
  K extends IGetRouteSeatSelection[]
>(
  id: number[],
  data: T
): Promise<K | null> =>
  fetchGetRoutesById<T, K>(id, data).then((res: any) => {
    try {
      const parsedData = ZodFetchGetRoutesByIdSeatSelection.parse(res) as K;
      console.log("res11111", parsedData);

      return parsedData;
    } catch (error) {
      throw new Error("Invalid response format: " + error);
    }
  });

export const fetchGetRoutesByIdMyRoute = async <
  T,
  K extends IGetRouteMyRoute[]
>(
  id: number[],
  data: T
): Promise<K | null> =>
  fetchGetRoutesById<T, K>(id, data).then((res: any) => {
    try {
      console.log("res2222", res);
      const parsedData = ZodFetchGetRoutesByIdMyRoute.parse(res) as K;
      return parsedData;
    } catch (error) {
      throw new Error("Invalid response format: " + error);
    }
  });
