import { IGetRouteMyRoute } from "@/fetchFunctions/fetchGetRoutesById";
import { IGetUsersByIdBySelect } from "@/fetchFunctions/fetchUsersDELETE";
import { SubPassengerDetails } from "@/types/form.types";
import { IBusSeats, ISubPassengersList } from "@/types/interface";
import { PassengerDetails } from "@/types/route-driver.types";

interface IBusSeatsFilter extends Omit<IBusSeats, "passenger"> {
  passenger: number;
}

export const getPassengersId = (route: IGetRouteMyRoute) => {
  const passengersId: number[] = route.busSeats
    .filter((e): e is IBusSeatsFilter => e.passenger !== null && e.passenger !== undefined)
    .map((e) => e.passenger)
    .sort((a, b) => a - b);
  return passengersId;
};

export const getPassengerDetails = (
  route: IGetRouteMyRoute,
  usersRaw: IGetUsersByIdBySelect[] | null,
  passengersSeatsList: ISubPassengersList[]
) => {
  const tempUnique = new Map();
  const busSeatsSortByNumber = route.busSeats.sort((a, b) => a.number - b.number);

  const passengerDetails: (PassengerDetails | undefined)[] = Array.from(
    { length: busSeatsSortByNumber.length },
    (_, index) => {
      const { passenger: idPassenger, number } = busSeatsSortByNumber[index];
      void number;
      tempUnique.set(idPassenger, 1);

      const user = usersRaw?.find((user: IGetUsersByIdBySelect) => user.id === idPassenger);
      const uniqueId = Array.from(tempUnique.keys()).findIndex((e) => e === idPassenger);
      const subOrderPassenger: ISubPassengersList | undefined = passengersSeatsList.find(
        (user: ISubPassengersList) => user.idPassenger === idPassenger
      );

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

      const subPassengersLists: SubPassengerDetails[] = subOrderPassenger.subPassengersList;

      const [subUser] = subPassengersLists.splice(0, 1);

      return {
        seat: index + 1,
        orderPassengers: `${user?.firstName || ""} ${user?.lastName || ""}`,
        orderPassengersId: uniqueId,
        passenger: `${subUser?.subFirstName} ${subUser?.subLastName}` || "",
        phone: subUser?.subPhone || "",
        email: subUser?.subEmail || "",
      };
    }
  );

  return passengerDetails;
};
