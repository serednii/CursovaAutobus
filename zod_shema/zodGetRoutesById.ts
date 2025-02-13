import { z } from "zod";

// Перевірка на число або null
const nullableNumberSchema = z.number().int().positive().nullable();

// Енум для статусу місця
const seatStatusSchema = z.enum(["available", "reserved"]);

// Схема для субпасажира
const subPassengerSchema = z.object({
  subFirstName: z.string().min(1),
  subLastName: z.string().min(1),
  subPhone: z.string().min(5),
  subEmail: z.string().email(),
});

// Схема для основного пасажира
const passengerSchema = z.object({
  idPassenger: z.number().int().positive(),
  subPassengersList: z.array(subPassengerSchema),
});

// Схема для місця в автобусі
const busSeatSchema = z.object({
  passenger: nullableNumberSchema,
  number: z.number().int().positive(),
  busSeatStatus: seatStatusSchema,
});

// Схема для маршруту
const routeSchemaMyRoute = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
});

// Схема для маршруту
const routeSchemaSeatSelection = z.object({
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
  id: z.number().int().positive(),
  selectBusLayout: z.string(),
  modelBus: z.string(),
  maxSeats: z.number().int().positive(),
  bookedSeats: z.number().int().positive(),
});

// Схема для масиву маршрутів
export const ZodFetchGetRoutesByIdMyRoute = z.array(routeSchemaMyRoute);
export const ZodFetchGetRoutesByIdSeatSelection = z.array(
  routeSchemaSeatSelection
);
