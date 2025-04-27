import { useState } from "react";
import { toast } from "react-hot-toast";
import deleteRoutePassenger from "@/fetchApi/v1/deleteRoutePassenger";

import { IRoutesTable } from "@/types/route-passenger.types";
import { getBusSeatsRaw } from "./action";
import { useRouter } from "next/navigation";

export const useDeletePassengerRoute = (
  routesPassenger: Omit<IRoutesTable, "isReservation">[],
  passengerId: number | undefined
) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const removeRoutePassenger = async (routeId: number) => {
    if (!passengerId) return;
    setDeleting(true);

    try {
      const busSeatsRaw = getBusSeatsRaw(routesPassenger, routeId);
      console.log("routeDriverId", routeId, "idPassenger", passengerId, "busSeats", busSeatsRaw);
      const result = await deleteRoutePassenger({
        routeDriverId: routeId,
        idPassenger: passengerId,
        busSeats: busSeatsRaw,
      });

      if (!result) {
        toast.error("Error: Route not deleted");
      } else {
        toast.success("Route deleted", { duration: 3000 });
        router.refresh();
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
