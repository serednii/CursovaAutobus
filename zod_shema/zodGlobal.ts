import { SeatStatusEnum } from "@/enum/shared.enums";
import { z } from "zod";

const subPassengerSchema = z.object({
  subFirstName: z.string().min(1),
  subLastName: z.string().min(1),
  subPhone: z.string().min(5),
  subEmail: z.string().email(),
});

export const passengerSchema = z.object({
  idPassenger: z.number().int().positive(),
  subPassengersList: z.array(subPassengerSchema),
});

export const busSeatSchema = z.object({
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

export const routeStopSchema = z.object({
  id: z.number().int().positive(),
  stopName: z.string(),
  routeId: z.number().int().positive(),
});
