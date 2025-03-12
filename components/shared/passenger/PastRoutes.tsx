import TableMyBookings from "./TableMyBookings";

interface Props<T extends { id: string | number }> {
  routes: T[];
  className?: string;
}

export default function PastRoutes<T extends { id: string | number }>({ routes, className }: Props<T>) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Past Routes</h2>
      <TableMyBookings routes={routes} />
    </div>
  );
}
