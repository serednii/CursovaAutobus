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

interface Props {
  route: IGetRouteSeatSelection | undefined;
}

export default function OrderSeatsBus({ route }: Props) {
  const { data: session, status } = useSession();
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
  const { dataLayoutBus, setDataLayoutBus } = useBusLayoutData(route);
  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }
  const { onSubmit } = useSubmitOrder(route?.id, dataLayoutBus, sessionUser);

  const userIdSession = Number(sessionUser?.id);

  const idOrderPassengers = dataLayoutBus && dataLayoutBus.passenger.filter((e) => e.passenger === userIdSession).map((e) => e.passenger);
  console.log("iorderpassengers", idOrderPassengers);
  const myListPassengers = useMemo(() => route?.passengersSeatsList.find((obj) => obj.idPassenger === userIdSession), [route, userIdSession]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dataLayoutBus && (
          <LayoutBus
            sessionUser={sessionUser}
            className="flex justify-center"
            dataLayoutBus={dataLayoutBus}
            setDataLayoutBus={setDataLayoutBus}
            action={RoleEnum.PASSENGER}
            driverId={route?.driverId}
          />
        )}

        {idOrderPassengers && idOrderPassengers.length > 0 && (
          <SubPassengersOrders
            register={register}
            errors={errors}
            unregister={unregister}
            setValue={setValue}
            myListPassengers={myListPassengers}
            idOrderPassengers={idOrderPassengers.slice(1)}
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
