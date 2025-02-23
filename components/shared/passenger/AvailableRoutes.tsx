import { IRoutesTable } from "@/types/route-passenger.types";
import TableMyBookings from "./TableMyBookings";

interface Props {
  routes: IRoutesTable[];
  className?: string;
  removeRoutePassenger?: (routeId: number) => void;
}

export default function AvailableRoutes({ routes, className, removeRoutePassenger }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available</h2>
      <TableMyBookings routes={routes} isRouteAgain={true} removeRoutePassenger={removeRoutePassenger || (() => {})} />
    </div>
  );
}
