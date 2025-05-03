import { z } from "zod";
import {
  busSeatSchema,
  busSeatSchema_1,
  dateAndNameCitySchema,
  fullBaseRouteSchema,
  routeStopSchema,
  servicesSchema,
} from "./zodBase";

export const zodRouteDriverSchema = z.object({
  ...fullBaseRouteSchema,
  createdAt: z.string().datetime(),
  driverId: z.number().int().positive(),
  intermediateStops: z.array(routeStopSchema),
  busSeats: z.array(busSeatSchema),
});

export const zodRouteDriverInputSchema = z.object({
  driverId: z.number().int().positive(),
  intermediateStops: z.array(z.string()),
  busSeats: z.array(busSeatSchema_1),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  busNumber: z.string(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int().nonnegative(),
  selectBusLayout: z.string(),
  notate: z.string(),
  ...servicesSchema,
  modelBus: z.string(),
});
