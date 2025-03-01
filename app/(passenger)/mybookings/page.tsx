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
import { ScaleLoader } from "react-spinners";
import { ContainerViewCenter } from "@/components/ui/ContainerViewCenter";
import { ContainerCenter } from "@/components/ui/ContainerCenter";
export default function MyBookings() {
  const { data: session } = useSession();
  const passengerId: number | undefined = Number(session?.user?.id);
  const [reload, setReload] = useState(false);
  const [routesPassenger, setRoutesPassenger] = useState<Omit<GetRoutesByPassengerId, "isReservation">[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("routesPassenger", routesPassenger);

  useEffect(() => {
    if (!passengerId) return;

    try {
      setLoading(true);
      fetchGetRoutesByPassengerId<typeof selectMyBookings>(passengerId, selectMyBookings)
        .then((routes: Omit<GetRoutesByPassengerId, "isReservation">[] | null) => {
          if (routes !== null) {
            setRoutesPassenger(routes);
            setLoading(false);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  }, [passengerId, reload]);

  const separateData = separateRoutesTable(routesPassenger, passengerId);
  const { pastRoutes, availableRoutes } = sortDate<Omit<IRoutesTable, "isReservation">>(separateData);

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

  if (loading)
    return (
      <ContainerCenter>
        <ScaleLoader speedMultiplier={1.5} radius={10} height={100} width={20} color="#0fcee1" />
      </ContainerCenter>
    );

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
