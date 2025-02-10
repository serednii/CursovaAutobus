import { ISubPassengersList } from "@/types/interface";
import { BusSeatInfo } from "@/types/layoutbus.types";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import handleError from "@/lib/handleError";
import { updatedBusSeats } from "./updateFunction";
import { createPassengersSeatsList } from "../createroute/createFunctions";

export interface IUpdateRoute {
  busSeats: BusSeatInfo[];
  bookedSeats: number;
  passengersSeatsList: ISubPassengersList[];
}

export interface IUpdateRouteWithId extends IUpdateRoute {
  idRoute: number;
}

// API route handler for updating a route
export async function POST(req: Request) {
  //   console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", await req.json());
  try {
    const {
      idRoute,
      busSeats,
      bookedSeats,
      passengersSeatsList,
    }: IUpdateRouteWithId = await req.json();

    // Perform database update using Prisma
    const res = await prisma.routeDriver.update({
      where: {
        id: idRoute, // Assuming `id` is the primary key field in the `routeDriver` table
      },
      data: {
        bookedSeats,
      },
    });

    if (!res) {
      return NextResponse.json(
        { error: "Failed to update route" },
        { status: 500 }
      );
    }

    const res2 = await updatedBusSeats(busSeats, idRoute);
    if (!res2) {
      return NextResponse.json(
        { error: "Failed to update route" },
        { status: 500 }
      );
    }

    const res3 = await createPassengersSeatsList(passengersSeatsList, idRoute);
    if (!res3) {
      return NextResponse.json(
        { error: "Failed to update route" },
        { status: 500 }
      );
    }
    console.log("Route updated successfully:", res);

    return NextResponse.json({
      message: "Route updated successfully",
      res,
    });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json(
      { error: "Failed to update route" },
      { status: 500 }
    );
  }
}
