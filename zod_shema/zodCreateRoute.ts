import { z } from "zod";
import { busSeatSchema, fullBaseRouteSchema, routeStopSchema } from "./zodBase";

const routeDriverSchema = z.object({
  ...fullBaseRouteSchema,
  createdAt: z.string().datetime(),
  driverId: z.number().int().positive(),
});

export const zodSchemaCreateRoute = z.object({
  routeDriver: routeDriverSchema,
  resultIntermediateStops: z.array(routeStopSchema),
  resultBusSeats: z.array(busSeatSchema),
});
