import { z } from "zod";
import { IGetSearchRouteMany, IGetSearchRouteOne } from "@/fetchApi/v1/getRoutes";
import { busSeats, dateAndNameCitySchema, passengersSeatsList } from "./zodBase";

export const ZodSchemaSearchRouteMany: z.ZodType<IGetSearchRouteMany> = z.object({
  id: z.number(),
  ...dateAndNameCitySchema,
  routePrice: z.number(),
  busNumber: z.string(),
  modelBus: z.string(),
  maxSeats: z.number(),
  bookedSeats: z.number(),
  driverId: z.number(),
  departureFromCity: z.string().optional(),
  arrivalToCity: z.string().optional(),
  busSeats,
  passengersSeatsList,
});

export const ZodSchemaSearchRouteOne: z.ZodType<IGetSearchRouteOne> = z.object({
  departureDate: z.string(),
  driverId: z.number(),
});

export const fullBaseRouteSchema = {
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int().nonnegative(),
  selectBusLayout: z.string(),
  modelBus: z.string(),
  busNumber: z.string(),
};
