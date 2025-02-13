import { z } from "zod";

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

const routeStopSchema = z.object({
  id: z.number().int().positive(),
  stopName: z.string(),
  routeId: z.number().int().positive(),
});

const busSeatSchema = z.object({
  id: z.number().int().positive(),
  passenger: z.number().int().positive().nullable(),
  number: z.number().int().positive(),
  busSeatStatus: z.enum(["available", "reserved", "occupied"]),
  routeDriverId: z.number().int().positive(),
});

export const zodSchemaCreateRoute = z.object({
  routeDriver: routeDriverSchema,
  resultIntermediateStops: z.array(routeStopSchema),
  resultBusSeats: z.array(busSeatSchema),
});
