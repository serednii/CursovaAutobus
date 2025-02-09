import { GenerateBooleanType, GenerateType } from "./generaty.types";
import { routeDataBase } from "./interface";

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
