import React from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SSSelectedBusInfo";
import { Container } from "@/components/ui/Container";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

export type paramsType = Promise<{ id: string }>;

export default async function SeatSelection(props: { params: paramsType }) {
  console.log("Rendering SeatSelection");
  const { id } = await props.params;
  const session = await getServerSession(authConfig);
  const driverId: string | undefined = session?.user.id;

  const routeArray = await fetchGetRoutesById.searchRoute([Number(id)], selectSeatSelection, "seatSelection");

  const routes = routeArray as IGetRouteSeatSelection[] | null;

  const route = routes?.[0] as IGetRouteSeatSelection;

  if (route && route.busSeats) {
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
      MyBookings Driver Id {route?.driverId} Session user.id {session?.user.id}
    </Container>
  );
}
