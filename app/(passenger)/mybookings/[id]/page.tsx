import { fetchGetRouteById } from "@/fetchFunctions/fetchroutes";
import { IGetRouteById } from "@/types/route-driver.types";
import React from "react";

interface Props {
  params: { id: string };
}

interface IGetRoutePassengerById extends IGetRouteById {}

export default async function MyBookings({ params }: Props) {
  const id = await params.id;
  const select = {
    departureDate: true, // Залишаємо це поле
    arrivalDate: true, // Залишаємо це поле
    departureFrom: true, // Залишаємо це поле
    arrivalTo: true, // Залишаємо це поле
    routePrice: true, // Залишаємо це поле
    busSeats: true,
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
  const routeRaw: IGetRoutePassengerById[] | null =
    (await fetchGetRouteById(Number(id), select)) ||
    ({} as IGetRoutePassengerById[]);
  console.log("routeRaw", id, routeRaw);

  return <div>MyBookings{id}</div>;
}
