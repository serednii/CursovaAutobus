import { GetRoutesByDriverId } from "@/types/route-driver.types";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: GetRoutesByDriverId[];
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
