"use client";

import { sortDate } from "@/app/(driver)/myroutes/action";
import { Container } from "@/components/shared/container";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import { SeatStatusEnum } from "@/enum/shared.enums";
import {
  fetchDeleteRoutePassenger,
  fetchGetRoutesByPassengerId,
} from "@/fetchFunctions/fetchroutes";
import { IBusSeats } from "@/types/interface";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export interface IRoutesTable {
  id: number;
  departureDate: string;
  arrivalDate: string;
  departureFrom: string;
  arrivalTo: string;
  seatsNumber: string;
  routeTotalPrice: string;
  routePrice: string;
  busSeats: IBusSeats[];
}

export default function MyBookings() {
  const { data: session } = useSession();
  const passengerId: number | undefined = Number(session?.user?.id);
  const [reload, setReload] = useState(false);
  const [routesPassenger, setRoutesPassenger] = useState<
    GetRoutesByPassengerId[]
  >([]);
  console.log("routesPassenger", routesPassenger);
  useEffect(() => {
    if (!passengerId) return;

    const fetchRoutes = async () => {
      try {
        const select = {
          id: true,
          departureDate: true,
          arrivalDate: true,
          departureFrom: true,
          arrivalTo: true,
          routePrice: true,
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

        const routes = await fetchGetRoutesByPassengerId<
          typeof select,
          GetRoutesByPassengerId[]
        >(passengerId, select);
        setRoutesPassenger(routes || []);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [passengerId, reload]);

  if (!passengerId) return <p>Loading...</p>;

  const routesTable: IRoutesTable[] = routesPassenger.map(
    (route): IRoutesTable => {
      const getTotalPriceSeatsNumber = route.busSeats?.reduce(
        (
          acc: { totalPrice: number; seatsNumber: number[] },
          seat: IBusSeats
        ) => {
          if (seat?.passenger === passengerId) {
            return {
              totalPrice: acc.totalPrice + route.routePrice,
              seatsNumber: [...acc.seatsNumber, seat.number],
            };
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
        busSeats: route.busSeats,
      };
    }
  );

  const { pastRoutes, availableRoutes } = sortDate(routesTable);

  const removeRoutePassenger = async (routeId: number) => {
    const busSeatsRaw =
      routesPassenger.find((e) => e.id === routeId)?.busSeats || [];
    const busSeats = busSeatsRaw.map((e) => {
      return {
        ...e,
        busSeatStatus:
          e.passenger === passengerId
            ? SeatStatusEnum.AVAILABLE
            : e.busSeatStatus,
        passenger: e.passenger === passengerId ? null : e.passenger,
      };
    });

    const result = await fetchDeleteRoutePassenger({
      routeDriverId: routeId,
      idPassenger: passengerId,
      busSeats: busSeats,
    });
    console.log("result", result);
    if (!result) {
      //Error delete route passenger
    } else {
      //Success delete route passenger
      //Зроьити рестарт сторінки
      // window.location.reload();
      setReload(!reload);
    }

    console.log("Removing route ID:", routeId, passengerId);
  };

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">Booked Routes</h1>
        <AvailableRoutes
          className="mb-10"
          routes={availableRoutes}
          removeRoutePassenger={removeRoutePassenger}
        />
        <PastRoutes routes={pastRoutes} />
      </Container>
    </div>
  );
}
