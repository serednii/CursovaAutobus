"use client";
import React, { useEffect, useState } from "react";
import LayoutBus from "../layoutBus/layuotBus";
import { UserSession } from "@/types/session.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { useSession } from "next-auth/react";
import { IGetRoutePassengerById } from "@/types/route-driver.types";

interface Props {
  layoutsData: ILayoutData[];
  route: IGetRoutePassengerById | null;
}

export default function OrderSeatsBus({ layoutsData, route }: Props) {
  const { data: session, status } = useSession();
  const [dataLayoutBus, setDataLayoutBus] = useState<
    ILayoutData | null | undefined
  >(null);
  console.log("-------------------------");

  let sessionUser: UserSession | null = null;

  useEffect(() => {
    if (route) {
      const [filteredData] = layoutsData.filter((item) => {
        console.log("item.modelBus", item.modelBus);
        return item.modelBus === route.modelBus;
      });
      console.log("filteredData", filteredData);
      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }
      const transformData = filteredData.passenger.map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeatStatus = route.busSeats.find(
          (item) => item.number === number
        );
        return {
          ...rest,
          number,
          busSeatStatus: findBusSeatStatus
            ? findBusSeatStatus.busSeatStatus
            : busSeatStatus,
          passenger: findBusSeatStatus ? findBusSeatStatus.passenger : null,
        };
      });

      const newData = { ...filteredData, passenger: transformData };

      setDataLayoutBus(newData);
    }
  }, [route, layoutsData]);

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

  console.log("dataLayoutBus", dataLayoutBus);
  console.log("route", route);

  return (
    <div>
      {dataLayoutBus && (
        <LayoutBus
          sessionUser={sessionUser}
          className="flex justify-center"
          dataLayoutBus={dataLayoutBus}
          setDataLayoutBus={setDataLayoutBus}
        />
      )}
    </div>
  );
}
