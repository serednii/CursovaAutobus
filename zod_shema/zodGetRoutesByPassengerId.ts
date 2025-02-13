import { z } from "zod";
import { busSeatSchema, passengerSchema } from "./zodGlobal";

// Схема для маршруту
const routeSchema = z.object({
  id: z.number().int().positive(),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
});

// Схема для масиву маршрутів
export const zodGetRoutesByPassengerId = z.array(routeSchema);
