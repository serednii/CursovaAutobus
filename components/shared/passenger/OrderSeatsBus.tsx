"use client";
import React, { useMemo, useRef } from "react";
import LayoutBus from "../layoutBus/LayuotBus";
import { Button } from "@mui/material";
import SubPassengersOrders from "../form/SubPassengersOrders/SubPassengersOrders";
import { useForm } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { RoleEnum } from "@/enum/shared.enums";
import { UserSession } from "@/types/next-auth";
import { IGetRouteSeatSelection } from "@/fetchFunctions/fetchGetRoutesById";
// import useBusLayoutData from "./useBusLayoutData";
import useSubmitOrder from "./useSubmitOrder";
// import { ILayoutData } from "@/types/layoutbus.types";
// import { NullableNumber } from "@/types/types";
// import useStore from "@/zustand/createStore";
import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";

// interface session {
//   user: UserSession;
//   expires: string;
// }
interface Props {
  route: IGetRouteSeatSelection | undefined;
  sessionUser: UserSession | null;
}

function OrderSeatsBus({ route, sessionUser }: Props) {
  // const setUserIdSession = useStore((state) => state.setUserIdSession);
  // const idOrderPassengers = useStore((state) => state.setUserIdSession);

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
  // let sessionUser: UserSession | null = null;
  const userSessionId: number = Number(sessionUser?.id);

  // const handleDataLayoutBus = useMemo(
  //   () => (data: ILayoutData) => {
  //     setDataLayoutBus(data);
  //     debouncedSetIdOrderPassengers(data, setIdOrderPassengers, userSessionId);
  //   },
  //   []
  // );

  // if (status === "authenticated") {
  //   sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  // }

  const { onSubmit } = useSubmitOrder(route?.id, sessionUser);

  // busStore.setUserIdSession(userSessionId);
  // useBusLayoutData(route);
  // console.log("iorderpassengers", idOrderPassengers);
  const myListPassengers = useMemo(() => route?.passengersSeatsList.find((obj) => obj.idPassenger === userSessionId), [route, userSessionId]);

  return (
    <>
      {/* <form> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <LayoutBus sessionUser={sessionUser} action={RoleEnum.PASSENGER} driverId={route?.driverId} />

        {busStore.idOrderPassengers && busStore.idOrderPassengers.length > 0 && (
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
          disabled={!(busStore.idOrderPassengers && busStore.idOrderPassengers.length > 0)} // Вимикає кнопку, якщо форма не валідна
        >
          Reserve seats
        </Button>
      </form>
      <p>
        RouteDriverId {route?.driverId} UserId {userSessionId}
      </p>
    </>
  );
}
export default observer(OrderSeatsBus);
