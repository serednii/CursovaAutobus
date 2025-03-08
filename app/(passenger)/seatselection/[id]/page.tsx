import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderseatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import { fetchGetRoutesByIdSeatSelection, IGetRouteSeatSelection, IGetSearchRouteSeatSelectionOption } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

interface Props {
  params: { id: string };
}

export default async function SeatSelection({ params }: Props) {
  console.log("Rendering SeatSelection");
  const { id } = (await params) || undefined;
  const session = await getServerSession(authConfig);
  const driverId: string | undefined = session?.user.id;

  const routeArray = await fetchGetRoutesByIdSeatSelection<IGetSearchRouteSeatSelectionOption, IGetRouteSeatSelection[]>(
    [Number(id)],
    selectSeatSelection
  );

  const route = routeArray && routeArray[0];

  if (route.busSeats) {
    const updatedPassengers = route.busSeats.map((e) => {
      if (e.passenger === Number(driverId) && e.busSeatStatus === SeatStatusEnum.RESERVED) {
        return { ...e, busSeatStatus: SeatStatusEnum.SELECTED };
      }
      return e;
    });
    route.busSeats = updatedPassengers;
  }

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={route} />
      <OrderSeatsBus key={Math.random()} route={route} />
      MyBookings Driver Id {route.driverId} Session user.id {session?.user.id}
    </Container>
  );
}
