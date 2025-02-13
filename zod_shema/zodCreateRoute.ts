import { z } from "zod";
import { busSeatSchema, routeStopSchema } from "./zodGlobal";

const routeDriverSchema = z.object({
  arrivalDate: z.string().datetime(),
  arrivalTo: z.string(),
  bookedSeats: z.number().int().nonnegative(),
  busNumber: z.string(),
  coffee: z.boolean(),
  createdAt: z.string().datetime(),
  departureDate: z.string().datetime(),
  departureFrom: z.string(),
  driverId: z.number().int().positive(),
  id: z.number().int().positive(),
  maxSeats: z.number().int().positive(),
  modelBus: z.string(),
  notate: z.string(),
  power: z.boolean(),
  restRoom: z.boolean(),
  routePrice: z.number().positive(),
  selectBusLayout: z.string(),
  wifi: z.boolean(),
});

export const zodSchemaCreateRoute = z.object({
  routeDriver: routeDriverSchema,
  resultIntermediateStops: z.array(routeStopSchema),
  resultBusSeats: z.array(busSeatSchema),
});
