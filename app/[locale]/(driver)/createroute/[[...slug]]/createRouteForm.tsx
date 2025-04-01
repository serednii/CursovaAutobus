"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
// import { useParams } from "next/navigation";

import { Container } from "@/components/ui/Container";
import CustomDatePicker from "@/components/shared/form/dataPicker/CustomDatePicker";
import IntermediateStops from "@/components/shared/form/IntermediateStops";
import MaterialUISelect from "@/components/shared/form/MaterialUISelect";
import CustomTextField from "@/components/shared/form/CustomTextField";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import CheckboxOptionsDriver from "@/components/shared/form/CheckboxOptionsDriver";
import SubPassengersOrders from "@/components/shared/form/SubPassengersOrders/SubPassengersOrders";

import { FormValuesRoute } from "@/types/form.types";
// import { ILayoutData } from "@/types/layoutbus.types";
// import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { RoleEnum } from "@/enum/shared.enums";

import { handleChangeVariantBus } from "./action";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchRoute } from "./useFetchRoute";
import { handleRouteSubmit } from "./handleRouteSubmit";
import LayoutBus from "@/components/shared/layoutBus/LayuotBus";
import { useFetchRoutesCity } from "./useFetchRoutesCity";
// import useStore from "@/zustand/createStore";

import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
import { useGetSessionParams } from "@/hooks/useGetSessionParams";
import { useGetListBlockedDate } from "./useGetListBlockedDate";
import { useTranslation } from "react-i18next";

export interface ISendDataBaseRouteDriverWidthId extends ISendDataBaseRouteDriver {
  id: number;
}

// export const debouncedSetIdOrderPassengers = debounce((data: ILayoutData, setIdOrderPassengers, userSessionId) => {
//   const idOrderPassengers = data.passenger
//     .filter((e) => e.passenger === userSessionId && e.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY)
//     .map((e) => e.passenger);
//   setIdOrderPassengers(idOrderPassengers);
// }, 800);
// const setUserIdSession = useStore((state) => state.setUserIdSession);
// const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
// const dataLayoutBus = useStore((state) => state.dataLayoutBus);
// const idOrderPassengers = useStore((state) => state.idOrderPassengers);

function CreateRouteForm({ id, type }: { id: number; type: string }) {
  const [indexSelectVariantBus, setIndexSelectVariantBus] = useState<number | null>(null);
  const [startStops, setStartStops] = useState<string[]>([]);
  const { t } = useTranslation();
  const router = useRouter();
  const renderRef = useRef(0);

  const { sessionUser, userSessionId, status } = useGetSessionParams();

  // console.log("CreateRoute RENDER", bears);
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
    defaultValues: {
      wifi: true, // Початкове значення для чекбокса
      coffee: true,
      power: true,
      restRoom: true,
    },
  });

  // const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null | undefined>(null);
  // const [idOrderPassengers, setIdOrderPassengers] = useState<NullableNumber[]>([]);

  useEffect(() => {
    busStore.setDataLayoutBus(null, RoleEnum.DRIVER);
  }, []);

  useEffect(() => {
    if (userSessionId) {
      busStore.setUserIdSession(userSessionId);
    }
  }, [userSessionId]);

  const { route } = useFetchRoute({
    id,
    type,
    setValue,
    setStartStops,
    setIndexSelectVariantBus,
  });

  const { listBlockedDate } = useGetListBlockedDate({ driverId: userSessionId, id, type });

  const { departureFromCity, arrivalToCity } = useFetchRoutesCity();

  // const handleDataLayoutBus = useMemo(
  //   () => (data: ILayoutData) => {
  //     setDataLayoutBus(data);
  //     debouncedSetIdOrderPassengers(data, setIdOrderPassengers, userSessionId);
  //   },
  //   []
  // );

  //Кількість пасажирів в кожному автобусі
  const passengersLength: number[] = useMemo(() => layoutsData.map((e) => e.passengerLength), []);

  if (status === "loading") return <MyScaleLoader />;

  return (
    // <CreateRouteContext.Provider value={{ isLoadingOne: false, setIsLoadingOne: () => {} }}>
    <Container className=" bg-[#F9FAFB]">
      <header className=" px-4 pt-4 mb-6">
        <div>
          {/* <h1 className="text-2xl font-bold">{t("route_management")}</h1>
          <p>{t("create_and_manage_your_bus_routes")}</p> */}
        </div>
      </header>

      {/* <h1>{t("title")}</h1> */}

      <main className="px-4 bg-[white] rounded-xl ">
        <form onSubmit={handleSubmit(handleRouteSubmit(type, id, busStore.dataLayoutBus, sessionUser, router))}>
          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomDatePicker
              title={t("form:departure_date")}
              name="departureDate"
              register={register}
              errors={errors}
              control={control}
              listBlockedDate={listBlockedDate}
            />
            <CustomDatePicker
              title={t("form:arrival_date")}
              name="arrivalDate"
              register={register}
              errors={errors}
              watch={watch}
              control={control}
              listBlockedDate={listBlockedDate}
            />
          </div>
          <div className="flex gap-5  mb-5 flex-wrap">
            <CustomTextField
              register={register}
              action="createRoute"
              listCity={departureFromCity}
              setValue={setValue}
              errors={errors}
              name={"departureFrom"}
              title={t("form:departure_from")}
              className="grow"
            />
            <CustomTextField
              register={register}
              action="createRoute"
              setValue={setValue}
              listCity={arrivalToCity}
              errors={errors}
              name={"arrivalTo"}
              title={t("form:arrival_to")}
              className="grow"
            />
          </div>

          <IntermediateStops startStops={startStops} unregister={unregister} register={register} errors={errors} t={t} />

          <CustomTextField register={register} action="createRoute" errors={errors} name={"busNumber"} title={t("bus_number")} className="mb-5" />

          <div>
            <h2>{t("bus_layout")}</h2>
            <MaterialUISelect
              passengersLength={passengersLength}
              handleChangeVariantBus={(value) => handleChangeVariantBus(value, setIndexSelectVariantBus, undefined)}
              register={register}
              errors={errors}
              indexSelectVariantBus={indexSelectVariantBus}
              t={t}
              className="mb-5"
            />

            {/* {dataLayoutBus && ( */}
            <LayoutBus
              sessionUser={sessionUser}
              // dataLayoutBus={dataLayoutBus}
              // handleDataLayoutBus={handleDataLayoutBus}
              action={RoleEnum.DRIVER}
              driverId={route?.driverId || 0}
            />
            {/* )} */}
          </div>

          {busStore.idOrderPassengers && busStore.idOrderPassengers.length > 0 && (
            <SubPassengersOrders
              register={register}
              errors={errors}
              unregister={unregister}
              setValue={setValue}
              myListPassengers={undefined}
              // idOrderPassengers={idOrderPassengers}
              renderRef={renderRef}
              watch={watch}
              sessionUser={sessionUser}
              action={RoleEnum.DRIVER}
              t={t}
            />
          )}

          <CustomTextField register={register} action="createRoute" errors={errors} name={"routePrice"} title={t("route_price")} className="mb-5" />

          <div className="flex justify-between items-center flex-wrap">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                {t("additional_options")}:
              </Typography>
              <CheckboxOptionsDriver register={register} watch={watch} t={t} />
            </div>
            <div className="flex justify-end items-center gap-5 grow">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                {type === "change" ? t("update_route") : t("create_route")}
              </Button>
            </div>
          </div>
        </form>
      </main>
      <p>
        RouteDriverId {route?.driverId} UserId-- {sessionUser?.id}
      </p>
      <div className="footer"></div>
    </Container>
    // </CreateRouteContext.Provider>
  );
}
export default observer(CreateRouteForm);

