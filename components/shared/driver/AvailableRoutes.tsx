import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
  className?: string;
  setOk?: (id: number) => void;
}

export default function AvailableRoutes({ routes, className, setOk }: Props) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available Routes</h2>
      <TableRoutes routes={routes} setOk={setOk} />
    </div>
  );
}
