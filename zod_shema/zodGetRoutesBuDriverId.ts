import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import { z } from "zod";
import { dateAndNameCitySchema } from "./zodBase";

export const zodSchemaGetRoutesBuDriverId: z.ZodType<IRoutesByIdDriver> = z.object({
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  bookedSeats: z.number().int().nonnegative(),
  maxSeats: z.number().int().positive(),
});
