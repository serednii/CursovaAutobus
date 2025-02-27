"use client";

import { sortDate } from "@/app/(driver)/myroutes/action";
import { Container } from "@/components/ui/Container";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import { GetRoutesByPassengerId, IRoutesTable } from "@/types/route-passenger.types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getBusSeatsRaw, separateRoutesTable } from "./action";

import { toast } from "react-hot-toast";
import fetchGetRoutesByPassengerId from "@/fetchFunctions/fetchGetRoutesByPassengerId";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

export default function MyBookings() {
  const { data: session } = useSession();
  const passengerId: number | undefined = Number(session?.user?.id);
  const [reload, setReload] = useState(false);
  const [routesPassenger, setRoutesPassenger] = useState<GetRoutesByPassengerId[]>([]);

  console.log("routesPassenger", routesPassenger);

  useEffect(() => {
    if (!passengerId) return;

    const fetchRoutes = async () => {
      try {
        const routes = await fetchGetRoutesByPassengerId<typeof selectMyBookings>(passengerId, selectMyBookings);
        setRoutesPassenger(routes || []);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [passengerId, reload]);

  if (!passengerId) return <p>Loading...</p>;
  const separateData = separateRoutesTable(routesPassenger, passengerId);
  const { pastRoutes, availableRoutes } = sortDate<IRoutesTable>(separateData);

  const removeRoutePassenger = async (routeId: number) => {
    //find busSeats by routeId  of selected delete
    const busSeatsRaw = getBusSeatsRaw(routesPassenger, routeId);
    //change busSeats status of selected delete to AVAILABLE
    // const busSeats = getBusSeatsPassenger(busSeatsRaw, passengerId);

    const result = await fetchDeleteRoutePassenger({
      routeDriverId: routeId,
      idPassenger: passengerId,
      busSeats: busSeatsRaw,
    });

    console.log("result", result);

    if (!result) {
      toast.error("Error Route deleted");
    } else {
      // new Promise((resolve) =>
      //   setTimeout(() => {
      toast.success("Route deleted", { duration: 3000 });
      //     resolve(null);
      //   }, 1000)
      // );
      setReload(!reload);
    }
    console.log("Removing route ID:", routeId, passengerId);
  };

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">Booked Routes</h1>
        <AvailableRoutes className="mb-10" routes={availableRoutes} removeRoutePassenger={removeRoutePassenger} />
        <PastRoutes routes={pastRoutes} />
      </Container>
    </div>
  );
}
