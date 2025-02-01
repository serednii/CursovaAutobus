import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import TableMyBookings from "./TableMyBookings";

interface Props<T> {
  routes: T[];
  className?: string;
}

export default function AvailableRoutes<T>({ routes, className }: Props<T>) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available</h2>
      <TableMyBookings routes={routes} isRouteAgain={true} />
    </div>
  );
}
