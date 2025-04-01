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
import AddDataToStore from "@/components/shared/passenger/AddDataToStore";
import { ILayoutData } from "@/types/layoutbus.types";
import TranslationsProvider from "@/components/TranslationsProvider";
import replaceReservedToSelected from "./replaceReservedToSelected";

export interface BusInfo {
  selected_bus: string;
  departure: string;
  arrival: string;
  seats_available: string;
}

async function SeatSelection({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = await params; // Використовуємо params без await
  const { t, resources } = await initTranslations(locale, ["seatselection", "form"]);

  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);
  const idNumber = Number(id);

  const routeArray = await fetchGetRoutesById.searchRoute([idNumber], selectSeatSelection, "seatSelection");
  const routesArray = routeArray as IGetRouteSeatSelection[] | null;
  const route = routesArray?.[0] || null;

  if (route === null || session === null) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }

  // change SeatStatusEnum.RESERVED  to SeatStatusEnum.SELECTED
  const fetchedRoute = replaceReservedToSelected({ userSessionId, route });
  //mixed layouts to seats
  const newData: ILayoutData = mixedLayoutsSeatsData(route);
  //*************************************** */
  const language: BusInfo = {
    selected_bus: t("selected_bus"),
    departure: t("departure"),
    arrival: t("arrival"),
    seats_available: t("seats_available"),
  };

  return (
    <TranslationsProvider namespaces={["seatselection", "form"]} locale={locale} resources={resources}>
      <AddDataToStore route={newData} userSessionId={userSessionId}>
        <Container className="pt-4">
          <SelectedBusInfo route={fetchedRoute} language={language} />
          <OrderSeatsBus route={fetchedRoute} sessionUser={session.user} newData={newData} />
          MyBookings Driver Id {fetchedRoute?.driverId} Session user.id {session?.user?.id}
        </Container>
      </AddDataToStore>
    </TranslationsProvider>
  );
}

export default SeatSelection;
