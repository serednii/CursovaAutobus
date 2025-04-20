import { useEffect, useState } from "react";
import getRoutesByPassengerId from "@/fetchFunctions/v1/getRoutesByPassengerId";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";

export const useFetchPassengerRoutes = (reload: boolean) => {
  const { userSessionId } = useGetSessionParams();

  const [routesPassenger, setRoutesPassenger] = useState<
    Omit<GetRoutesByPassengerId, "isReservation">[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userSessionId) return;

    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const routes = await getRoutesByPassengerId<typeof selectMyBookings>(
          userSessionId,
          selectMyBookings
        );
        if (routes !== null) {
          setRoutesPassenger(routes.filter((item) => item.driverId !== userSessionId));
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [userSessionId, reload]);

  return { routesPassenger, loading, userSessionId };
};
