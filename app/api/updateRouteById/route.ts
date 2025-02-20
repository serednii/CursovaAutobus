import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updatedBusSeats } from "./updatedBusSeats";
import { createPassengersSeatsList } from "../createroute/createFunctions";
import { IUpdateRouteAPI } from "@/types/route-passenger.types";
import { firstLetterUpperCase } from "@/lib/utils";
import { getBusSeats } from "@/app/(passenger)/mybookings/action";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";
import { IBusSeats } from "@/types/interface";

const deletePassenger = async (busSeats: IBusSeats[], id: number, idPassenger: number) => {
  const busSeatsDeletePassenger = getBusSeats(busSeats, idPassenger);
  await fetchDeleteRoutePassenger({
    routeDriverId: id,
    idPassenger: idPassenger,
    busSeats: busSeatsDeletePassenger,
  });
};

// API route handler for updating a route
export async function PATCH(req: Request) {
  const resData = await req.json();
  // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData);
  // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList);
  console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].passengerId);
  console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].seatId);

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

    if (!(Array.isArray(passengersSeatsList) && passengersSeatsList.length > 0 && Array.isArray(busSeats) && busSeats.length > 0)) {
      return NextResponse.json({ error: "Поле 'passengersSeatsList' і 'busSeats' є обов'язковим" }, { status: 500 });
    }

    const idPassenger = passengersSeatsList[0].idPassenger;

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

    const updatedBusSeatsResult: boolean = await updatedBusSeats(busSeats || [], id);
    console.log("ipdatedBusSeatsResult", updatedBusSeatsResult);
    if (!updatedBusSeatsResult) {
      console.error("Failed to update route busSeats");
      //delete route passenger if busSeats not updated
      deletePassenger(busSeats, id, idPassenger);
      return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
    }

    console.log("passengersSeatsList - - - - - - - - - - - ", passengersSeatsList);
    const createPassengersSeatsListResult = await createPassengersSeatsList(passengersSeatsList, id);
    if (!createPassengersSeatsListResult) {
      console.error("Failed to update route passengersSeatsList");

      //delete route passenger if createPassengersSeatsList not created
      deletePassenger(busSeats, id, idPassenger);
      return NextResponse.json({ error: "Failed to update route passengersSeatsList" }, { status: 500 });
    }

    // console.log("Route updated successfully:", res);

    return NextResponse.json({
      message: "Route updated successfully",
      res,
    });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}
