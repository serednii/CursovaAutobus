import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import fetchGetRoutesByPassengerId from "@/fetchFunctions/fetchGetRoutesByPassengerId";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

export const useFetchPassengerRoutes = (reload: boolean) => {
  const { data: session } = useSession();
  const passengerId: number | undefined = Number(session?.user?.id);
  const [routesPassenger, setRoutesPassenger] = useState<Omit<GetRoutesByPassengerId, "isReservation">[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!passengerId) return;

    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const routes = await fetchGetRoutesByPassengerId<typeof selectMyBookings>(passengerId, selectMyBookings);
        if (routes !== null) {
          setRoutesPassenger(routes.filter((item) => item.driverId !== passengerId));
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [passengerId, reload]);

  return { routesPassenger, loading, passengerId };
};
