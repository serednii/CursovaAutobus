import { z } from "zod";
import { busSeats, passengersSeatsList, passengerSchema, dateAndNameCitySchema } from "./zodBase";

const routeSchemaMyRoute = z.object({
  ...dateAndNameCitySchema,
  routePrice: z.number().positive(),
  busSeats,
  passengersSeatsList,
});

export const ZodFetchGetRoutesByIdMyRoute = z.array(routeSchemaMyRoute);
