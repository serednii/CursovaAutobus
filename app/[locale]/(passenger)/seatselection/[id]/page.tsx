"use client";
import React, { useEffect } from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
// import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { RoleEnum } from "@/enum/shared.enums";
import { useParams } from "next/navigation";
// import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import busStore from "@/mobx/busStore";
import { observer } from "mobx-react-lite";
import useMixedLayoutsSeatsData from "@/components/shared/passenger/useBusLayoutData";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";
import useGetRoute from "./useGetRoute";
import useChangeBusSeatStatus from "./changeBusSeatStatus";

function SeatSelection() {
  const { sessionUser, userSessionId, session } = useGetSessionParams();

  const params = useParams();
  const id = params.id ? Number(params.id) : 0;

  console.log("id in SeatSelection ", id);
  console.log("userSessionId in SeatSelection ", userSessionId);
  console.log("session in SeatSelection ", session);

  useEffect(() => {
    busStore.setDataLayoutBus(null, RoleEnum.PASSENGER);
  }, []);

  useEffect(() => {
    if (userSessionId) {
      busStore.setUserIdSession(userSessionId);
    }
  }, [userSessionId]);

  const { route, loading } = useGetRoute({ userSessionId, id });
  useChangeBusSeatStatus({ route, userSessionId });

  useMixedLayoutsSeatsData(route);

  if (loading) return <div>Loading...</div>;
  if (!route || !session || !params) return <div>No route found</div>;
  console.log("route in SeatSelection ", route);

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={route} />
      <OrderSeatsBus route={route} sessionUser={sessionUser} />
      MyBookings Driver Id {route?.driverId} Session user.id {session?.user?.id}
    </Container>
  );
}

export default observer(SeatSelection);
