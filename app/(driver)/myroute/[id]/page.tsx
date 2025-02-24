import { Container } from "@/components/ui/Container";
import TablePassengerDetails from "@/components/shared/driver/TablePassengerDetails";
import { formatDate, getPassengerDetails, getPassengersId } from "./action";

import { getUsersFetchByIdsBySelect } from "@/fetchFunctions/fetchUsers";
import cloneDeep from "lodash/cloneDeep";
import { ISubPassengersList } from "@/types/interface";

// import { isUserArray } from "@/lib/utils";
import { IUser } from "@/types/next-auth";
import ShowIf from "@/components/ShowIf";

import { fetchGetRoutesByIdMyRoute, IGetRouteMyRoute, IGetSearchRouteMyRouteOption } from "@/fetchFunctions/fetchGetRoutesById";
import { selectRoute, selectUser } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

interface Props {
  params: { id: string };
}

export default async function MyRoute({ params }: Props) {
  const { id } = await params;
  console.log("routes", id);

  const routeRaw: IGetRouteMyRoute[] | null = await fetchGetRoutesByIdMyRoute<IGetSearchRouteMyRouteOption, IGetRouteMyRoute[]>(
    [Number(id)],
    selectRoute
  );
  const [route] = formatDate(routeRaw);

  const passengersSeatsList: ISubPassengersList[] = cloneDeep(route.passengersSeatsList);

  console.log("passengersSeatsList", passengersSeatsList);

  const uniquePassengersId = Array.from(new Set(getPassengersId(route)));
  console.log("uniquePassengersId", uniquePassengersId);

  if (!uniquePassengersId) {
    return (
      <Container>
        <h1>Route not found</h1>
      </Container>
    );
  }

  const usersRaw: unknown = await getUsersFetchByIdsBySelect(uniquePassengersId, selectUser);

  // console.log("usersRaw", usersRaw);
  // const { message, status } = isUserArray(usersRaw);
  // console.log("status", status);
  // console.log("message", message);
  // if (!status) {
  //   return (
  //     <Container>
  //       <h1>{message}</h1>
  //     </Container>
  //   );
  // }

  const users = usersRaw as IUser[];

  const passengerDetails = getPassengerDetails(route, users, passengersSeatsList);

  // console.log("users", users);
  // console.log("routes", route);
  return (
    <Container>
      <ShowIf condition={!route}>
        <h1>Route not found</h1>
      </ShowIf>
      <ShowIf condition={!!route}>
        <header className="h-[150px] flex flex-col justify-center">
          <h1 className="text-3xl font-bold">View Сhosen route</h1>
          <p>Route: {`${route.departureFrom} ${route.departureDate} to ${route.arrivalTo} ${route.arrivalDate}`}</p>
        </header>
        <main>
          <h2 className="text-2xl font-bold h-[80px] bg-white flex items-center pl-5">Passenger Details</h2>
          <TablePassengerDetails passengerDetails={passengerDetails} />
        </main>
        <footer>route {id}</footer>
      </ShowIf>
    </Container>
  );
}
