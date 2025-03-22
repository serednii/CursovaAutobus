import { SubmitHandler, UseFormWatch } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import fetchCreateRoute from "@/fetchFunctions/fetchCreateRoute";
import fetchUpdateRouteById from "@/fetchFunctions/fetchUpdateRouteById";
import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { zodCreateRouteAll, zodUpdateRouteAll } from "@/zod_shema/zodBase";
import { delay } from "@/lib/utils";
import { transformData } from "./action";

export interface ISendDataBaseRouteDriverWidthId extends ISendDataBaseRouteDriver {
  id: number;
}

const timeShowToast = Number(process.env.NEXT_PUBLIC_TIMEOUT_SHOW) || 3000;

export const handleRouteSubmit =
  (
    // watch: UseFormWatch<FormValuesRoute>,
    type: string | string[],
    id: number,
    dataLayoutBus: ILayoutData | null | undefined,
    sessionUser: UserSession | null,
    router: ReturnType<typeof useRouter>
  ): SubmitHandler<FormValuesRoute> =>
  async (dataForm) => {
    try {
      console.log("Submitting Route Data:", type, dataForm);
      const createRouteDriver: ISendDataBaseRouteDriver = transformData(dataForm, dataLayoutBus as ILayoutData, sessionUser as UserSession);
      console.log("createRouteDriver", createRouteDriver);
      if (type === "change") {
        await handleUpdateRoute(createRouteDriver, id, router);
      } else {
        await handleCreateRoute(createRouteDriver, router);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Error creating route");
      throw err;
    }
  };

// 🔹 Функція для оновлення маршруту
const handleUpdateRoute = async (routeData: ISendDataBaseRouteDriver, id: number, router: ReturnType<typeof useRouter>) => {
  console.log("Updating Route:", { ...routeData, id });
  const parsedData = z.object(zodUpdateRouteAll).parse({ ...routeData, id });

  try {
    console.log("Updating Route:", { ...parsedData, id });
    const response = await fetchUpdateRouteById<ISendDataBaseRouteDriverWidthId>({ ...parsedData, id });

    if (!response) {
      toast.error("Your reservation has not been completed", { duration: timeShowToast });
      return;
    }

    toast.success("Your route has been successfully updated", { duration: timeShowToast });
    await delay(timeShowToast);
    router.push("/myroutes");
  } catch (err) {
    console.error("Fetch failed:", err);
    toast.error("Failed to update route");
  }
};

// 🔹 Функція для створення маршруту
const handleCreateRoute = async (routeData: ISendDataBaseRouteDriver, router: ReturnType<typeof useRouter>) => {
  const parsedData = z.object(zodCreateRouteAll).parse(routeData);

  try {
    const response = await fetchCreateRoute<ISendDataBaseRouteDriver>(parsedData);

    if (!response) {
      toast.error("Error creating route", { duration: timeShowToast });
      return;
    }

    toast.success("Your route has been successfully created", { duration: timeShowToast });
    await delay(timeShowToast);
    router.push("/myroutes");
  } catch (err) {
    console.error("Fetch failed:", err);
    toast.error("Failed to create route");
  }
};
