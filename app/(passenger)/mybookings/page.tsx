import { sortDate } from "@/app/(driver)/myroutes/action";
import { Container } from "@/components/shared/container";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import { authConfig } from "@/configs/auth";
import { fetchGetRoutesByPassengerId } from "@/fetchFunctions/fetchroutes";
import { IBusSeats } from "@/types/interface";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { getServerSession } from "next-auth";
import React from "react";

interface MyBookingsTable
  extends Omit<GetRoutesByPassengerId, "busSeats" | "routePrice"> {
  seatsNumber: string;
  routeTotalPrice: number;
}

interface IRoutesTable {
  id: number;
  departureDate: string;
  arrivalDate: string;
  departureFrom: string;
  arrivalTo: string;
  seatsNumber: string;
  routeTotalPrice: string;
  routePrice: string;
}
[];

export default async function MyBookings() {
  const session = await getServerSession(authConfig);

  const passengerId: number | undefined = Number(session?.user.id);

  console.log("driverid myroutes:", passengerId);

  if (!passengerId) return null;

  const select = {
    id: true,
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

  const routesPassenger: GetRoutesByPassengerId[] =
    (await fetchGetRoutesByPassengerId<typeof select, GetRoutesByPassengerId[]>(
      passengerId,
      select
    )) || [];

  const routesTable: IRoutesTable[] = routesPassenger.map(
    (route): IRoutesTable => {
      console.log("route", route.busSeats);

      const getTotalPriceSeatsNumber = route.busSeats?.reduce(
        (
          acc: { totalPrice: number; seatsNumber: number[] },
          seat: IBusSeats
        ) => {
          if (seat?.passenger === passengerId) {
            console.log("route.routePrice ************", route.routePrice);
            const newAcc = {
              totalPrice: acc.totalPrice + route.routePrice,
              seatsNumber: [...acc.seatsNumber, seat.number],
            };
            return newAcc;
          }
          return acc;
        },
        { totalPrice: 0, seatsNumber: [] }
      );

      return {
        id: route.id,
        departureDate: route.departureDate,
        arrivalDate: route.arrivalDate,
        departureFrom: route.departureFrom,
        arrivalTo: route.arrivalTo,
        seatsNumber: getTotalPriceSeatsNumber.seatsNumber
          .sort((a, b) => a - b)
          .join(", "),
        routeTotalPrice: "$" + getTotalPriceSeatsNumber.totalPrice,
        routePrice: "$" + route.routePrice,
      };
    }
  );

  const { pastRoutes, availableRoutes } = sortDate(routesTable);
  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">Booked Routes</h1>
        <AvailableRoutes className="mb-10" routes={availableRoutes} />
        <PastRoutes routes={pastRoutes} />
      </Container>
    </div>
  );
}
