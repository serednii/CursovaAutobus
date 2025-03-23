"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { ILayoutData } from "@/types/layoutbus.types";
import { NullableNumber } from "@/types/types";
import useStore from "@/zustand/createStore";

interface Props {
  route: IGetRouteSeatSelection | undefined;
}

export default function OrderSeatsBus({ route }: Props) {
  const { data: session, status } = useSession();
  const setUserIdSession = useStore((state) => state.setUserIdSession);
  const idOrderPassengers = useStore((state) => state.setUserIdSession);

  // const dataLayoutBus = useStore((state) => state.dataLayoutBus);
  // const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null>(null);
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
  // const [idOrderPassengers, setIdOrderPassengers] = useState<NullableNumber[]>([]);

  // const handleDataLayoutBus = useMemo(
  //   () => (data: ILayoutData) => {
  //     setDataLayoutBus(data);
  //     debouncedSetIdOrderPassengers(data, setIdOrderPassengers, userIdSession);
  //   },
  //   []
  // );

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

  // const { onSubmit } = useSubmitOrder(route?.id, sessionUser);

  const userIdSession = Number(sessionUser?.id);
  setUserIdSession(userIdSession);
  useBusLayoutData(route);
  // console.log("iorderpassengers", idOrderPassengers);
  const myListPassengers = useMemo(() => route?.passengersSeatsList.find((obj) => obj.idPassenger === userIdSession), [route, userIdSession]);

  return (
    <>
      <form>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}

        <LayoutBus sessionUser={sessionUser} action={RoleEnum.PASSENGER} driverId={route?.driverId} />

        {idOrderPassengers && idOrderPassengers.length > 0 && (
          <SubPassengersOrders
            register={register}
            errors={errors}
            unregister={unregister}
            setValue={setValue}
            myListPassengers={myListPassengers}
            // idOrderPassengers={idOrderPassengers.slice(1)}
            renderRef={renderRef}
            watch={watch}
            action={RoleEnum.PASSENGER}
          />
        )}

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
