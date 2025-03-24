import { useEffect, useState } from "react";
import fetchGetRoutesByDriverId from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";

export const useFetchDriverRoutes = () => {
  const { session, userSessionId } = useGetSessionParams();

  const [routes, setRoutes] = useState<IRoutesByIdDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!userSessionId) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchGetRoutesByDriverId(userSessionId);
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
