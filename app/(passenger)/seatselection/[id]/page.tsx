import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderseatsBus";

import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/shared/Container";
import { fetchGetRoutesByIdSeatSelection, IGetRouteSeatSelection, IGetSearchRouteSeatSelectionOption } from "@/fetchFunctions/fetchGetRoutesById";
import { select } from "./const";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

interface Props {
  params: { id: string };
}

export default async function SeatSelection({ params }: Props) {
  const { id } = (await params) || undefined;
  const session = await getServerSession(authConfig);
  const driverId: string | undefined = session?.user.id;

  const routeArray = await fetchGetRoutesByIdSeatSelection<IGetSearchRouteSeatSelectionOption, IGetRouteSeatSelection[]>([Number(id)], select);

  const route = routeArray && routeArray[0];

  if (route.busSeats) {
    const updatedPassengers = route.busSeats.map((e) => {
      // console.log("XXXXXXXXXXX", e.passenger, driverId, e.busSeatStatus);
      if (e.passenger === Number(driverId) && e.busSeatStatus === SeatStatusEnum.RESERVED) {
        return { ...e, busSeatStatus: SeatStatusEnum.SELECTED };
      }
      return e;
    });
    route.busSeats = updatedPassengers;
  }

  // console.log("SeatSelection route ************************** ----", route);

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={route} />
      <OrderSeatsBus layoutsData={layoutsData} route={route} />
      MyBookings {id}
    </Container>
  );
}
