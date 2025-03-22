"use client";
import React, { useMemo, useRef } from "react";
import LayoutBus from "../layoutBus/LayuotBus";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import SubPassengersOrders from "../form/SubPassengersOrders/SubPassengersOrders";
import { useForm } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { RoleEnum } from "@/enum/shared.enums";
import { UserSession } from "@/types/next-auth";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import useBusLayoutData from "./useBusLayoutData";
import useSubmitOrder from "./useSubmitOrder";
import useStore from "@/zustand/createStore";

interface Props {
  route: IGetRouteSeatSelection | undefined;
}

export default function OrderSeatsBus({ route }: Props) {
  const { data: session, status } = useSession();
  const renderRef = useRef(0);
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
  //В модель автобуса layoutsData добавляємо дані про пасажирів із маршруту route
  useBusLayoutData(route);
  const userIdSession = sessionUser?.id;

  console.log("userIdSession", userIdSession);

  const { onSubmit } = useSubmitOrder(route?.id, sessionUser);
  const idOrderPassengers = useStore((state) => state.idOrderPassengers);
  const dataLayoutBusMap = useStore((state) => state.dataLayoutBusMap);
  const dataLayoutBus = useStore((state) => state.dataLayoutBus);

  const myListPassengers = useMemo(() => route?.passengersSeatsList.find((obj) => obj.idPassenger === Number(userIdSession)), [route, userIdSession]);

  console.log("idOderPassengers ----------- ----------- ", idOrderPassengers);
  console.log("myListPassengers ----------- ----------- ", myListPassengers);
  console.log("dataLayoutBusMap ----------- ----------- ", dataLayoutBusMap);
  console.log("dataLayoutBus ----------- ----------- ", dataLayoutBus);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LayoutBus sessionUser={sessionUser} action={RoleEnum.PASSENGER} driverId={route?.driverId} userIdSession={Number(userIdSession)} />

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
        RouteDriverId {route?.driverId} UserId {sessionUser?.id}
      </p>
    </>
  );
}
