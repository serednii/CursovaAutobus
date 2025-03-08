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

interface Props {
  route: IGetRouteSeatSelection | null;
}
const timeShowToast = Number(process.env.NEXT_PUBLIC_TIMEOUT_SHOW) || 3000;

const transformData = (id: number, data: SubPassengerGroup, dataLayoutBus: ILayoutData, sessionUser: UserSession): IUpdateRoute => {
  //change status selected to reserved
  const busSeats = dataLayoutBus.passenger.map((e) => {
    return {
      ...e,
      busSeatStatus: e.busSeatStatus === SeatStatusEnum.SELECTED ? SeatStatusEnum.RESERVED : e.busSeatStatus,
    };
  });
  // console.log("sessioUser", sessionUser);

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: Number(sessionUser?.id),
  };

  if (
    data.subFirstName &&
    data.subLastName &&
    data.subPhone &&
    data.subEmail &&
    Array.isArray(data.subFirstName) &&
    Array.isArray(data.subLastName) &&
    Array.isArray(data.subPhone) &&
    Array.isArray(data.subEmail) &&
    data.subFirstName.length === data.subLastName.length &&
    data.subLastName.length === data.subPhone.length &&
    data.subPhone.length === data.subEmail.length
  ) {
    const subPassengersList = data.subFirstName.map((_, index) => ({
      subFirstName: data.subFirstName ? data.subFirstName[index] : "",
      subLastName: data.subLastName ? data.subLastName[index] : "",
      subPhone: data.subPhone ? data.subPhone[index] : "",
      subEmail: data.subEmail ? data.subEmail[index] : "",
    }));
    passengersSeatsList.subPassengersList = subPassengersList;
  }

  const updateRouteDriver: IUpdateRoute = {
    id,
    busSeats,
    bookedSeats: busSeats.filter((e) => e.busSeatStatus === SeatStatusEnum.RESERVED).length, //в дальнішому треба добавити дані для всіх пасажирів а для водія буде просто масив пасажирів
    passengersSeatsList: [passengersSeatsList],
  };

  return updateRouteDriver;
};

export default function OrderSeatsBus({ route }: Props) {
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();
  // const [myListPassengers, setMyListPassengers] = useState<ISubPassengersList | undefined>();
  const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null>(null);
  // const counterRef = React.useRef(0);
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

  const userIdSession = Number(sessionUser?.id);
  const idOrderPassengers = dataLayoutBus && dataLayoutBus.passenger.filter((e) => e.passenger === userIdSession).map((e) => e.passenger);

  const myListPassengers = useMemo(() => route?.passengersSeatsList.find((obj) => obj.idPassenger === userIdSession), [route, userIdSession]);

  console.log("OrderSeatsBus myListPassenger", myListPassengers);

  useEffect(() => {
    if (route) {
      const [filteredData] = layoutsData.filter((item) => {
        return item.modelBus === route.modelBus;
      });
      //Якщо моделі автобуса незнайдено
      if (!filteredData) {
        console.error("Name Bus not found in layoutsData");
        throw new Error("Name Bus not found in layoutsData");
      }

      const transformData = filteredData.passenger.map((e) => {
        const { number, busSeatStatus, ...rest } = e;
        const findBusSeatStatus = route?.busSeats?.find((item) => item.number === number);
        return {
          ...rest,
          number,
          busSeatStatus: findBusSeatStatus ? findBusSeatStatus.busSeatStatus : busSeatStatus,
          passenger: findBusSeatStatus ? findBusSeatStatus.passenger : null,
        };
      });

      const newData = { ...filteredData, passenger: transformData };
      console.log("transformData ************************** ----", transformData);

      setDataLayoutBus(newData);
    }
  }, [route]);

  const onSubmit: SubmitHandler<FormValuesRoute> = async (data: FormValuesRoute) => {
    if (!dataLayoutBus || !sessionUser) return;

    const updateRoteDriver: IUpdateRoute = transformData(Number(route?.id), data, dataLayoutBus, sessionUser);
    const updateRouteByIdParsed = zodSchemaUpdateRouteIn.parse(updateRoteDriver);
    console.log("OrderSeatsBus  ----  updateRoteDriver", updateRoteDriver);

    fetchUpdateRouteById<IUpdateRoute>(updateRouteByIdParsed)
      .then(async (response) => {
        if (response) {
          // setOpen(true);
          toast.success("Your reservation has been successfully completed", {
            duration: timeShowToast,
          });
          await new Promise((resolve) => setTimeout(() => resolve(null), timeShowToast));
          router.push("/mybookings");
        } else {
          console.log("No data received or an error occurred.");
          toast.error("Your reservation has not been completed", {
            duration: timeShowToast,
          });
        }
      })
      .catch((err) => console.error("Fetch failed:", err));
  };

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
