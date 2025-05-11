import { cn, timeAmPm, travelTime } from "@/lib/utils";
import { IGetRoutePassengerById } from "@/types/route-driver.types";
import React from "react";
import { IoArrowForward } from "react-icons/io5";
export interface BusInfo {
  selected_bus: string;
  departure: string;
  arrival: string;
  seats_available: string;
}
interface Props {
  route: Omit<IGetRoutePassengerById, "isReservation"> | undefined | null;
  language: BusInfo;
  className?: string;
}

export default function SelectedBusInfo({ route, language, className }: Props) {
  if (!route) {
    return null;
  }

  const departureFrom = route.departureFrom;
  const arrivalTo = route.arrivalTo;
  const price = route.routePrice;
  const availableSeats = route.maxSeats - route.bookedSeats;

  return (
    <div className={cn("bg-white rounded-lg shadow-md p-1 md:p-4 ", className)}>
      <h2 className="text-2xl font-bold mb-6 ">{language.selected_bus}</h2>
      <ul className="flex-column md:flex justify-between px-1 md:px-4 rounded-lg">
        <li className="border border-[#A6E7EB] rounded-lg px-1 md:px-2 text-center md:text-left flex md:inline-block justify-around ">
          <p>{language.departure}</p>
          <p>{timeAmPm(route.departureDate)}</p>
          <p>{departureFrom}</p>
        </li>
        <li className="border border-[#A6E7EB] rounded-lg md:px-2 ">
          <IoArrowForward className="w-full" style={{ color: "gray", fontSize: "20px" }} />
          <p>{travelTime(route.departureDate, route.arrivalDate)}</p>
        </li>
        <li className="border border-[#A6E7EB] rounded-lg md:px-2 text-center md:text-left flex md:inline-block justify-around ">
          <p>{language.arrival}</p>
          <p>{timeAmPm(route.arrivalDate)}</p>
          <p>{arrivalTo}</p>
        </li>
        <li className=" border border-[#A6E7EB] rounded-lg md:px-2 text-center md:text-left flex md:inline-block justify-around ">
          <p className=" text-xl text-blue-600 font-bold">${price}</p>
          <p>
            {availableSeats} {language.seats_available}
          </p>
        </li>
      </ul>
    </div>
  );
}
