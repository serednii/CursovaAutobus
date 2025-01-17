import { NextResponse } from "next/server";
import { ICreateRoute } from "./interface";

export default function validateFields(data: ICreateRoute) {
  const errors: Record<string, string> = {};
  const {
    driverId,
    departureDate,
    arrivalDate,
    departureFrom,
    arrivalTo,
    selectBusLayout,
    busNumber,
    routePrice,
    modelBus,
    wifi,
    coffee,
    power,
    notate,
    restRoom,
    maxSeats,
    busSeats,
    bookedSeats,
    intermediateStops,
    passengersSeatsList,
  } = data;

  if (
    !Array.isArray(busSeats) ||
    busSeats.some(
      (seat) =>
        typeof seat.number !== "number" ||
        typeof seat.busSeatStatus !== "string"
    )
  ) {
    errors.busSeats = `${busSeats}  Invalid data: busSeats must be an array of valid seat objects`;
  }

  // type passengersSeatsList = [{
  //   idPassenger: number;
  //   subPassengersList: [{
  //       subFirstName: string;
  //       subLastName: string;
  //       subPhone: string;
  //       subEmail: string;
  //   }];
  // }]
  if (
    !Array.isArray(intermediateStops) ||
    intermediateStops.some((stop) => typeof stop !== "string")
  ) {
    errors.intermediateStops = `${intermediateStops} Invalid data: intermediateStops must be an array of strings`;
  }

  // if (!Array.isArray(passengersSeatsList) || passengersSeatsList.some((stop) => typeof stop !== "object")) {
  //   errors.passengersSeatsList = `${passengersSeatsList} Invalid data: passengersSeatsList must be an array of objects`;

  // }

  const fields = {
    driverId: [driverId, "number"],
    departureDate: [departureDate, "string"],
    arrivalDate: [arrivalDate, "string"],
    departureFrom: [departureFrom, "string"],
    arrivalTo: [arrivalTo, "string"],
    selectBusLayout: [selectBusLayout, "string"],
    busNumber: [busNumber, "string"],
    routePrice: [routePrice, "number"],
    modelBus: [modelBus, "string"],
    wifi: [wifi, "boolean"],
    coffee: [coffee, "boolean"],
    power: [power, "boolean"],
    notate: [notate, "string"],
    restRoom: [restRoom, "boolean"],
    maxSeats: [maxSeats, "number"],
    bookedSeats: [bookedSeats, "number"],
    passengersSeatsList: [passengersSeatsList, "array"],
  };

  for (const [key, [value, expectedType]] of Object.entries(fields)) {
    if (expectedType === "array") {
      if (!Array.isArray(value)) {
        errors[key] = `${key} must be an array`;
      }
    } else if (typeof value !== expectedType) {
      errors[key] = `${key} must be of type ${expectedType}`;
    }
  }

  return errors;
}
