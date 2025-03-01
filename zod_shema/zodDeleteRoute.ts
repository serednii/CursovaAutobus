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

// Схема для масиву маршрутів
export const ZodFetchGetRoutesByIdMyRoute = z.array(routeSchemaMyRoute);
export const ZodFetchGetRoutesByIdSeatSelection = z.array(routeSchemaSeatSelection);
