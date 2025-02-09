import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderseatsBus";
import {
  IGetRouteById,
  IGetRoutePassengerById,
} from "@/types/route-driver.types";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/shared/Container";
import fetchGetRoutesById from "@/fetchFunctions/fetchGetRoutesById";

interface Props {
  params: { id: string };
}

export default async function MyBookings({ params }: Props) {
  const id: string | undefined = params?.id; // Чекаємо `params` асинхронно

  console.log("id", id);

  const select = {
    id: true,
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

  const routeArray = await fetchGetRoutesById<
    typeof select,
    IGetRoutePassengerById[]
  >([Number(id)], select);

  const route = routeArray && routeArray[0];

  console.log("routeRaw", id, route);

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={route} />
      <OrderSeatsBus layoutsData={layoutsData} route={route} />
      MyBookings{id}
    </Container>
  );
}
