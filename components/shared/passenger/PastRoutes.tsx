import TableMyBookings from "./TableMyBookings";

interface Props<T> {
  routes: T[];
  className?: string;
}

export default function PastRoutes<T>({ routes, className }: Props<T>) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">Past</h2>
      <TableMyBookings routes={routes} />
    </div>
  );
}
