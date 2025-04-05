import React from "react";

import fetchGetRoutesByPassengerId from "@/fetchFunctions/fetchGetRoutesByPassengerId";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperPassengerRoutes from "@/app/[locale]/(passenger)/mybookings/WrapperPassengerRoutes";

export default async function MyBookings() {
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  // const { routesPassenger, loading, userSessionId } = useFetchPassengerRoutes(reload);
  const routesPassenger = await fetchGetRoutesByPassengerId<typeof selectMyBookings>(
    userSessionId,
    selectMyBookings
  );
  // const { removeRoutePassenger } = useDeletePassengerRoute(routesPassenger, userSessionId, setReload);

  if (routesPassenger === null) return null;

  return <WrapperPassengerRoutes routes={routesPassenger} userSessionId={userSessionId} />;
}
