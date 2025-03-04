import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";
import { z } from "zod";
import { busSeats, passengersSeatsList, passengerSchema, fullBaseRouteSchema, citySchema, dateAndNameCitySchema } from "./zodBase";

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
  bookedSeats: z.number().int().positive(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  driverId: z.number().int(),
  busSeats,
  passengersSeatsList,
});

const routeSchemaUpdate = z.object({
  ...fullBaseRouteSchema,

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
  intermediateStops: z.array(
    z.object({
      id: z.number().int().positive(),
      routeId: z.number().int().positive(),
      stopName: z.string().min(1),
    })
  ),
});

// Схема для масиву маршрутів
export const ZodFetchGetRoutesByIdMyRoute = z.array(routeSchemaMyRoute);
export const ZodFetchGetRoutesByIdSeatSelection = z.array(routeSchemaSeatSelection);
export const ZodFetchGetRoutesByIdUpdate: z.ZodType<IGetRouteUpdate[]> = z.array(routeSchemaUpdate);
export const ZodFetchGetRoutesByIdAgain: z.ZodType<IGetRouteAgain[]> = z.array(routeSchemaAgain);
