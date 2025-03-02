import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchFunctions/fetchGetRoutesById";
import { z } from "zod";
import { busSeats, passengersSeatsList, passengerSchema } from "./zodGlobal";

const routeSchemaMyRoute = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats,
  passengersSeatsList,
});

// Схема для маршруту
const routeSchemaSeatSelection = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  id: z.number().int().positive(),
  selectBusLayout: z.string(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int(),
  driverId: z.number().int(),
  busSeats,
  passengersSeatsList,
});

const routeSchemaUpdate = z.object({
  id: z.number().int().positive(),
  routePrice: z.number().positive(),
  driverId: z.number().int(),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  selectBusLayout: z.string(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int(),
  wifi: z.boolean(),
  coffee: z.boolean(),
  power: z.boolean(),
  restRoom: z.boolean(),
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
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
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
