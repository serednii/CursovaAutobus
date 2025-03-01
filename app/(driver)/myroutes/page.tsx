"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@mui/material";
import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import { sortDate } from "./action";
import fetchGetRoutesByDriverId from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import fetchDeleteRouteById from "@/fetchFunctions/fetchDeleteRouteById";
import toast from "react-hot-toast";
import LoadingComponent from "@/components/LoadingComponent";

export default function MyRoutes() {
  const { data: session } = useSession(); // Получаем сессию на клиенте
  const [routes, setRoutes] = useState<IRoutesByIdDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState<number | null>(null);

  useEffect(() => {
    if (ok) return;
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
  }, [session, ok]);

  useEffect(() => {
    if (ok) {
      fetchDeleteRouteById(ok)
        .then((data) => {
          if ("message" in data) {
            toast.success("Your route has been successfully deleted", {
              duration: 5000,
            });
          } else {
            toast.error("Your route has not been deleted", {
              duration: 5000,
            });
          }
        })
        .finally(() => setOk(null));
    }
  }, [ok]);

  if (loading) {
    return <LoadingComponent />;
  }

  const { pastRoutes, availableRoutes } = sortDate<IRoutesByIdDriver>(routes);

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-bold mb-10">Мои маршруты</h1>
        {routes.length === 0 ? (
          <p className="text-2xl font-bold mb-10">Нет доступных маршрутов.</p>
        ) : (
          <>
            <AvailableRoutes className="mb-10" routes={availableRoutes} setOk={setOk} />
            <PastRotes routes={pastRoutes} setOk={setOk} />
          </>
        )}
      </Container>
    </div>
  );
}
