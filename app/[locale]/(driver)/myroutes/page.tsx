import React from "react";

import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperDriverRoutes from "@/app/[locale]/(driver)/myroutes/WrapperDriverRoutes";
import { Container } from "@/components/ui/Container";
import {
  getRoute,
  IRoutesByIdDriver,
  selectGetRoutesByDriverId,
} from "@/fetchFunctions/v1/getRoutes";

export default async function MyRoutes() {
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  const value = await getRoute.searchRoute(
    {
      driverId: userSessionId,
      select: selectGetRoutesByDriverId,
    },
    "getDriver"
  );

  const routes = value as IRoutesByIdDriver[] | null;
  console.log("routes", routes);
  if (routes === null || routes.length === 0) return;

  return (
    <Container>
      <WrapperDriverRoutes routes={routes} />
    </Container>
  );
}
