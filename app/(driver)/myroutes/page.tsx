import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import React from "react";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

import { Container } from "@mui/material";
import { sortDate } from "./action";
import { fetchGetRoutesByDriverId } from "@/fetchFunctions/fetchroutes";

import { GetRoutesByDriverId } from "@/types/route-driver.types";

export default async function MyRoutes() {
  const session = await getServerSession(authConfig);

  const driverId: number | undefined = session?.user.id;
  console.log("driverid myroutes:", driverId);
  if (!driverId) return null;

  const routes: GetRoutesByDriverId[] =
    (await fetchGetRoutesByDriverId(driverId)) || [];

  const { pastRoutes, availableRoutes } = sortDate(routes);
  console.log("routesssssss:", availableRoutes);

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">My routes</h1>
        <AvailableRoutes
          className="mb-10"
          routes={availableRoutes}
        ></AvailableRoutes>

        <PastRotes routes={pastRoutes}></PastRotes>
      </Container>
    </div>
  );
}
