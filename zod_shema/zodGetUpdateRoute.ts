import { IUpdateRoute } from "@/types/route-passenger.types";
import { allParametersRoute, busSeats, passengersSeatsList } from "./zodBase";
import { z } from "zod";
import { TRouteUpdateResult } from "@/fetchFunctions/fetchUpdateRouteById";

export const zodSchemaUpdateRouteIn: z.ZodType<IUpdateRoute> = z.object({
  id: z.number(),
  bookedSeats: z.number().min(1).max(50),
  busSeats,
  passengersSeatsList,
});

export const zodSchemaUpdateRouteResData: z.ZodType<TRouteUpdateResult> = z.object({
  ...allParametersRoute,
  busSeats,
  // passengersSeatsList,
});
