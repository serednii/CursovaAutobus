"use client";

import { useState, useMemo, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { Container } from "@/components/ui/Container";
import CustomDatePicker from "@/components/shared/form/dataPicker/CustomDatePicker";
import IntermediateStops from "@/components/shared/form/IntermediateStops";
import MaterialUISelect from "@/components/shared/form/MaterialUISelect";
import CustomTextField from "@/components/shared/form/CustomTextField";
import layoutsData from "@/components/shared/layoutBus/LayoutData";
import CheckboxOptionsDriver from "@/components/shared/form/CheckboxOptionsDriver";
import SubPassengersOrders from "@/components/shared/form/SubPassengersOrders/SubPassengersOrders";

import { FormValuesRoute } from "@/types/form.types";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { RoleEnum } from "@/enum/shared.enums";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateValues } from "./useUpdateValues";
import { handleRouteSubmit } from "./handleRouteSubmit";
import LayoutBus from "@/components/shared/layoutBus/LayuotBus";
import { useFetchRoutesCity } from "./useFetchRoutesCity";

import { observer } from "mobx-react-lite";
import busStore from "@/mobx/busStore";
import { useGetListBlockedDate } from "./useGetListBlockedDate";
import { runInAction } from "mobx";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";
import { IGetRouteAgain, IGetRouteUpdate } from "@/fetchApi/v1/getRoutesById";
import { UserSession } from "@/types/next-auth";
import CustomNumberField from "@/components/shared/form/CustomNumberField";

export interface ISendDataBaseRouteDriverWidthId extends ISendDataBaseRouteDriver {
  id: number;
}

interface Props {
  id: number;
  type: string;
  route: IGetRouteUpdate | IGetRouteAgain | undefined;
  sessionUser: UserSession;
}

function CreateRouteForm({ id, type, sessionUser, route }: Props) {
  const renderRef = useRef(0);
  const [startStops, setStartStops] = useState<string[]>([]);
  const userSessionId = Number(sessionUser?.id);

  const { t } = useAppTranslation("createroute");
  const { t: form } = useAppTranslation("form");
  const idOrderPassenger = [...busStore.idOrderPassengers];
  const router = useRouter();
  console.log("CreateRouteForm.tsx renderRef.current", renderRef.current, idOrderPassenger);
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
    trigger,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
    criteriaMode: "all",
    // defaultValues: {
    //   wifi: true, // Початкове значення для чекбокса
    //   coffee: true,
    //   power: true,
    //   restRoom: true,
    // },
  });

  useMemo(() => {
    runInAction(() => {
      busStore.setUserIdSession(userSessionId);
      if (!route) {
        busStore.setDataLayoutBus(null, RoleEnum.DRIVER);
      }
    });
  }, [userSessionId, route]);

  useUpdateValues({
    id,
    type,
    route,
    setValue,
    setStartStops,
    // setIndexSelectVariantBus,
  });

  const { listBlockedDate } = useGetListBlockedDate({ driverId: userSessionId, id, type });

  const { departureFromCity, arrivalToCity } = useFetchRoutesCity();

  //Кількість пасажирів в кожному автобусі
  const passengersLength: number[] = useMemo(
    () => layoutsData(false).map((e) => e.passengerLength),
    []
  );

  return (
    <Container className=" bg-[#F9FAFB]">
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("route_management")}</h1>
          <p>{t("create_and_manage_your_bus_routes")}</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        <form onSubmit={handleSubmit(handleRouteSubmit(type, id, sessionUser, router))}>
          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomDatePicker
              title={form("departure_date")}
              name="departureDate"
              register={register}
              errors={errors}
              control={control}
              listBlockedDate={listBlockedDate}
            />
            <CustomDatePicker
              title={form("arrival_date")}
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
              title={form("departure_from")}
              className="grow"
            />
            <CustomTextField
              register={register}
              action="createRoute"
              setValue={setValue}
              listCity={arrivalToCity}
              errors={errors}
              name={"arrivalTo"}
              title={form("arrival_to")}
              className="grow"
            />
          </div>

          <IntermediateStops
            startStops={startStops}
            unregister={unregister}
            register={register}
            errors={errors}
          />

          <CustomTextField
            register={register}
            action="createRoute"
            errors={errors}
            name={"busNumber"}
            title={t("bus_number")}
            className="mb-5"
          />

          <div>
            <h2>{t("bus_layout")}</h2>
            <MaterialUISelect
              passengersLength={passengersLength}
              // handleChangeVariantBus={handleChangeVariantBus}
              register={register}
              errors={errors}
              // indexSelectVariantBus={indexSelectVariantBus}
              className="mb-5"
            />

            <LayoutBus
              sessionUser={sessionUser}
              action={RoleEnum.DRIVER}
              driverId={route?.driverId || 0}
            />
          </div>

          {busStore.idOrderPassengers && busStore.idOrderPassengers.length > 0 && (
            <SubPassengersOrders
              register={register}
              errors={errors}
              unregister={unregister}
              setValue={setValue}
              myListPassengers={undefined}
              renderRef={renderRef}
              watch={watch}
              sessionUser={sessionUser}
              action={RoleEnum.DRIVER}
            />
          )}

          <CustomNumberField
            register={register}
            action="createRoute"
            errors={errors}
            name={"routePrice"}
            title={t("route_price")}
            limit={999999999}
            trigger={trigger}
            className="mb-5"
          />

          <div className="flex justify-between items-center flex-wrap">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                {t("additional_options")}:
              </Typography>
              <CheckboxOptionsDriver register={register} watch={watch} />
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
      {/* <p>
        RouteDriverId {route?.driverId} UserId-- {sessionUser?.id}
      </p> */}
      <div className="footer"></div>
    </Container>
    // </CreateRouteContext.Provider>
  );
}
export default observer(CreateRouteForm);
