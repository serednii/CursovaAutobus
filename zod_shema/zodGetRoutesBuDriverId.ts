import {
  IRoutesByIdDriver,
  IRoutesByIdDriverListBlocked,
} from "@/fetchFunctions/v1/gеtRoutesByDriverId";
import { z } from "zod";
import { dateAndNameCitySchema, dateSchemaString } from "./zodBase";

export const zodSchemaGetRoutesBuDriverId: z.ZodType<IRoutesByIdDriver> = z.object({
  id: z.number().int().positive(),
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  bookedSeats: z.number().int().nonnegative(),
  maxSeats: z.number().int().positive(),
});

export const zodSchemaGetRoutesBuDriverIdListBlocked: z.ZodType<IRoutesByIdDriverListBlocked> =
  z.object({
    id: z.number().int().positive(),
    ...dateSchemaString,
  });
