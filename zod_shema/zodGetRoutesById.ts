import {
  IGetRouteAgain,
  IGetRouteMyRoute,
  IGetRouteSeatSelection,
  IGetRouteUpdate,
} from "@/fetchApi/v1/getRoutesById";
import {
  busSeats,
  passengersSeatsList,
  citySchema,
  dateAndNameCitySchema,
  servicesSchema,
} from "./zodBase";
import { z } from "zod";
import { IGetRouteCity } from "@/fetchApi/v1/getRoutes";

const routeSchemaMyRoute = z.object({
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  busSeats,
  passengersSeatsList,
});

// Схема для маршруту
const routeSchemaSeatSelection = z.object({
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  selectBusLayout: z.string(),
  bookedSeats: z.number().int(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  driverId: z.number().int(),
  busSeats,
  passengersSeatsList,
});

const routeSchemaUpdate = z.object({
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int().nonnegative(),
  selectBusLayout: z.string(),
  ...servicesSchema,
  modelBus: z.string(),
  busNumber: z.string(),
  driverId: z.number().int(),

  intermediateStops: z.array(
    z.object({
      id: z.number().int().positive(),
      routeId: z.number().int().positive(),
      stopName: z.string().min(1),
    })
  ),
  busSeats,
  passengersSeatsList,
});

const routeSchemaAgain = z.object({
  ...citySchema,
  routePrice: z.number().positive(),
  modelBus: z.string(),
  driverId: z.number().int(),
  busNumber: z.string(),
  intermediateStops: z.array(
    z.object({
      id: z.number().int().positive(),
      routeId: z.number().int().positive(),
      stopName: z.string().min(1),
    })
  ),
});

const routeSchemaCity = z.object({
  ...citySchema,
});

// Схема для масиву маршрутів
export const ZodFetchGetRoutesByIdMyRoute: z.ZodType<IGetRouteMyRoute> = routeSchemaMyRoute;
export const ZodFetchGetRoutesByIdSeatSelection: z.ZodType<IGetRouteSeatSelection> =
  routeSchemaSeatSelection;
export const ZodFetchGetRoutesByIdUpdate: z.ZodType<IGetRouteUpdate> = routeSchemaUpdate;
export const ZodFetchGetRoutesByIdAgain: z.ZodType<IGetRouteAgain> = routeSchemaAgain;
export const ZodFetchGetRoutesByICity: z.ZodType<IGetRouteCity> = routeSchemaCity;
