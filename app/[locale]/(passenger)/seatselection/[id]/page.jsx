import React from "react";
import { getServerSession } from "next-auth";
import initTranslations from "@/app/i18n";
import OrderSeatsBus from "@/components/shared/passenger/OrderSeatsBus";
import SelectedBusInfo from "@/components/shared/passenger/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import mixedLayoutsSeatsData from "@/components/shared/passenger/mixedLayoutsSeatsData";
import { authConfig } from "@/configs/auth";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { ILayoutData } from "@/types/layoutbus.types";
import replaceReservedToSelected from "./replaceReservedToSelected";
import replaceReservedEmptyToReserved from "./replaceReservedEmptyToReserved";

// export interface BusInfo {
//   selected_bus: string;
//   departure: string;
//   arrival: string;
//   seats_available: string;
// }
// async function SeatSelection({ params }: { params: { locale: string; id: string } }) {

async function SeatSelection({ params }) {
  const { locale, id } = await params; // Використовуємо params без await
  const { t } = await initTranslations(locale, ["seatselection", "form"]);

  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);
  const idNumber = Number(id);

  const routesArrayUnknown = await fetchGetRoutesById.searchRoute(
    [idNumber],
    selectSeatSelection,
    "seatSelection"
  );
  // const routesArray = routesArrayUnknown as IGetRouteSeatSelection[] | null;

  const routesArray = routesArrayUnknown;
  const route = routesArray?.[0] || null;

  if (route === null || session === null) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }

  const fetchedRouteEmpty = replaceReservedEmptyToReserved({ route });
  // change SeatStatusEnum.RESERVED  to SeatStatusEnum.SELECTED
  const fetchedRoute = replaceReservedToSelected({ userSessionId, route: fetchedRouteEmpty });
  //mixed layouts to seats
  // const newData: ILayoutData = mixedLayoutsSeatsData(route);

  const newData = mixedLayoutsSeatsData(route);
  //*************************************** */
  // const language: BusInfo = {
  //   selected_bus: t("selected_bus"),
  //   departure: t("departure"),
  //   arrival: t("arrival"),
  //   seats_available: t("seats_available"),
  // };

  const language = {
    selected_bus: t("selected_bus"),
    departure: t("departure"),
    arrival: t("arrival"),
    seats_available: t("seats_available"),
  };

  return (
    <Container className="pt-4">
      <SelectedBusInfo route={fetchedRoute} language={language} />
      <OrderSeatsBus route={fetchedRoute} sessionUser={session.user} newData={newData} />
      MyBookings Driver Id {fetchedRoute?.driverId} Session user.id {session?.user?.id}
    </Container>
  );
}

export default SeatSelection;
