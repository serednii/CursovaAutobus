import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderseatsBus";

import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/shared/Container";
import { fetchGetRoutesByIdSeatSelection, IGetRouteSeatSelection, IGetSearchRouteSeatSelectionOption } from "@/fetchFunctions/fetchGetRoutesById";
import { select } from "./const";

interface Props {
  params: { id: string };
}

export default async function SeatSelection({ params }: Props) {
  const { id } = (await params) || undefined;

  const routeArray = await fetchGetRoutesByIdSeatSelection<IGetSearchRouteSeatSelectionOption, IGetRouteSeatSelection[]>([Number(id)], select);

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
