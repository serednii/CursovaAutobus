// "use client";

import React from "react";
import { Container } from "@mui/material";
import AvailableRoutes from "@/components/shared/driver/AvailableRoutes";
import PastRotes from "@/components/shared/driver/PastRoutes";
import { getPastRoutesAndAvailableRoutes } from "@/lib/utils";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import fetchGetRoutesByDriverId, { IRoutesByIdDriver, selectGetRoutesByDriverId } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";

export default async function MyRoutes({ params }: { params: { locale: string } }) {
  const { locale } = await params; // Використовуємо ?? для надійності
  const { t, resources } = await initTranslations(locale, ["myroutes", "form"]);
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  const value = await fetchGetRoutesByDriverId.searchRoute([userSessionId], selectGetRoutesByDriverId, "getDriver");
  const routes = value as IRoutesByIdDriver[] | null;
  if (routes === null || routes.length === 0) return;

  const { pastRoutes, availableRoutes } = getPastRoutesAndAvailableRoutes(routes);

  return (
    <Container>
      <TranslationsProvider namespaces={["myroutes", "form"]} locale={locale} resources={resources}>
        <h1 className="text-2xl font-bold mb-10">Мои маршруты</h1>
        {routes.length === 0 ? (
          <p className="text-2xl font-bold mb-10">Нет доступных маршрутов.</p>
        ) : (
          <>
            <AvailableRoutes className="mb-10" routes={availableRoutes} title={t("available_routes")} />
            <PastRotes routes={pastRoutes} />
          </>
        )}
      </TranslationsProvider>
    </Container>
  );
}
