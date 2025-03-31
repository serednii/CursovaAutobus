import React from "react";

// import MyScaleLoader from "@/components/ui/MyScaleLoader";
// import { useFetchPassengerRoutes } from "./useFetchPassengerRoutes";
// import { useDeletePassengerRoute } from "./useDeletePassengerRoute";
import fetchGetRoutesByPassengerId from "@/fetchFunctions/fetchGetRoutesByPassengerId";
import { selectMyBookings } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import WrapperPassengerRoutes from "@/components/shared/passenger/WrapperPassengerRoutes";

export default async function MyBookings({ params }: { params: { locale: string } }) {
  const { locale } = await params; // Використовуємо ?? для надійності
  const { resources } = await initTranslations(locale, ["mybookings", "myroutes", "form"]);

  const session = await getServerSession(authConfig);
  const userSessionId = Number(session?.user?.id);

  // const { routesPassenger, loading, userSessionId } = useFetchPassengerRoutes(reload);
  const routesPassenger = await fetchGetRoutesByPassengerId<typeof selectMyBookings>(userSessionId, selectMyBookings);
  // const { removeRoutePassenger } = useDeletePassengerRoute(routesPassenger, userSessionId, setReload);

  if (routesPassenger === null) return null;

  return (
    <TranslationsProvider namespaces={["mybookings", "myroutes", "form"]} locale={locale} resources={resources}>
      <WrapperPassengerRoutes routes={routesPassenger} userSessionId={userSessionId} />
    </TranslationsProvider>
  );
}

// id: 1,
// departureDate: '2025-05-11T19:30:00.000Z',
// arrivalDate: '2025-02-11T19:00:00.000Z',
// departureFrom: 'Houston',
// arrivalTo: 'San Antonio',
// seatsNumber: '1, 3, 4',
// routeTotalPrice: '$75',
// routePrice: '$25',
// busSeats:
// passengersSeatsList: undefined

//     id: number;
//     routePrice: string;
//     departureDate: string;
//     arrivalDate: string;
//     departureFrom: string;
//     arrivalTo: string;
//     busSeats: IBusSeats[];
//     passengersSeatsList: ISubPassengersList | undefined;
//     seatsNumber: string;
//     routeTotalPrice: string;
