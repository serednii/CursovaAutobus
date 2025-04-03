"use client";
import { separateRoutesTable } from "@/app/[locale]/(passenger)/mybookings/action";
import AvailableRoutes from "@/components/AvailableRoutes";
import PastRoutes from "@/components/PastRoutes";
import { Container } from "@/components/ui/Container";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { useTranslation } from "react-i18next";
import TableMyBookings from "./TableMyBookings";

interface Props {
  routes: Omit<GetRoutesByPassengerId, "isReservation">[];
  userSessionId: number;
}

export default function WrapperPassengerRoutes({ routes, userSessionId }: Props) {
  const separateData = separateRoutesTable(routes, userSessionId);
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(separateData);
  const { t } = useTranslation();
  return (
    <Container>
      <div className="bg-[#F9FAFB] px-4">
        <h1 className="text-2xl font-bold mb-10">{t("booked_routes")}</h1>
        <AvailableRoutes className="mb-10">
          <TableMyBookings routes={availableRoutes} t={t} isRouteAgain={true} />
        </AvailableRoutes>
        <PastRoutes>
          <TableMyBookings routes={pastRoutes} t={t} />
        </PastRoutes>
      </div>
    </Container>
  );
}
