import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import fetchGetRoutesByDriverId from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";

export const useFetchDriverRoutes = () => {
  const { data: session } = useSession();
  const [routes, setRoutes] = useState<IRoutesByIdDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const driverId = Number(session.user.id);
        const data = await fetchGetRoutesByDriverId(driverId);
        setRoutes(data || []);
      } catch (error) {
        console.error("Ошибка при загрузке маршрутов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [session]);

  return { routes, setRoutes, loading };
};
