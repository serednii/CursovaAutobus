import React from "react";

import getRoutesByPassengerId from "@/fetchApi/v1/getRoutesByPassengerId";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperPassengerRoutes from "@/app/[locale]/(passenger)/mybookings/WrapperPassengerRoutes";

export default async function MyBookings() {
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  // const { routesPassenger, loading, userSessionId } = useFetchPassengerRoutes(reload);
  const routesPassenger = await getRoutesByPassengerId(userSessionId, selectMyBookings);
  console.log("routesPassenger", routesPassenger);
  // const { removeRoutePassenger } = useDeletePassengerRoute(routesPassenger, userSessionId, setReload);

  if (routesPassenger === null) return null;

  return <WrapperPassengerRoutes routes={routesPassenger} userSessionId={userSessionId} />;
}
