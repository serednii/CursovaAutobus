import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderseatsBus";
import { fetchGetRouteById } from "@/fetchFunctions/fetchroutes";
import {
  IGetRouteById,
  IGetRoutePassengerById,
} from "@/types/route-driver.types";
import { layoutsData } from "@/components/shared/layoutBus/layoutData";
import SelectedBus from "@/components/shared/passenger/selectedBus";
import { Container } from "@/components/shared/container";

interface Props {
  params: { id: string };
}

export default async function MyBookings({ params }: Props) {
  const id = await params?.id; // Чекаємо `params` асинхронно
  console.log("id", id);

  const select = {
    departureDate: true,
    arrivalDate: true,
    departureFrom: true,
    arrivalTo: true,
    routePrice: true,
    busSeats: true,
    selectBusLayout: true,
    modelBus: true,
    maxSeats: true,
    bookedSeats: true,
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

  const routeArray = await fetchGetRouteById<
    typeof select,
    IGetRoutePassengerById[]
  >(Number(id), select);

  const route = routeArray && routeArray[0];

  console.log("routeRaw", id, route);

  return (
    <Container className="pt-4 ">
      <SelectedBus route={route} />
      <OrderSeatsBus layoutsData={layoutsData} route={route} />
      MyBookings{id}
    </Container>
  );
}
