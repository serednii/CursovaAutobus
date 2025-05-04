import updateRoutePassenger from "@/fetchApi/v1/updateRoutePassenger";
import { firstLetterUpperCase, validateAllowedFields } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { IPassengersSeatsList } from "@/types/interface";
import { ApiResponse, ErrorResponse } from "@/types/response.types";
import { IUpdateRouteAPI } from "@/types/route-passenger.types";
// import { zodRouteDriverInputSchema } from "@/zod_shema/zodCreateRoute";
import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_FIELDS_DRIVER } from "../const";
import { createPassengersSeatsList, updateIntermediateStops } from "./createFunctions";
import { updatedBusSeats } from "./updatedBusSeats";

export async function updateRoute(req: NextRequest, id: number) {
  try {
    // const { searchParams } = new URL(req.url);
    // const id = searchParams.get("id");
    // const numberId = parseInt(id || "0", 10);

    const data = await req.json();
    // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].passengerId);
    // console.log("req>>>>>>>><<<<<<<<<<<<<<<<<<<", resData.passengersSeatsList[0].seatId);

    const {
      busSeats,
      bookedSeats,
      passengersSeatsList,
      departureDate,
      arrivalDate,
      departureFrom,
      arrivalTo,
      routePrice,
      intermediateStops,
      busNumber,
      modelBus,
      notate,
      wifi,
      coffee,
      power,
      restRoom,
    }: IUpdateRouteAPI = data;
    console.log("LLLL", data);

    // try {
    //   zodRouteDriverInputSchema.parse(data);
    // } catch (error) {
    //   return NextResponse.json(
    //     { error: error instanceof Error ? error.message : "Невідома помилка" },
    //     { status: 422 }
    //   );
    // }
    const selectParams = Object.keys(data).join(",");

    validateAllowedFields(selectParams, ALLOWED_FIELDS_DRIVER);
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
        { status: 422 }
      );
    }

    //**************************************************************** */
    const idPassenger = passengersSeatsList[0].idPassenger;
    const deletePassengerResult: ApiResponse = await updateRoutePassenger({
      routeDriverId: id,
      idPassenger: idPassenger,
      busSeats,
    });

    if (deletePassengerResult && "error" in deletePassengerResult) {
      const errorResponse: ErrorResponse = { error: "Невдалося видалити користувача" };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // // Створення проміжних зупинок
    if (intermediateStops && intermediateStops.length > 0) {
      await updateIntermediateStops(intermediateStops, id);
    }

    //**************************************************************** */
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
        busNumber,
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
      const deletePassengerResult: ApiResponse = await updateRoutePassenger({
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

    const createPassengersSeatsListResult = (await createPassengersSeatsList(
      passengersSeatsList,
      id
    )) as IPassengersSeatsList[] | null;
    if (!createPassengersSeatsListResult) {
      const deletePassengerResult: ApiResponse = await updateRoutePassenger({
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

    return NextResponse.json(
      {
        data: {
          ...res,
          passengersSeatsList: createPassengersSeatsListResult,
          busSeats: updatedBusSeatsResult,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating route:", error);
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 });
  }
}
