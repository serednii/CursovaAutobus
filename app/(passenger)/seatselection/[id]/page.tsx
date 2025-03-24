"use client";
import React, { useEffect, useState } from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { useParams } from "next/navigation";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import busStore from "@/mobx/busStore";
import { observer } from "mobx-react-lite";
import useMixedLayoutsSeatsData from "@/components/shared/passenger/useBusLayoutData";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";

function SeatSelection() {
  const { sessionUser, userSessionId, session } = useGetSessionParams();

  const params = useParams();
  const id = params.id ? Number(params.id) : 0;
  const [route, setRoute] = useState<IGetRouteSeatSelection | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("id in SeatSelection ", id);
  console.log("userSessionId in SeatSelection ", userSessionId);
  console.log("session in SeatSelection ", session);
  console.log("route in SeatSelection ", route);

  useEffect(() => {
    busStore.setDataLayoutBus(null, RoleEnum.PASSENGER);
  }, [busStore.setDataLayoutBus]);

  useEffect(() => {
    if (userSessionId) {
      busStore.setUserIdSession(userSessionId);
    }
  }, [userSessionId, busStore.setUserIdSession]);

  useEffect(() => {
    if (!id || !userSessionId) return;
    const getRouteById = async () => {
      try {
        const routeArray = await fetchGetRoutesById.searchRoute([id], selectSeatSelection, "seatSelection");
        const routes = routeArray as IGetRouteSeatSelection[] | null;
        const fetchedRoute = routes?.[0] || null;
        console.log("fetchedRoute in SeatSelection ", fetchedRoute);

        if (fetchedRoute && fetchedRoute.busSeats) {
          const updatedPassengers = fetchedRoute.busSeats.map((seat) =>
            seat.passenger === userSessionId && seat.busSeatStatus === SeatStatusEnum.RESERVED
              ? { ...seat, busSeatStatus: SeatStatusEnum.SELECTED }
              : seat
          );
          fetchedRoute.busSeats = updatedPassengers;
        }

        console.log("fetchedRoute in SeatSelection ", fetchedRoute);
        setRoute(fetchedRoute);
      } catch (error) {
        console.error("Error fetching route:", error);
      } finally {
        setLoading(false);
      }
    };

    getRouteById();
  }, [id, userSessionId]);

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
