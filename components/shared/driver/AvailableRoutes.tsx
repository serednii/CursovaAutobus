"use client";
import { IRoutesByIdDriver } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { useTranslation } from "react-i18next";
import TableRoutes from "./TableRoutes";

interface Props {
  routes: IRoutesByIdDriver[];
  className?: string;
  title: string;
}

export default function AvailableRoutes({ routes, className }: Props) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">{t("available_routes")}</h2>
      <TableRoutes routes={routes} t={t} />
    </div>
  );
}
