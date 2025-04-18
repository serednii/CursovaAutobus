import { selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { NextRequest, NextResponse } from "next/server";

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
    acc[field] = true;
    return acc;
  }, {} as Record<string, boolean>);
  return selectObject;
}

export const checkApiKey = (req: NextRequest): boolean => {
  const apiKey = req.headers.get("apiKey");
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return false;
  } else {
    return true;
  }
};
