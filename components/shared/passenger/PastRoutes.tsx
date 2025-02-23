import { GetRoutesByPassengerId, IRoutesByIdDriver, IRoutesTable } from "@/types/route-passenger.types";
import TableMyBookings from "./TableMyBookings";

interface Props {
  routes: IRoutesTable[];
  className?: string;
}

export default function PastRoutes({ routes, className }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Past Routes</h2>
      <TableMyBookings routes={routes} />
    </div>
  );
}
