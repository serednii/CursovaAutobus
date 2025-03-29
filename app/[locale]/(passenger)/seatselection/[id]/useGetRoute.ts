"use client";
import { useEffect, useState } from "react";
import { fetchGetRoutesById, IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { SeatStatusEnum } from "@/enum/shared.enums";
import { selectSeatSelection } from "@/selectBooleanObjeckt/selectBooleanObjeckt";

function useGetRoute({ userSessionId, id }: { userSessionId: number; id: number }) {
  const [route, setRoute] = useState<IGetRouteSeatSelection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !userSessionId) return;
    const getRouteById = async () => {
      try {
        const routeArray = await fetchGetRoutesById.searchRoute([id], selectSeatSelection, "seatSelection");
        const routes = routeArray as IGetRouteSeatSelection[] | null;
        const fetchedRoute = routes?.[0] || null;

        if (fetchedRoute && fetchedRoute.busSeats) {
          const updatedPassengers = fetchedRoute.busSeats.map((seat) =>
            seat.passenger === userSessionId && seat.busSeatStatus === SeatStatusEnum.RESERVED
              ? { ...seat, busSeatStatus: SeatStatusEnum.SELECTED }
              : seat
          );
          fetchedRoute.busSeats = updatedPassengers;
        }

        setRoute(fetchedRoute);
      } catch (error) {
        console.error("Error fetching route:", error);
      } finally {
        setLoading(false);
      }
    };

    getRouteById();
  }, [id, userSessionId]);

  return { route, setRoute, loading, setLoading };
}

export default useGetRoute;
