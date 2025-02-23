import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
  className?: string;
}

export default function AvailableRoutes({ routes, className }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available Routes</h2>
      <TableRoutes routes={routes} />
    </div>
  );
}
