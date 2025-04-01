"use client";
import AvailableRoutes from "@/components/AvailableRoutes";
import PastRoutes from "@/components/PastRoutes";
import { Container } from "@/components/ui/Container";
import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
}

export default function WrapperDriverRoutes({ routes }: Props) {
  const { t } = useTranslation();
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(routes);
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-10">Мои маршруты</h1>
      {routes.length === 0 ? (
        <p className="text-2xl font-bold mb-10">Нет доступных маршрутов.</p>
      ) : (
        <>
          <AvailableRoutes className="mb-10">
            <TableRoutes routes={availableRoutes} t={t} />
          </AvailableRoutes>
          <PastRoutes>
            <TableRoutes routes={pastRoutes} isRouteAgain={true} t={t} />
          </PastRoutes>
        </>
      )}
    </Container>
  );
}
