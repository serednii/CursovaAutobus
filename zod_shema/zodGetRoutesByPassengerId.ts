import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { z } from "zod";
import { busSeats, dateAndNameCitySchema, passengersSeatsList } from "./zodBase";

// Схема для маршруту
const routeSchema = z.object({
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  busSeats,
  passengersSeatsList,
  driverId: z.number().positive(),
});

// Схема для масиву маршрутів
export const zodGetRoutesByPassengerId: z.ZodType<Omit<GetRoutesByPassengerId, "isReservation">[]> = z.array(routeSchema);
