"use client";
import AvailableRoutes from "@/components/AvailableRoutes";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import PastRoutes from "@/components/PastRoutes";
import { IRoutesByIdDriver } from "@/fetchApi/v1/getRoutes";

import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import TableRoutes from "../../../../components/shared/driver/TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
}

export default function WrapperDriverRoutes({ routes }: Props) {
  // ["myroutes", "form"])
  const { t } = useAppTranslation("myroutes");
  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(routes);

  return (
    <div className="bg-[#F9FAFB] px-1 sm:px-2 md:px-4">
      <h1 className="text-2xl font-bold mb-10">{t("my_routes")}</h1>
      {routes.length === 0 ? (
        <p className="text-2xl font-bold mb-10">{t("there_are_no_available_routes")}</p>
      ) : (
        <>
          <AvailableRoutes className="mb-10">
            <TableRoutes routes={availableRoutes} />
          </AvailableRoutes>
          {pastRoutes.length > 0 && (
            <PastRoutes>
              <TableRoutes routes={pastRoutes} isRouteAgain={true} />
            </PastRoutes>
          )}
        </>
      )}
    </div>
  );
}
