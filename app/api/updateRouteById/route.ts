import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updatedBusSeats } from "./updatedBusSeats";
import { createPassengersSeatsList } from "../createroute/createFunctions";
import { IUpdateRouteAPI } from "@/types/route-passenger.types";
import { firstLetterUpperCase } from "@/lib/utils";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";
import { IPassengersSeatsList } from "@/types/interface";
import { middleware } from "@/middleware";
import { ApiResponse, ErrorResponse } from "@/types/response.types";

// API route handler for updating a route
export async function PATCH(req: Request) {
  try {
    const middlewareResponse = await middleware(req);

    if (middlewareResponse.status !== 200) {
      return middlewareResponse;
    }
    const resData = await req.json();
    // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].passengerId);
    // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].seatId);

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
      notate,
      wifi,
      coffee,
      power,
      restRoom,
    }: IUpdateRouteAPI = resData;

    if (
      !(
        Array.isArray(passengersSeatsList) &&
        passengersSeatsList.length > 0 &&
        Array.isArray(busSeats) &&
        busSeats.length > 0
      )
    ) {
      return NextResponse.json(
        { error: "Поле 'passengersSeatsList' і 'busSeats' є обов'язковим" },
        { status: 500 }
      );
    }

    const idPassenger = passengersSeatsList[0].idPassenger;
    const deletePassengerResult: ApiResponse = await fetchDeleteRoutePassenger({
      routeDriverId: id,
      idPassenger: idPassenger,
      busSeats,
    });

    if (deletePassengerResult && "error" in deletePassengerResult) {
      const errorResponse: ErrorResponse = { error: "Невдалося видалити користувача" };
      return NextResponse.json(errorResponse, { status: 500 });
    }

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
        notate,
        wifi,
        coffee,
        power,
        restRoom,
      },
    });

    if (!res) {
      console.error("Failed to update route base");
      return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
    }

    const updatedBusSeatsResult = await updatedBusSeats(busSeats || [], id);
    // console.log("ipdatedBusSeatsResult", updatedBusSeatsResult);
    if (!updatedBusSeatsResult) {
      console.error("Failed to update route busSeats");
      //delete route passenger if busSeats not updated
      const deletePassengerResult: ApiResponse = await fetchDeleteRoutePassenger({
        routeDriverId: id,
        idPassenger: idPassenger,
        busSeats,
      });

      if (deletePassengerResult && "error" in deletePassengerResult) {
        const errorResponse: ErrorResponse = { error: "Невдалося видалити користувача" };
        return NextResponse.json(errorResponse, { status: 500 });
      }
      return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
    }

    // console.log("passengersSeatsList - - - - - - - - - - - ", passengersSeatsList);
    const createPassengersSeatsListResult = (await createPassengersSeatsList(
      passengersSeatsList,
      id
    )) as IPassengersSeatsList[] | null;
    if (!createPassengersSeatsListResult) {
      console.error("Failed to update route passengersSeatsList");

      //delete route passenger if createPassengersSeatsList not created
      const deletePassengerResult: ApiResponse = await fetchDeleteRoutePassenger({
        routeDriverId: id,
        idPassenger: idPassenger,
        busSeats,
      });

      if (deletePassengerResult && "error" in deletePassengerResult) {
        const errorResponse: ErrorResponse = { error: "Невдалося видалити користувача" };
        return NextResponse.json(errorResponse, { status: 500 });
      }
      return NextResponse.json(
        { error: "Failed to update route passengersSeatsList" },
        { status: 500 }
      );
    }

    // console.log("Route updated successfully:", res);

    return NextResponse.json({
      ...res,
      passengersSeatsList: createPassengersSeatsListResult,
      busSeats: updatedBusSeatsResult,
    });
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}
