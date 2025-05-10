"use client";
import { newFormatRoutesTable } from "@/app/[locale]/(passenger)/mybookings/action";
import AvailableRoutes from "@/components/AvailableRoutes";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import PastRoutes from "@/components/PastRoutes";
import { Container } from "@/components/ui/Container";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import TableMyBookings from "@/components/shared/passenger/TableMyBookings";

interface Props {
  routes: Omit<GetRoutesByPassengerId, "isReservation">[];
  userSessionId: number;
}

export default function WrapperPassengerRoutes({ routes, userSessionId }: Props) {
  console.log("routes", routes);
  // const widthOutMyRoute = deleteMyRoute(routes, userSessionId);
  console.log("widthOutMyRoute", routes);
  const newFormatData = newFormatRoutesTable(routes, userSessionId);
  const { t } = useAppTranslation("mybookings");

  if (routes === null || routes.length === 0) {
    return (
      <div className="bg-[#F9FAFB] px-1 sm:px-2 md:px-4">
        <h1 className="text-2xl font-bold mb-10">{t("my_bookings")}</h1>
        <p className="text-2xl font-bold mb-10">{t("there_are_no_available_bookings")}</p>
      </div>
    );
  }

  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(newFormatData);

  return (
    <Container>
      <div className="bg-[#F9FAFB] px-1 sm:px-2 md:px-4">
        <h1 className="text-2xl font-bold mb-10">{t("booked_routes")}</h1>
        <AvailableRoutes className="mb-10">
          <TableMyBookings routes={availableRoutes} isRouteAgain={true} />
        </AvailableRoutes>
        {pastRoutes.length > 0 && (
          <PastRoutes>
            <TableMyBookings routes={pastRoutes} />
          </PastRoutes>
        )}
      </div>
    </Container>
  );
}
