import React from "react";
import { Container } from "@mui/material";
import fetchGetRoutesByDriverId, {
  IRoutesByIdDriver,
  selectGetRoutesByDriverId,
} from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperDriverRoutes from "@/components/shared/driver/WrapperDriverRoutes";

export default async function MyRoutes() {
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  const value = await fetchGetRoutesByDriverId.searchRoute(
    [userSessionId],
    selectGetRoutesByDriverId,
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
