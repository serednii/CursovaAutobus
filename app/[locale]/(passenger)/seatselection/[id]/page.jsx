import React from "react";
import { getServerSession } from "next-auth";
import initTranslations from "@/app/i18n";
import OrderSeatsBus from "@/app/[locale]/(passenger)/seatselection/[id]/OrderSeatsBus";
import SelectedBusInfo from "@/app/[locale]/(passenger)/seatselection/[id]/SelectedBusInfo";
import { Container } from "@/components/ui/Container";
import mixedLayoutsSeatsData from "@/components/shared/passenger/mixedLayoutsSeatsData";
import { authConfig } from "@/configs/auth";
import { getRoutesById } from "@/fetchApi/v1/getRoutesById";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import replaceReservedToSelected from "./replaceReservedToSelected";
import replaceReservedEmptyToReserved from "./replaceReservedEmptyToReserved";

async function SeatSelection({ params }) {
  const { locale, id } = await params; // Використовуємо params без await
  const { t } = await initTranslations(locale, ["seatselection", "form"]);

  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);
  const idNumber = Number(id || 0);

  const routesArrayUnknown = await getRoutesById.searchRoute(
    idNumber,
    selectSeatSelection,
    "seatSelection"
  );

  console.log("idNumber seatselection", idNumber, routesArrayUnknown);

  const routesArray = routesArrayUnknown;
  const route = routesArray?.[0] || null;

  if (route === null || session === null) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }

  const fetchedRouteEmpty = replaceReservedEmptyToReserved({ route });
  const fetchedRoute = replaceReservedToSelected({ userSessionId, route: fetchedRouteEmpty });

  const newData = mixedLayoutsSeatsData(route);

  const language = {
    selected_bus: t("selected_bus"),
    departure: t("departure"),
    arrival: t("arrival"),
    seats_available: t("seats_available"),
  };

  return (
    <Container className="bg-[#F9FAFB]">
      <SelectedBusInfo route={fetchedRoute} language={language} className="mb-3" />
      <OrderSeatsBus route={fetchedRoute} sessionUser={session.user} newData={newData} />
      MyBookings Driver Id {fetchedRoute?.driverId} Session user.id {session?.user?.id}
    </Container>
  );
}

export default SeatSelection;
