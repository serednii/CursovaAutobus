"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutBus from "../../../../../components/shared/layoutBus/LayuotBus";
import { Button } from "@mui/material";
import SubPassengersOrders from "../../../../../components/shared/form/SubPassengersOrders/SubPassengersOrders";
import { useForm } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { RoleEnum } from "@/enum/shared.enums";
import { UserSession } from "@/types/next-auth";
import { IGetRouteSeatSelection } from "@/fetchApi/v1/getRoutesById";
import useSubmitOrder from "../../../../../components/shared/passenger/useSubmitOrder";
import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
import { ILayoutData } from "@/types/layoutbus.types";
import { runInAction } from "mobx";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

interface Props {
  route: IGetRouteSeatSelection | undefined;
  sessionUser: UserSession | null;
  newData: ILayoutData | null;
}

// "seatselection", "form"]);
function OrderSeatsBus({ route, sessionUser, newData }: Props) {
  const { t } = useAppTranslation("seatselection");
  const [fixedOnDisable, setFixedOnDisable] = useState(false);
  // console.log("OrderSeatsBus newData", newData, route, sessionUser);
  const renderRef = useRef(0);
  const [isFirstOrder, setIsFirstOrder] = useState(false);
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

  useEffect(() => {
    if (busStore.idOrderSubPassengers.length > 0 || busStore.idOrderPassengers.length > 0) {
      setFixedOnDisable(true);
    }
  }, [
    fixedOnDisable,
    setFixedOnDisable,
    busStore.idOrderSubPassengers,
    busStore.idOrderPassengers.length,
  ]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (busStore.idOrderPassengers.length > 0) {
        setIsFirstOrder(true);
      }
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  const userSessionId: number = Number(sessionUser?.id);
  // console.log(
  //   "newData +++++++++++++++ ",
  //   newData,
  //   busStore.dataLayoutBus,
  //   [...busStore.idOrderSubPassengers],
  //   [...busStore.idOrderPassengers]
  // );

  useMemo(() => {
    runInAction(() => {
      busStore.setDataLayoutBus(newData, RoleEnum.PASSENGER);
      busStore.setUserIdSession(userSessionId);
    });
  }, [route, userSessionId]);

  const { onSubmit } = useSubmitOrder(route?.id, sessionUser);

  const myListPassengers = useMemo(
    () => route?.passengersSeatsList.find((obj) => obj.idPassenger === userSessionId),
    [route, userSessionId]
  );

  console.log("mylistpassengers------", route, myListPassengers);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LayoutBus
          sessionUser={sessionUser}
          action={RoleEnum.PASSENGER}
          driverId={route?.driverId || 0}
          className="mb-3"
        />

        {busStore.idOrderSubPassengers && busStore.idOrderSubPassengers.length > 0 && (
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
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={
            isFirstOrder
              ? !fixedOnDisable
              : !(busStore.idOrderPassengers && busStore.idOrderPassengers.length > 0)
          } // Вимикає кнопку, якщо форма не валідна
        >
          {t("reserved_seats")}
        </Button>
      </form>
      <p>
        RouteDriverId {route?.driverId} UserId {userSessionId}
      </p>
    </>
  );
}
export default observer(OrderSeatsBus);
