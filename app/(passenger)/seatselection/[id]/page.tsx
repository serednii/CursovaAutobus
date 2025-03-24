"use client";
import React, { useEffect, useState } from "react";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { cloneDeep } from "lodash";
import busStore from "@/mobx/busStore";
import { observer } from "mobx-react-lite";
import useBusLayoutData from "@/components/shared/passenger/useBusLayoutData";
import { UserSession } from "@/types/next-auth";

function SeatSelection() {
  const { data: session } = useSession();
  const params = useParams();
  const id = params.id ? Number(params.id) : 0;
  const sessionUser: UserSession | null = session?.user || null;
  const userIdSession: number = Number(sessionUser?.id);
  const [route, setRoute] = useState<IGetRouteSeatSelection | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("id in SeatSelection ", id);
  console.log("userIdSession in SeatSelection ", userIdSession);
  console.log("session in SeatSelection ", session);
  console.log("route in SeatSelection ", route);

  useEffect(() => {
    busStore.setDataLayoutBus(null, RoleEnum.PASSENGER);
  }, [busStore.setDataLayoutBus]);

  useEffect(() => {
    if (userIdSession) {
      busStore.setUserIdSession(userIdSession);
    }
  }, [userIdSession, busStore.setUserIdSession]);

  useEffect(() => {
    if (!id || !userIdSession) return;
    const getRouteById = async () => {
      try {
        const routeArray = await fetchGetRoutesById.searchRoute([id], selectSeatSelection, "seatSelection");
        const routes = routeArray as IGetRouteSeatSelection[] | null;
        const fetchedRoute = routes?.[0] || null;
        console.log("fetchedRoute in SeatSelection ", fetchedRoute);

        if (fetchedRoute && fetchedRoute.busSeats) {
          const updatedPassengers = fetchedRoute.busSeats.map((seat) =>
            seat.passenger === userIdSession && seat.busSeatStatus === SeatStatusEnum.RESERVED
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
  }, [id, userIdSession]);

  useBusLayoutData(route);

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

// "use client";
// import React, { useEffect } from "react";
// import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
// import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
// import { Container } from "@/components/ui/Container";
// import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
// import { SeatStatusEnum } from "@/enum/shared.enums";
// import { authConfig } from "@/configs/auth";
// import { getServerSession } from "next-auth/next";
// import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";

// export type paramsType = Promise<{ id: string }>;

// export default function SeatSelection(props: { params: paramsType }) {
//   const { data: session, status } = useSession();
//   const params = useParams();
//   const id = params.id ? Number(params.id) : 0;
//   console.log("Rendering SeatSelection");
//   // const { id } = await props.params;
//   // const session = await getServerSession(authConfig);
//   const userIdSession: number = Number(session?.user.id);

//   const routeArray = await fetchGetRoutesById.searchRoute([Number(id)], selectSeatSelection, "seatSelection");

//   const routes = routeArray as IGetRouteSeatSelection[] | null;

//   const route = routes?.[0] as IGetRouteSeatSelection;

//   console.log("route in SeatSelection ", route);

//   if (route && route.busSeats) {
//     const updatedPassengers = route.busSeats.map((e) => {
//       if (e.passenger === userIdSession && e.busSeatStatus === SeatStatusEnum.RESERVED) {
//         return { ...e, busSeatStatus: SeatStatusEnum.SELECTED };
//       }
//       return e;
//     });
//     route.busSeats = updatedPassengers;
//   }

//   return (
//     <Container className="pt-4">
//       <SelectedBusInfo route={route} />
//       <OrderSeatsBus route={route} session={session} />
//       MyBookings Driver Id {route?.driverId} Session user.id {session?.user.id}
//     </Container>
//   );
// }
