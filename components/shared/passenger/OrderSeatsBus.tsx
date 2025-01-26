"use client";
import React, { useEffect, useState } from "react";
import LayoutBus from "../layoutBus/layuotBus";
import { UserSession } from "@/types/session.types";
import { ILayoutData, params } from "@/types/layoutbus.types";
import { useSession } from "next-auth/react";
import {
  IGetRoutePassengerById,
  ISendDataBaseRouteDriver,
} from "@/types/route-driver.types";
import { Button } from "@mui/material";
import SubPassengersOrders from "../form/SubPassengersOrders";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISubPassengersList } from "@/types/interface";
import { FormValues, ISubPassenger } from "@/types/form.types";
import { SeatStatusEnum } from "@/enum/shared.enums";
import {
  IUpdateRoute,
  IUpdateRouteWithId,
} from "@/types/route-passenger.types";
import { fetchUpdateRouteById } from "@/fetchFunctions/fetchroutes";

interface Props {
  layoutsData: ILayoutData[];
  route: IGetRoutePassengerById | null;
}

const transformData = (
  data: ISubPassenger,
  dataLayoutBus: ILayoutData,
  sessionUser: UserSession
): IUpdateRoute => {
  const busSeats = dataLayoutBus.passenger.map((e) => {
    if (e.busSeatStatus === SeatStatusEnum.SELECTED) {
      return {
        number: e.number,
        busSeatStatus: SeatStatusEnum.RESERVED,
        passenger: e.passenger,
      };
    } else {
      return { ...e };
    }
  });

  const passengersSeatsList: ISubPassengersList = {
    subPassengersList: [],
    idPassenger: 0,
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
    passengersSeatsList.idPassenger = Number(sessionUser?.id);
  }

  const updateRouteDriver: IUpdateRoute = {
    busSeats,
    bookedSeats: busSeats.filter(
      (e) => e.busSeatStatus === SeatStatusEnum.RESERVED
    ).length, //в дальнішому треба добавити дані для всіх пасажирів а для водія буде просто масив пасажирів
    passengersSeatsList: [passengersSeatsList],
  };

  return updateRouteDriver;
};

export default function OrderSeatsBus({ layoutsData, route }: Props) {
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      wifi: true, // Початкове значення для чекбокса
      coffee: true,
      power: true,
      restRoom: true,
    },
  });
  const { data: session, status } = useSession();
  const [dataLayoutBus, setDataLayoutBus] = useState<
    ILayoutData | null | undefined
  >(null);

  let sessionUser: UserSession | null = null;
  if (status === "authenticated") {
    sessionUser = session?.user as UserSession; // Присвоюємо значення session.user
  }

  console.log("DDDDDDDDDDD", sessionUser);
  console.log("dataLayoutBus++++++++++++++++", dataLayoutBus?.passenger);

  const userIdSession = Number(sessionUser?.id);

  const idOrderPassengers = dataLayoutBus?.passenger
    .filter((e) => e.passenger === userIdSession)
    .map((e) => e.passenger);

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

  // console.log("dataLayoutBus", dataLayoutBus);
  // console.log("route", route);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const createRouteDriver: IUpdateRoute = transformData(
      data,
      dataLayoutBus as ILayoutData,
      sessionUser as UserSession
    );

    const updateRoteDriver: IUpdateRouteWithId = {
      ...createRouteDriver,
      idRoute: Number(route?.id),
    };
    fetchUpdateRouteById(updateRoteDriver)
      .then((response) => {
        if (response) {
          console.log("Response:", response);
        } else {
          console.log("No data received or an error occurred.");
        }
      })
      .catch((err) => console.error("Fetch failed:", err));
    console.log(JSON.stringify(updateRoteDriver, null, 2));
    // reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {dataLayoutBus && (
        <LayoutBus
          sessionUser={sessionUser}
          className="flex justify-center"
          dataLayoutBus={dataLayoutBus}
          setDataLayoutBus={setDataLayoutBus}
        />
      )}
      {idOrderPassengers && idOrderPassengers.length > 0 && (
        <SubPassengersOrders
          register={register}
          errors={errors}
          unregister={unregister}
          idOrderPassengers={idOrderPassengers}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        // disabled={!isValid} // Вимикає кнопку, якщо форма не валідна
      >
        Update Route
      </Button>
    </form>
  );
}
