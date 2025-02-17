"use client";

import { sortDate } from "@/app/(driver)/myroutes/action";
import { Container } from "@/components/shared/Container";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getBusSeats, getBusSeatsRaw, getRoutesTable } from "./action";
import { select } from "./const";
import { toast } from "react-hot-toast";
import fetchGetRoutesByPassengerId from "@/fetchFunctions/fetchGetRoutesByPassengerId";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";

// interface IGetRoutePassengerById
//   extends Omit<GetRoutesByPassengerId, "busSeats"> {
//   busSeats: {
//     number: number;
//     id: number;
//     passenger: number | null;
//     busSeatStatus: SeatStatusEnum;
//     routeDriverId: number;
//   }[];
// }

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
        const routes = await fetchGetRoutesByPassengerId<typeof select>(passengerId, select);
        setRoutesPassenger(routes || []);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [passengerId, reload]);

  if (!passengerId) return <p>Loading...</p>;

  const { pastRoutes, availableRoutes } = sortDate(getRoutesTable(routesPassenger, passengerId));

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
