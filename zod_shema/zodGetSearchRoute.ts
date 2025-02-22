import { z } from "zod";
import { IGetSearchRouteMany, IGetSearchRouteOne } from "@/fetchFunctions/searchRoute";
import { busSeats, passengersSeatsList } from "./zodGlobal";

export const ZodSchemaSearchRouteMany: z.ZodType<IGetSearchRouteMany> = z.object({
  id: z.number(),
  driverId: z.number(),
  departureDate: z.string(),
  arrivalDate: z.string(),
  departureFrom: z.string(),
  arrivalTo: z.string(),
  busNumber: z.string(),
  routePrice: z.number(),
  modelBus: z.string(),
  maxSeats: z.number(),
  bookedSeats: z.number(),
  busSeats,
  passengersSeatsList,
});

export const ZodSchemaSearchRouteOne: z.ZodType<IGetSearchRouteOne> = z.object({
  departureDate: z.string(),
});

// id
// driverId
// departureDate
// arrivalDate
// departureFrom
// arrivalTo
// busNumber
// routePrice
// modelBus
// maxSeats
// bookedSeats

// busSeats
// passengersSeatsList
