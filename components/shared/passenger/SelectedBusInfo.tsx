import { timeAmPm, travelTime } from "@/lib/utils";
import { IGetRoutePassengerById } from "@/types/route-driver.types";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

interface Props {
  route: Omit<IGetRoutePassengerById, "isReservation"> | undefined | null;
}

export default function SelectedBusInfo({ route }: Props) {
  if (!route) {
    return null;
  }
  const departureFrom = route.departureFrom;
  const arrivalTo = route.arrivalTo;
  const price = route.routePrice;
  const availableSeats = route.maxSeats - route.bookedSeats;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-bold mb-6 ">Selected Bus</h2>
      <ul className="flex justify-between p-4 border border-[#E5E7EB] rounded-lg">
        <li>
          <p>Departure</p>
          <p>{timeAmPm(route.departureDate)}</p>
          <p>{departureFrom}</p>
        </li>
        <li>
          <IoArrowForward className="w-full" style={{ color: "gray", fontSize: "20px" }} />
          <p>{travelTime(route.departureDate, route.arrivalDate)}</p>
        </li>
        <li>
          <p>Arrival</p>
          <p>{timeAmPm(route.arrivalDate)}</p>
          <p>{arrivalTo}</p>
        </li>
        <li>
          <p className="text-right text-xl text-blue-600 font-bold">${price}</p>
          <p>{availableSeats} seats available</p>
        </li>
      </ul>
    </div>
  );
}
