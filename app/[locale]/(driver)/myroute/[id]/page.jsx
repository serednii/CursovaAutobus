import cloneDeep from "lodash/cloneDeep";
import { Container } from "@/components/ui/Container";
import TablePassengerDetails from "@/components/shared/driver/TablePassengerDetails";
import { getPassengerDetails, getPassengersId } from "./action";
// import { ISubPassengersList } from "@/types/interface";
import { getRoutesById } from "@/fetchApi/v1/getRoutesById";
import { selectRoute, selectUser } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { formatDate } from "@/lib/utils";
import initTranslations from "@/app/i18n";
import { PiArrowFatLinesRightDuotone } from "react-icons/pi";
import { getUsersById } from "@/fetchApi/v1/getUsersById";

// export default async function MyRoute({ params }: { params: { locale: string; id: string } }) {
// export type paramsType = Promise<{ id: string }>;
export default async function MyRoute({ params }) {
  const { locale, id } = await params;
  const { t } = await initTranslations(locale, ["myroute"]);

  const idNumber = Number(id || 0);
  const routeRaw = await getRoutesById.searchRoute(
    // const routeRaw: IGetRouteMyRoute[] | null = await fetchGetRoutesById.searchRoute(
    idNumber,
    selectRoute,
    "byIdMyRoute"
  );

  const [route] = formatDate(routeRaw);
  // const passengersSeatsList: ISubPassengersList[] = cloneDeep(route.passengersSeatsList);

  const passengersSeatsList = cloneDeep(route.passengersSeatsList);

  const uniquePassengersId = Array.from(new Set(getPassengersId(route)));

  const users = await getUsersById(uniquePassengersId, selectUser);

  const passengerDetails = getPassengerDetails(route, users, passengersSeatsList);

  return (
    <Container>
      <header className="flex flex-col justify-center px-1 sm:px-2 md:px-4 bg-white">
        <h1 className="text-3xl font-bold mb-2">{t("view_chosen_route")}</h1>
        <div className="flex gap-5 mb-2 items-center">
          <div>
            <p>{route.departureFrom} </p>
            <p> {route.departureDate} </p>
          </div>
          <PiArrowFatLinesRightDuotone className="shrink-0" />
          <div>
            <p>{route.arrivalTo} </p>
            <p>{route.arrivalDate}</p>
          </div>
        </div>
      </header>

      <main>
        <h2 className="text-2xl font-bold h-[80px] bg-white flex items-center pl-5">
          {t("passenger_details")}
        </h2>
        <TablePassengerDetails passengerDetails={passengerDetails} />
      </main>

      <footer>
        {t("route")} {id}
      </footer>
    </Container>
  );
}
