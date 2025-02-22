import { z } from "zod";
import { busSeatSchema, passengerSchema } from "./zodGlobal";

const routeSchemaMyRoute = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
});

// Схема для маршруту
const routeSchemaSeatSelection = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
  id: z.number().int().positive(),
  selectBusLayout: z.string(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int(),
  // availableSeats: z.number().int(),
});

// Схема для масиву маршрутів
export const ZodFetchGetRoutesByIdMyRoute = z.array(routeSchemaMyRoute);
export const ZodFetchGetRoutesByIdSeatSelection = z.array(routeSchemaSeatSelection);
