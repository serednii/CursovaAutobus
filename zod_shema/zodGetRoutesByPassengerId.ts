import { SeatStatusEnum } from "@/enum/shared.enums";
import { z } from "zod";
// Схема для місця в автобусі
const busSeatSchema = z.object({
  id: z.number().int().positive(),
  passenger: z.number().int().nullable(),
  number: z.number().int().positive(),
  busSeatStatus: z.enum([
    SeatStatusEnum.AVAILABLE,
    SeatStatusEnum.RESERVED,
    SeatStatusEnum.SELECTED,
  ]),
  routeDriverId: z.number().int().positive(),
});

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

// Схема для маршруту
const routeSchema = z.object({
  id: z.number().int().positive(),
  departureDate: z.string().datetime(),
  arrivalDate: z.string().datetime(),
  departureFrom: z.string().min(1),
  arrivalTo: z.string().min(1),
  routePrice: z.number().positive(),
  busSeats: z.array(busSeatSchema),
  passengersSeatsList: z.array(passengerSchema),
});

// Схема для масиву маршрутів
export const zodGetRoutesByPassengerId = z.array(routeSchema);
