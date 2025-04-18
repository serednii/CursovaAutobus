import { useEffect, useState } from "react";

import { useGetSessionParams } from "@/hooks/useGetSessionParams";
import {
  selectGetRoutesByDriverId,
  IRoutesByIdDriver,
  getRoute,
} from "@/fetchFunctions/v1/getRoutes";

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
        const value = await getRoute.searchRoute(
          {
            driverId: userSessionId,
            select: selectGetRoutesByDriverId,
          },
          "getDriver"
        );
        const result = value as IRoutesByIdDriver[] | null;
        if (result === null || result.length === 0) return;
        setRoutes(result);
      } catch (error) {
        console.error("Ошибка при загрузке маршрутов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [session, userSessionId]);

  return { routes, setRoutes, loading };
};
