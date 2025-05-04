import { selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { NextRequest } from "next/server";

export function parseStringRoutesToObject(
  selectParam: string
): Record<
  string,
  boolean | { select: Record<string, boolean | { select: Record<string, boolean> }> }
> {
  if (selectParam === "") {
    return selectRouteUpdate;
  }
  const selectFields = selectParam ? selectParam.split(",") : [];
  const selectObject: Record<string, boolean> = selectFields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as Record<string, boolean>);

  if ("passengersSeatsList" in selectObject) {
    return {
      ...selectObject,
      passengersSeatsList: {
        select: {
          idPassenger: true,
          subPassengersList: {
            select: {
              subFirstName: true,
              subLastName: true,
              subPhone: true,
              subEmail: true,
            },
          },
        },
      },
    };
  }
  return selectObject;
}

export function parseStringUserToObject(selectParam: string): Record<string, boolean> {
  const selectFields = selectParam ? selectParam.split(",") : [];
  const selectObject: Record<string, boolean> = selectFields.reduce((acc, field) => {
    acc[field.trim()] = true;
    return acc;
  }, {} as Record<string, boolean>);
  return selectObject;
}

export const validateApiKey = (req: NextRequest): void => {
  const apiKey = req.headers.get("apiKey");
  const VALID_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  console.log("apiKey", apiKey, VALID_API_KEY);
  if (!apiKey || apiKey !== VALID_API_KEY) {
    const error = new Error("Failed select") as { status?: number };
    error.status = 401;
    throw error;
  }
};
