"use client";

import React from "react";
import { Container } from "@mui/material";
import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import LoadingComponent from "@/components/LoadingComponent";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import { useFetchDriverRoutes } from "./useFetchDriverRoutes";
import { useDeleteRoute } from "./useDeleteRoute";
import { SeatStatusEnum } from "@/enum/shared.enums";

export default function MyRoutes() {
  const { routes, loading } = useFetchDriverRoutes();
  const setRouteToDelete = useDeleteRoute();

  if (loading) {
    return <LoadingComponent />;
  }

  const modRoutes = routes.map((route) => {
    const reserveSeats = route.busSeats.reduce((acc, seat) => (seat.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY ? acc + 1 : acc), 0);
    return {
      ...route,
      departureFrom: route.id + " * " + route.driverId + " * " + route.departureFrom,
      arrivalTo: `${reserveSeats} * ${route.arrivalTo}`,
    };
  });
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(modRoutes);

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">Мои маршруты</h1>
        {routes.length === 0 ? (
          <p className="text-2xl font-bold mb-10">Нет доступных маршрутов.</p>
        ) : (
          <>
            <AvailableRoutes className="mb-10" routes={availableRoutes} setOk={setRouteToDelete} />
            <PastRotes routes={pastRoutes} setOk={setRouteToDelete} />
          </>
        )}
      </Container>
    </div>
  );
}
