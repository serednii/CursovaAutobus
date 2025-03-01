import { IUpdateRouteWithId } from "@/types/route-passenger.types";
import { allParametersRoute, busSeats, passengersSeatsList } from "./zodGlobal";
import { z } from "zod";

export const zodSchemaUpdateRouteIn: z.ZodType<IUpdateRouteWithId> = z.object({
  id: z.number(),
  bookedSeats: z.number().min(1).max(50),
  busSeats,
  passengersSeatsList,
});

export const zodSchemaUpdateRouteRes = z.object({
  message: z.string(),
  res: z.object(allParametersRoute),
});
