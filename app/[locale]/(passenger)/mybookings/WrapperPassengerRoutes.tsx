"use client";
import { separateRoutesTable } from "@/app/[locale]/(passenger)/mybookings/action";
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
  const separateData = separateRoutesTable(routes, userSessionId);
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(separateData);
  const { t } = useAppTranslation("mybookings");
  return (
    <Container>
      <div className="bg-[#F9FAFB] px-4">
        <h1 className="text-2xl font-bold mb-10">{t("booked_routes")}</h1>
        <AvailableRoutes className="mb-10">
          <TableMyBookings routes={availableRoutes} isRouteAgain={true} />
        </AvailableRoutes>
        <PastRoutes>
          <TableMyBookings routes={pastRoutes} />
        </PastRoutes>
      </div>
    </Container>
  );
}
