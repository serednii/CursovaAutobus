import { GetRoutesByDriverId } from "@/types/route-driver.types";
import { IRoutesByIdDriver } from "@/types/route-passenger.types";
// import { IRoutesByIdDriver } from "@/types/route-passenger.types";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
  className?: string;
}

export default function PastRoutes({ routes, className }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Past Routes</h2>
      <TableRoutes routes={routes} isRouteAgain={true} />
    </div>
  );
}
