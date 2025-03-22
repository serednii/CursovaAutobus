"use client";
import React, { useEffect, useMemo, useRef } from "react";
import LayoutBus from "../layoutBus/LayuotBus";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import SubPassengersOrders from "../form/SubPassengersOrders/SubPassengersOrders";
import { useForm } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { UserSession } from "@/types/next-auth";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useBusLayoutData from "./useBusLayoutData";
import useSubmitOrder from "./useSubmitOrder";
import useStore from "@/zustand/createStore";
import { cloneDeep } from "lodash";
import { layoutsData } from "../layoutBus/LayoutData";
import { BusSeatInfo } from "@/types/layoutbus.types";

interface Props {
  route: IGetRouteSeatSelection | undefined;
}

export default function OrderSeatsBus({ route }: Props) {
  const cloneRoute = cloneDeep(route);
  const { data: session, status } = useSession();
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const setDataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);
  const renderRef = useRef(0);
  const counterRender = useRef(0);
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
    defaultValues: {
      wifi: true,
      coffee: true,
      power: true,
      restRoom: true,
    },
  });

  let sessionUser: UserSession | null = null;

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }
  console.log("route ordreBusSeats", cloneRoute);
  //В модель автобуса layoutsData добавляємо дані про пасажирів із маршруту route
  // useBusLayoutData(cloneDeep(route)); //cloneDeep(route);
  // const updateIdOrderPassengers = useStore((state) => state.updateIdOrderPassengers);

  //В модель автобуса layoutsData добавляємо дані про пасажирів із маршруту route
  useEffect(() => {
    if (cloneRoute && counterRender.current < 2) {
      counterRender.current++;
      // console.log("route", route);
      //Находимо модель автобуса яка використовується
      const filteredData = cloneDeep(layoutsData).find((item) => item.modelBus === cloneRoute.modelBus);
      console.log("filteredData", cloneRoute, filteredData);

      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      let transformData11: BusSeatInfo[] = [];
      cloneDeep(filteredData.passenger).forEach((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeat = cloneRoute.busSeats?.find((item) => item.number === number);
        findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus", findBusSeat);

        const findBusSeatStatus = {
          ...rest,
          number,
          busSeatStatus: findBusSeat?.busSeatStatus ?? busSeatStatus,
          passenger: findBusSeat?.passenger ?? e.passenger,
        };
        findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus +++++", findBusSeatStatus);
        transformData11.push(findBusSeatStatus);
      });

      // const transformData = cloneDeep(filteredData.passenger).map((e) => {
      //   const { number, busSeatStatus, ...rest } = e;
      //   const findBusSeat = cloneRoute.busSeats?.find((item) => item.number === number);
      //   findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus", findBusSeat);

      //   const findBusSeatStatus = {
      //     ...rest,
      //     number,
      //     busSeatStatus: findBusSeat?.busSeatStatus ?? busSeatStatus,
      //     passenger: findBusSeat?.passenger ?? e.passenger,
      //   };

      //   findBusSeat?.busSeatStatus === SeatStatusEnum.SELECTED && console.log("findBusSeatStatus +++++", findBusSeatStatus);

      //   return findBusSeatStatus;
      // });

      console.log("transformDatanew", transformData11);

      const filteredDataModified = { ...filteredData, passenger: transformData11 };
      console.log("transformData", filteredDataModified);

      setDataLayoutBus(filteredDataModified);
      setDataLayoutBusMap(filteredDataModified);
    }
  }, [cloneRoute, setDataLayoutBusMap, setDataLayoutBus, layoutsData]);
  const userIdSession = sessionUser?.id;

  console.log("userIdSession", userIdSession);

  const { onSubmit } = useSubmitOrder(cloneRoute?.id, sessionUser);
  const idOrderPassengers = useStore((state) => state.idOrderPassengers);
  const dataLayoutBusMap = useStore((state) => state.dataLayoutBusMap);
  const dataLayoutBus = useStore((state) => state.dataLayoutBus);

  const myListPassengers = useMemo(
    () => cloneRoute?.passengersSeatsList.find((obj) => obj.idPassenger === Number(userIdSession)),
    [cloneRoute, userIdSession]
  );

  console.log("idOderPassengers ----------- ----------- ", idOrderPassengers);
  console.log("myListPassengers ----------- ----------- ", myListPassengers);
  console.log("dataLayoutBusMap ----------- ----------- ", dataLayoutBusMap);
  console.log("dataLayoutBus ----------- ----------- ", dataLayoutBus);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LayoutBus sessionUser={sessionUser} action={RoleEnum.PASSENGER} driverId={cloneRoute?.driverId} userIdSession={Number(userIdSession)} />

        <SubPassengersOrders
          register={register}
          errors={errors}
          unregister={unregister}
          setValue={setValue}
          myListPassengers={myListPassengers}
          renderRef={renderRef}
          watch={watch}
          action={RoleEnum.PASSENGER}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!(idOrderPassengers && idOrderPassengers.length > 0)} // Вимикає кнопку, якщо форма не валідна
        >
          Reserve seats
        </Button>
      </form>
      <p>
        RouteDriverId {cloneRoute?.driverId} UserId {sessionUser?.id}
      </p>
    </>
  );
}
