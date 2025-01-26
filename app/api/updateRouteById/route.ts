import { ISubPassengersList } from "@/types/interface";
import { params } from "@/types/layoutbus.types";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import handleError from "@/lib/handleError";
import { updatedBusSeats } from "./updateFunction";
import { createPassengersSeatsList } from "../createroute/createFunctions";

export interface IUpdateRoute {
  busSeats: params[];
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
    const updatedRoute = await prisma.routeDriver.update({
      where: {
        id: idRoute, // Assuming `id` is the primary key field in the `routeDriver` table
      },
      data: {
        bookedSeats,
      },
    });

    updatedBusSeats(busSeats, idRoute);
    createPassengersSeatsList(passengersSeatsList, idRoute);

    // console.log("Route updated successfully:", updatedRoute);

    return NextResponse.json({
      message: "Route updated successfully",
      updatedRoute,
    });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json(
      { error: "Failed to update route" },
      { status: 500 }
    );
  }
}
