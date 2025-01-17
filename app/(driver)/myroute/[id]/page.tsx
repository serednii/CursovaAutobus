import { Container } from "@/components/shared/container";
import TableRouteDetail from "@/components/shared/driver/TableRouteDetail";
import { GetRouteById } from "@/types/route-driver.types";
import { formatDate, getUsersFetchByIdsBySelect, routeFetch } from "./action";

interface Props {
  params: { id: string };
}

export default async function RouteId({ params }: Props) {
  const { id } = await params;
  console.log("routes", id);

  const routeRaw: GetRouteById[] | null =
    (await routeFetch(Number(id))) || ({} as GetRouteById[]);
  const [route] = formatDate(routeRaw || ({} as GetRouteById));

  const passengersId = route.busSeats
    .filter((e) => e.passenger)
    .map((e) => e.passenger)
    .sort((a, b) => a - b);

  const uniquePassengersIdSet = new Set(passengersId);
  const uniquePassengersId = Array.from(uniquePassengersIdSet) as number[];
  console.log("passengersId", passengersId);

  console.log("passengersId", uniquePassengersId);
  if (!uniquePassengersId) {
    return (
      <Container>
        <h1>Route not found</h1>
      </Container>
    );
  }

  const users = await getUsersFetchByIdsBySelect(uniquePassengersId, {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

  console.log("users", users);

  // console.log("routes", route);
  if (!route) {
    return (
      <Container>
        <h1>Route not found</h1>
      </Container>
    );
  } else {
    return (
      <Container>
        <header className="h-[150px] flex flex-col justify-center">
          <h1 className="text-3xl font-bold">View Сhosen route</h1>
          <p>
            Route:{" "}
            {`${route.departureFrom} ${route.departureDate} to ${route.arrivalTo} ${route.arrivalDate}`}
          </p>
        </header>
        <main>
          <h2 className="text-2xl font-bold h-[80px] bg-white flex items-center pl-5">
            Passenger Details
          </h2>
          <TableRouteDetail />
        </main>
        <footer>route {id}</footer>
      </Container>
    );
  }
}
