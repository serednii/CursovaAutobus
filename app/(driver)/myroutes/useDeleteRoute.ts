import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import fetchDeleteRouteById from "@/fetchFunctions/fetchDeleteRouteById";

export const useDeleteRoute = () => {
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (!routeToDelete) return;

    const deleteRoute = async () => {
      try {
        const data = await fetchDeleteRouteById(routeToDelete);
        if ("message" in data) {
          toast.success("Your route has been successfully deleted", { duration: 5000 });
        } else {
          toast.error("Your route has not been deleted", { duration: 5000 });
        }
      } catch (error) {
        console.error("Ошибка при удалении маршрута:", error);
        toast.error("Error deleting route");
      } finally {
        setRouteToDelete(null);
      }
    };

    deleteRoute();
  }, [routeToDelete]);

  return setRouteToDelete;
};
