import TableMyBookings from "./TableMyBookings";

interface Props<T extends { id: string | number }> {
  routes: T[];
  className?: string;
  removeRoutePassenger?: (routeId: number) => void;
}

export default function AvailableRoutes<T extends { id: string | number }>({ routes, className, removeRoutePassenger }: Props<T>) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Available</h2>
      <TableMyBookings routes={routes} isRouteAgain={true} removeRoutePassenger={removeRoutePassenger || (() => {})} />
    </div>
  );
}
