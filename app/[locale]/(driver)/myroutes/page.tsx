import React from "react";

import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperDriverRoutes from "@/app/[locale]/(driver)/myroutes/WrapperDriverRoutes";
import { Container } from "@/components/ui/Container";
import getRoutesByDriverId, {
  IRoutesByIdDriver,
  selectGetRoutesByDriverId,
} from "@/fetchApi/v1/gеtRoutesByDriverId";

export default async function MyRoutes() {
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);
  console.log("userSessuionId", userSessionId);
  if (!userSessionId) return null;

  const value = await getRoutesByDriverId.searchRoute(
    [userSessionId],
    selectGetRoutesByDriverId,
    "getDriver"
  );

  const routes = value as IRoutesByIdDriver[] | null;
  // console.log("routes", routes);
  if (routes === null || routes.length === 0) return;

  return (
    <Container>
      <WrapperDriverRoutes routes={routes} />
    </Container>
  );
}
