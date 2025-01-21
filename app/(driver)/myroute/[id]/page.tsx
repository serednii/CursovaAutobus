import { Container } from "@/components/shared/container";
import TablePassengerDetails from "@/components/shared/driver/TablePassengerDetails";
import {
  IGetRouteById,
  IBusSeats,
  PassengerDetails,
  ISubPassengersList,
} from "@/types/route-driver.types";
import { formatDate } from "./action";

import {
  getUsersFetchByIdsBySelect,
  routeFetch,
} from "../../../../fetchFunctions/fetchdriver";
import cloneDeep from "lodash/cloneDeep";
import { ISubPassengers } from "@/types/form.types";

interface Props {
  params: { id: string };
}

interface IBusSeatsFilter extends Omit<IBusSeats, "passenger"> {
  passenger: number;
}

export default async function RouteId({ params }: Props) {
  const { id } = await params;
  console.log("routes", id);

  const routeRaw: IGetRouteById[] | null =
    (await routeFetch(Number(id))) || ({} as IGetRouteById[]);
  const [route] = formatDate(routeRaw || ({} as IGetRouteById));

  // const passengersIdRaw: number[] = route.busSeats
  //   .filter((e) => e.passenger !== null && e.passenger !== undefined)
  //   .map((e) => e.passenger);

  const passengersId: number[] = route.busSeats
    .filter(
      (e): e is IBusSeatsFilter =>
        e.passenger !== null && e.passenger !== undefined
    )
    .map((e) => e.passenger)
    .sort((a, b) => a - b);

  const passengersSeatsList: ISubPassengersList[] = cloneDeep(
    route.passengersSeatsList
  );

  const uniquePassengersIdSet = new Set(passengersId);
  const uniquePassengersId = Array.from(uniquePassengersIdSet) as number[];

  if (!uniquePassengersId) {
    return (
      <Container>
        <h1>Route not found</h1>
      </Container>
    );
  }

  const { users } = await getUsersFetchByIdsBySelect(uniquePassengersId, {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

  const tempAddUsers = new Map();
  const tempUnique = new Map();

  const busSeatsSortByNumber = route.busSeats.sort(
    (a, b) => a.number - b.number
  );

  // console.log("busSeatsSortByNumber", busSeatsSortByNumber);
  const passengerDetails: (PassengerDetails | undefined)[] = Array.from(
    { length: busSeatsSortByNumber.length },
    (_, index) => {
      const { passenger: idPassenger, number } = busSeatsSortByNumber[index];

      tempUnique.set(idPassenger, 1);

      console.log("SSSSSSSSSS", idPassenger);

      const user = users.find((user: any) => user.id === idPassenger);

      const uniqueId = Array.from(tempUnique.keys()).findIndex(
        (e) => e === idPassenger
      );
      console.log("uniqueId", uniqueId);
      if (tempAddUsers.has(idPassenger)) {
        const subOrderPassenger: ISubPassengersList | undefined =
          passengersSeatsList.find(
            (user: ISubPassengersList) => user.idPassenger === idPassenger
          );

        // console.log("11111111111111", subOrderPassenger);
        if (!subOrderPassenger) {
          return {
            seat: index + 1,
            orderPassengers: "",
            orderPassengersId: uniqueId,
            passenger: "",
            phone: "",
            email: "",
          };
        }
        const subPassengersLists: ISubPassengers[] =
          subOrderPassenger.subPassengersList;

        const [subUser] = subPassengersLists.splice(0, 1);
        // console.log("33333333333", subUser);

        return {
          seat: index + 1,
          orderPassengers: `${user?.firstName || ""} ${user?.lastName || ""}`,
          orderPassengersId: uniqueId,
          passenger: `${subUser?.subFirstName} ${subUser?.subLastName}` || "",
          phone: subUser?.subPhone || "",
          email: subUser?.subEmail || "",
        };
      } else {
        tempAddUsers.set(idPassenger, 1);
        return {
          seat: index + 1,
          orderPassengers: `${user?.firstName || ""} ${user?.lastName || ""}`,
          orderPassengersId: uniqueId,
          passenger: `${user?.firstName || ""} ${user?.lastName || ""}` || "",
          phone: user?.phone || "",
          email: user?.email || "",
        };
      }
    }
  );

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
          <TablePassengerDetails passengerDetails={passengerDetails} />
        </main>
        <footer>route {id}</footer>
      </Container>
    );
  }
}
