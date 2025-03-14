import cloneDeep from "lodash/cloneDeep";
import { Container } from "@/components/ui/Container";
import TablePassengerDetails from "@/components/shared/driver/TablePassengerDetails";
import { getPassengerDetails, getPassengersId } from "./action";
import { getUsersFetchByIdsBySelect } from "@/fetchFunctions/fetchUsers";
import { ISubPassengersList } from "@/types/interface";
import { fetchGetRoutesById, IGetRouteMyRoute } from "@/fetchFunctions/fetchGetRoutesById";
import { selectRoute, selectUser } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { formatDate } from "@/lib/utils";

export type paramsType = Promise<{ id: string }>;
export default async function MyRoute(props: { params: paramsType }) {
  const { id } = await props.params;

  const idArray = [Number(id)];

  const routeRaw: IGetRouteMyRoute[] | null = await fetchGetRoutesById.searchRoute(idArray, selectRoute, "byIdMyRoute");

  const [route] = formatDate(routeRaw);

  const passengersSeatsList: ISubPassengersList[] = cloneDeep(route.passengersSeatsList);

  const uniquePassengersId = Array.from(new Set(getPassengersId(route)));

  const users = await getUsersFetchByIdsBySelect(uniquePassengersId, selectUser);

  const passengerDetails = getPassengerDetails(route, users, passengersSeatsList);
  // console.log(passengerDetails);

  return (
    <Container>
      <>
        <header className="h-[150px] flex flex-col justify-center">
          <h1 className="text-3xl font-bold">View Сhosen route</h1>
          <p>Route: {`${route.departureFrom} ${route.departureDate} to ${route.arrivalTo} ${route.arrivalDate}`}</p>
        </header>

        <main>
          <h2 className="text-2xl font-bold h-[80px] bg-white flex items-center pl-5">Passenger Details</h2>
          <TablePassengerDetails passengerDetails={passengerDetails || []} />
        </main>
        <footer>route {id}</footer>
      </>
    </Container>
  );
}
