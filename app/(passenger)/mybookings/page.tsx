"use client";

import React, { useState } from "react";
import AvailableRoutes from "@/components/shared/passenger/AvailableRoutes";
import PastRoutes from "@/components/shared/passenger/PastRoutes";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";

import { separateRoutesTable } from "./action";
import { useFetchPassengerRoutes } from "./useFetchPassengerRoutes";
import { useDeletePassengerRoute } from "./useDeletePassengerRoute";

export default function MyBookings() {
  const [reload, setReload] = useState<boolean>(false);
  const { routesPassenger, loading, userSessionId } = useFetchPassengerRoutes(reload);
  const { removeRoutePassenger } = useDeletePassengerRoute(routesPassenger, userSessionId, setReload);

  if (loading) return <MyScaleLoader />;

  const separateData = separateRoutesTable(routesPassenger, userSessionId);
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(separateData);

  return (
    <div className="bg-[#F9FAFB] px-4">
      <h1 className="text-2xl font-bold mb-10">Booked Routes</h1>
      <AvailableRoutes className="mb-10" routes={availableRoutes} removeRoutePassenger={removeRoutePassenger} />
      <PastRoutes routes={pastRoutes} />
    </div>
  );
}