//   const IGetRouteUpdate: {
//     routePrice: number;
//     busSeats: IBusSeats[];
//     driverId: number;
//     selectBusLayout: string;
//     departureDate: string;
//     arrivalDate: string;
//     wifi: boolean;
//     coffee: boolean;
//     power: boolean;
//     restRoom: boolean;
//     departureFrom: string;
//     arrivalTo: string;
//     id: number;
//     modelBus: string;
//     passengersSeatsList: IPassengersSeatsList[];
//     bookedSeats: number;
//     maxSeats: number;
//     intermediateStops: IIntermediateStops[];
// }

//   const IGetRouteAgain: {
//     routePrice: number;
//     driverId: number;
//     departureFrom: string;
//     arrivalTo: string;
//     modelBus: string;
//     intermediateStops: IIntermediateStops[];
// }

// const FormValuesRoute: {
//   intermediateStops: string[];
//   busNumber: string;
//   routePrice: string;
//   busSeats: any;
//   driverId: number;
//   selectBusLayout: string;
//   subFirstName: string[] | undefined;
//   subLastName: string[] | undefined;
//   subPhone: string[] | undefined;
//   subEmail: string[] | undefined;
//   departureDate: Date;
//   arrivalDate: Date;
//   wifi: boolean;
//   coffee: boolean;
//   power: boolean;
//   restRoom: boolean;
//   departureFrom: string;
//   arrivalTo: string;
// }

// const exampleRote = {
//   arrivalDate: " Fri Mar 14 2025 20:00:00 GMT+0100 (Центральная Европа, стандартное время)",
//   arrivalTo: "Львів",
//   busNumber: "33456",
//   coffee: true,
//   departureDate: "Fri Mar 07 2025 20:15:00 GMT+0100 (Центральная Европа, стандартное время) ",
//   departureFrom: "New York",
//   intermediateStops: ["stop1", "stop2"],
//   power: true,
//   restRoom: false,
//   routePrice: "456",
//   selectBusLayout: 0,
//   subEmail?: ["RESERVATIONDRIVER@gmail.com", "RESERVATIONDRIVER@gmail.com"],
//   subFirstName?: ["RESERVATION DRIVER", "RESERVATION DRIVER"],
//   subLastName?: ["RESERVATION DRIVER", "RESERVATION DRIVER"],
//   subPhone?: ["476757575700", "476757575700"],
//   wifi: false,
// };
