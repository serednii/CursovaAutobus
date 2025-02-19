import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updatedBusSeats } from "./updateFunction";
import { createPassengersSeatsList } from "../createroute/createFunctions";
import { IUpdateRouteAPI } from "@/types/route-passenger.types";
import { firstLetterUpperCase } from "@/lib/utils";

// API route handler for updating a route
export async function PATCH(req: Request) {
  const resData = await req.json();
  console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData);
  console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList);

  try {
    const {
      id,
      busSeats,
      bookedSeats,
      passengersSeatsList,
      departureDate,
      arrivalDate,
      departureFrom,
      arrivalTo,
      routePrice,
      modelBus,
    }: IUpdateRouteAPI = resData;

    // Perform database update using Prisma
    const res = await prisma.routeDriver.update({
      where: {
        id, // Assuming `id` is the primary key field in the `routeDriver` table
      },
      data: {
        bookedSeats,
        departureDate,
        arrivalDate,
        departureFrom: firstLetterUpperCase(departureFrom),
        arrivalTo: firstLetterUpperCase(arrivalTo),
        routePrice,
        modelBus,
      },
    });

    if (!res) {
      console.error("Failed to update route base");
      return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
    }

    if (!busSeats) {
      const res2 = await updatedBusSeats(busSeats || [], id);
      if (!res2) {
        console.error("Failed to update route busSeats");
        return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
      }
    }

    if (passengersSeatsList) {
      const res3 = await createPassengersSeatsList(passengersSeatsList || [], id);
      if (!res3) {
        console.error("Failed to update route passengersSeatsList");

        return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
      }
    }

    console.log("Route updated successfully:", res);

    return NextResponse.json({
      message: "Route updated successfully",
      res,
    });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}
