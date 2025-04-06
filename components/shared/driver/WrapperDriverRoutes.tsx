"use client";
import AvailableRoutes from "@/components/AvailableRoutes";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import PastRoutes from "@/components/PastRoutes";
import { Container } from "@/components/ui/Container";
import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
// import { useTranslation } from "react-i18next";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
}

export default function WrapperDriverRoutes({ routes }: Props) {
  // ["myroutes", "form"])
  const { t } = useAppTranslation("myroutes");
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(routes);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-10">{t("my_routes")}</h1>
      {routes.length === 0 ? (
        <p className="text-2xl font-bold mb-10">{t("there_are_no_available_routes")}</p>
      ) : (
        <>
          <AvailableRoutes className="mb-10">
            <TableRoutes routes={availableRoutes} />
          </AvailableRoutes>
          <PastRoutes>
            <TableRoutes routes={pastRoutes} isRouteAgain={true} />
          </PastRoutes>
        </>
      )}
    </Container>
  );
}
