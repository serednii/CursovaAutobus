import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { z } from "zod";
import { busSeats, passengersSeatsList } from "./zodGlobal";

// Схема для маршруту
const routeSchema = z.object({
  id: z.number().int().positive(),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats,
  passengersSeatsList,
  driverId: z.number().positive(),
});

// Схема для масиву маршрутів
export const zodGetRoutesByPassengerId: z.ZodType<Omit<GetRoutesByPassengerId, "isReservation">[]> = z.array(routeSchema);
