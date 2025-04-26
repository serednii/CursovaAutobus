import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { zodSchemaUpdateRouteIn } from "@/zod_shema/zodGetUpdateRoute";
import { IUpdateRoute } from "@/types/route-passenger.types";
import { FormValuesRoute } from "@/types/form.types";
import { UserSession } from "@/types/next-auth";
import { transformData } from "./transformData";
// import useStore from "@/zustand/createStore";
import busStore from "@/mobx/busStore";
import updateRouteById from "@/api/v1/updateRouteById";

const timeShowToast = Number(process.env.NEXT_PUBLIC_TIMEOUT_SHOW) || 3000;

export default function useSubmitOrder(
  routeId: number | undefined,
  sessionUser: UserSession | null
) {
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValuesRoute> = async (data) => {
    // const dataLayoutBus = useStore((state) => state.dataLayoutBus);
    if (!busStore.dataLayoutBus || !sessionUser || routeId === undefined) return;

    const updateRouteDriver: IUpdateRoute = transformData(
      routeId,
      data,
      busStore.dataLayoutBus,
      sessionUser
    );
    const updateRouteByIdParsed = zodSchemaUpdateRouteIn.parse(updateRouteDriver);

    try {
      const response = await updateRouteById<IUpdateRoute>(updateRouteByIdParsed);
      if (response) {
        toast.success("Your reservation has been successfully completed", {
          duration: timeShowToast,
        });
        await new Promise((resolve) => setTimeout(resolve, timeShowToast));
        router.push("/mybookings");
      } else {
        toast.error("Your reservation has not been completed", { duration: timeShowToast });
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("An error occurred while processing your request");
    }
  };

  return { onSubmit };
}
