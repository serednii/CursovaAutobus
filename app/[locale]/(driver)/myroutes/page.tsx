import React from "react";
import { Container } from "@mui/material";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import fetchGetRoutesByDriverId, { IRoutesByIdDriver, selectGetRoutesByDriverId } from "@/fetchFunctions/fetchGetRoutesByDriverId";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import WrapperDriverRoutes from "@/components/shared/driver/WrapperDriverRoutes";

export default async function MyRoutes({ params }: { params: { locale: string } }) {
  const { locale } = await params; // Використовуємо ?? для надійності
  const { resources } = await initTranslations(locale, ["myroutes", "form"]);
  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);
  const value = await fetchGetRoutesByDriverId.searchRoute([userSessionId], selectGetRoutesByDriverId, "getDriver");
  const routes = value as IRoutesByIdDriver[] | null;

  if (routes === null || routes.length === 0) return;

  return (
    <Container>
      <TranslationsProvider namespaces={["myroutes", "form"]} locale={locale} resources={resources}>
        <WrapperDriverRoutes routes={routes} />
      </TranslationsProvider>
    </Container>
  );
}
