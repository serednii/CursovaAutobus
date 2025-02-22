import { IUpdateRouteWithId } from "@/types/route-passenger.types";
import { busSeats, passengersSeatsList } from "./zodGlobal";
import { z } from "zod";

export const zodSchemaUpdateRouteIn: z.ZodType<IUpdateRouteWithId> = z.object({
  id: z.number(),
  bookedSeats: z.number().min(1).max(50),
  busSeats,
  passengersSeatsList,
});

export const zodSchemaUpdateRouteRes = z.object({
  message: z.string(),
  res: z.object({
    arrivalDate: z.string(),
    arrivalTo: z.string(),
    bookedSeats: z.number(),
    busNumber: z.string(),
    coffee: z.boolean(),
    createdAt: z.string(),
    departureDate: z.string(),
    departureFrom: z.string(),
    driverId: z.number(),
    id: z.number(),
    maxSeats: z.number(),
    modelBus: z.string(),
    notate: z.string(),
    power: z.boolean(),
    restRoom: z.boolean(),
    routePrice: z.number(),
    selectBusLayout: z.string(),
    wifi: z.boolean(),
  }),
});
