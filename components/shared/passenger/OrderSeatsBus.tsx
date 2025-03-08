"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutBus from "../layoutBus/LayuotBus";
import { ILayoutData } from "@/types/layoutbus.types";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import SubPassengersOrders from "../form/SubPassengersOrders/SubPassengersOrders";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISubPassengersList } from "@/types/interface";
import { FormValuesRoute, SubPassengerGroup } from "@/types/form.types";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { IUpdateRoute } from "@/types/route-passenger.types";
import { useRouter } from "next/navigation";
import fetchUpdateRouteById from "@/fetchFunctions/fetchUpdateRouteById";
import toast from "react-hot-toast";
import { UserSession } from "@/types/next-auth";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { zodSchemaUpdateRouteIn } from "@/zod_shema/zodGetUpdateRoute";
import { MyDialogInfo } from "@/components/ui/MyDialogInfo/MyDialogInfo";
import useBusLayoutData from "./useBusLayoutData";
import useSubmitOrder from "./useSubmitOrder";

interface Props {
  route: IGetRouteSeatSelection | null;
}
const timeShowToast = Number(process.env.NEXT_PUBLIC_TIMEOUT_SHOW) || 3000;

export default function OrderSeatsBus({ route }: Props) {
  const router = useRouter();
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
  const { onSubmit } = useSubmitOrder(route?.id, dataLayoutBus, sessionUser);

  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

  const userIdSession = Number(sessionUser?.id);

  const idOrderPassengers = dataLayoutBus && dataLayoutBus.passenger.filter((e) => e.passenger === userIdSession).map((e) => e.passenger);

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
