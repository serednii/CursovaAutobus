import { GetRoutesByDriverId, RouteDriver } from "@/types/route-driver.types";
import React, { ReactElement } from "react";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: GetRoutesByDriverId[];
  className?: string;
}

export default function AvailableRoutes({ routes, className }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available Routes</h2>
      <TableRoutes routes={routes} isRouteAgain={true} />
    </div>
  );
}
