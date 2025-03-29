"use client";

import React from "react";
import { Container } from "@mui/material";
import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import LoadingComponent from "@/components/LoadingComponent";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import { useFetchDriverRoutes } from "./useFetchDriverRoutes";
import { useDeleteRoute } from "./useDeleteRoute";

export default function MyRoutes() {
  const { routes, loading } = useFetchDriverRoutes();
  const setRouteToDelete = useDeleteRoute();

  if (loading) {
    return <LoadingComponent />;
  }

  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(routes);

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
