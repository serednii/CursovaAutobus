import { z } from "zod";

import {
  IGetSearchRouteMany,
  IGetSearchRouteOne,
} from "@/fetchFunctions/searchRoute";

export const ZodSchemaSearchRouteMany: z.ZodType<IGetSearchRouteMany> =
  z.object({
    id: z.number(),
    driverId: z.number(),
    departureDate: z.string(),
    arrivalDate: z.string(),
    departureFrom: z.string(),
    arrivalTo: z.string(),
    busNumber: z.string(),
    routePrice: z.number(),
    notate: z.string(),
    wifi: z.boolean(),
    coffee: z.boolean(),
    power: z.boolean(),
    restRoom: z.boolean(),
    modelBus: z.string(),
    maxSeats: z.number(),
    bookedSeats: z.number(),
  });

export const ZodSchemaSearchRouteOne: z.ZodType<IGetSearchRouteOne> = z.object({
  departureDate: z.string(),
});
