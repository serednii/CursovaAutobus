import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import deleteRouteById from "@/fetchApi/v1/deleteRoute";

export const useDeleteRoute = () => {
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!routeToDelete) return;

    const deleteRoute = async () => {
      try {
        const data = await deleteRouteById(routeToDelete);
        if ("message" in data) {
          toast.success("Your route has been successfully deleted", { duration: 5000 });
          router.refresh();
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
