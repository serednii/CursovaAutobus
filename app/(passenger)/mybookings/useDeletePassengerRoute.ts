import { useState } from "react";
import { toast } from "react-hot-toast";
import fetchDeleteRoutePassenger from "@/fetchFunctions/fetchDeleteRoutePassenger";

import { GetRoutesByPassengerId } from "@/types/route-passenger.types";
import { getBusSeatsRaw } from "./action";

export const useDeletePassengerRoute = (
  routesPassenger: Omit<GetRoutesByPassengerId, "isReservation">[],
  passengerId: number | undefined,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [deleting, setDeleting] = useState(false);

  const removeRoutePassenger = async (routeId: number) => {
    if (!passengerId) return;
    setDeleting(true);

    try {
      const busSeatsRaw = getBusSeatsRaw(routesPassenger, routeId);
      const result = await fetchDeleteRoutePassenger({
        routeDriverId: routeId,
        idPassenger: passengerId,
        busSeats: busSeatsRaw,
      });

      if (!result) {
        toast.error("Error: Route not deleted");
      } else {
        toast.success("Route deleted", { duration: 3000 });
        setReload((prev) => !prev); // Виправлений рядок
      }
    } catch (error) {
      console.error("Error deleting route:", error);
      toast.error("Error deleting route");
    } finally {
      setDeleting(false);
    }
  };

  return { removeRoutePassenger, deleting };
};
