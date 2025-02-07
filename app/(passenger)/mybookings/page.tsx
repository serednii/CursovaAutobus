"use client";

import { sortDate } from "@/app/(driver)/myroutes/action";
import { Container } from "@/components/shared/container";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import {
  fetchDeleteRoutePassenger,
  fetchGetRoutesByPassengerId,
} from "@/fetchFunctions/fetchroutes";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getBusSeats, getBusSeatsRaw, getRoutesTable } from "./action";
import { select } from "./const";

export default function MyBookings() {
  const { data: session } = useSession();
  const passengerId: number | undefined = Number(session?.user?.id);
  const [reload, setReload] = useState(false);
  const [routesPassenger, setRoutesPassenger] = useState<
    GetRoutesByPassengerId[]
  >([]);
  console.log("routesPassenger", routesPassenger);

  if (!passengerId) return <p>Loading...</p>;

  useEffect(() => {
    if (!passengerId) return;

    const fetchRoutes = async () => {
      try {
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

  const { pastRoutes, availableRoutes } = sortDate(
    getRoutesTable(routesPassenger, passengerId)
  );

  const removeRoutePassenger = async (routeId: number) => {
    const busSeatsRaw = getBusSeatsRaw(routesPassenger, routeId);
    const busSeats = getBusSeats(busSeatsRaw, passengerId);

    const result = await fetchDeleteRoutePassenger({
      routeDriverId: routeId,
      idPassenger: passengerId,
      busSeats: busSeats,
    });
    console.log("result", result);
    if (!result) {
      //Error delete route passenger
    } else {
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
