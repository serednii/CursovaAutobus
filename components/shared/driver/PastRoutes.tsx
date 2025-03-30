"use client";
import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { StringNullableChain } from "lodash";
import { useTranslation } from "react-i18next";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
  className?: string;
}

export default function PastRoutes({ routes, className }: Props) {
  const { t } = useTranslation("myroutes");
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">{t("past_routes")}</h2>
      <TableRoutes routes={routes} isRouteAgain={true} t={t} />
    </div>
  );
}
