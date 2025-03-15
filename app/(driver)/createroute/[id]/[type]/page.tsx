"use client";

import { useState, useMemo, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { Container } from "@/components/ui/Container";
import CustomDatePicker from "@/components/shared/form/dataPicker/CustomDatePicker";
import IntermediateStops from "@/components/shared/form/IntermediateStops";
import MaterialUISelect from "@/components/shared/form/OOMaterialUISelect";
import CustomTextField from "@/components/shared/form/OOCustomTextField";
import { layoutsData } from "@/components/shared/layoutBus/OOLayoutData";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import CheckboxOptionsDriver from "@/components/shared/form/CheckboxOptionsDriver";
import SubPassengersOrders from "@/components/shared/form/SubPassengersOrders/SubPassengersOrders";

import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";

import { handleChangeVariantBus } from "./action";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { useFetchRoute } from "./useFetchRoute";
import { handleRouteSubmit } from "./handleRouteSubmit";
import LayoutBus from "@/components/shared/layoutBus/LayuotBus";
import { useFetchRoutesCity } from "./useFetchRoutesCity";
// import { cond } from "lodash";
// import { CreateRouteContext } from "./createRouteContext";

export interface ISendDataBaseRouteDriverWidthId extends ISendDataBaseRouteDriver {
  id: number;
}

export default function CreateRoute() {
  console.log("CreateRoute RENDER");
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

  const router = useRouter();
  const { data: session, status } = useSession();
  const params = useParams();

  const [indexSelectVariantBus, setIndexSelectVariantBus] = useState<number | null>(null);
  const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null | undefined>(null);
  const [startStops, setStartStops] = useState<string[]>([]);

  const renderRef = useRef(0);

  const id = params.id ? Number(params.id) : 0;
  const type = params.type ? params.type : "";
  const sessionUser = status === "authenticated" ? (session?.user as UserSession) : null;
  const userIdSession = Number(sessionUser?.id);
  const { departureFromCity, arrivalToCity } = useFetchRoutesCity();

  const idOrderPassengers = useMemo(
    () =>
      dataLayoutBus?.passenger
        .filter((e) => e.passenger === userIdSession && e.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY)
        .map((e) => e.passenger),
    [dataLayoutBus, userIdSession]
  );

  //Кількість пасажирів в кожному автобусі
  const passengersLength: number[] = useMemo(() => layoutsData.map((e) => e.passengerLength), []);

  const { route } = useFetchRoute({
    id,
    type,
    setValue,
    setStartStops,
    setDataLayoutBus,
    setIndexSelectVariantBus,
  });

  if (status === "loading") return <MyScaleLoader />;

  return (
    // <CreateRouteContext.Provider value={{ isLoadingOne: false, setIsLoadingOne: () => {} }}>
    <Container className=" bg-[#F9FAFB]">
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        <form onSubmit={handleSubmit(handleRouteSubmit(type, id, dataLayoutBus, sessionUser, router))}>
          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomDatePicker title="Departure Date" name="departureDate" register={register} errors={errors} control={control} />
            <CustomDatePicker title="Arrival Date" name="arrivalDate" register={register} errors={errors} watch={watch} control={control} />
          </div>
          <div className="flex gap-5  mb-5 flex-wrap">
            <CustomTextField
              register={register}
              action="createRoute"
              listCity={departureFromCity}
              setValue={setValue}
              errors={errors}
              name={"departureFrom"}
              title={"Departure From"}
              className="grow"
            />
            <CustomTextField
              register={register}
              action="createRoute"
              setValue={setValue}
              listCity={arrivalToCity}
              errors={errors}
              name={"arrivalTo"}
              title={"Arrival To"}
              className="grow"
            />
          </div>

          <IntermediateStops startStops={startStops} unregister={unregister} register={register} errors={errors} />

          <CustomTextField register={register} action="createRoute" errors={errors} name={"busNumber"} title={"Bus Number"} className="mb-5" />

          <div>
            <h2>Bus Layout</h2>
            <MaterialUISelect
              passengersLength={passengersLength}
              handleChangeVariantBus={(value) => handleChangeVariantBus(value, setDataLayoutBus, setIndexSelectVariantBus, undefined)}
              register={register}
              errors={errors}
              indexSelectVariantBus={indexSelectVariantBus}
              className="mb-5"
            />

            {dataLayoutBus && (
              <LayoutBus
                sessionUser={sessionUser}
                dataLayoutBus={dataLayoutBus}
                setDataLayoutBus={setDataLayoutBus}
                action={RoleEnum.DRIVER}
                driverId={route?.driverId || 0}
              />
            )}
          </div>

          {idOrderPassengers && idOrderPassengers.length > 0 && (
            <SubPassengersOrders
              register={register}
              errors={errors}
              unregister={unregister}
              setValue={setValue}
              myListPassengers={undefined}
              idOrderPassengers={idOrderPassengers}
              renderRef={renderRef}
              watch={watch}
              sessionUser={sessionUser}
              action={RoleEnum.DRIVER}
            />
          )}

          <CustomTextField register={register} action="createRoute" errors={errors} name={"routePrice"} title={"Route Price"} className="mb-5" />

          <div className="flex justify-between items-center flex-wrap">
            <div className="grow">
              <Typography variant="h6" gutterBottom>
                Additional options:
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
                {type === "change" ? "Update Route" : "Create Route"}
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
