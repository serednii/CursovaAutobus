"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";

import { Container } from "@/components/ui/Container";
import CustomDatePicker from "@/components/shared/form/dataPicker/CustomDatePicker";
import IntermediateStops from "@/components/shared/form/IntermediateStops";
import MaterialUISelect from "@/components/shared/form/MaterialUISelect";
import CustomTextField from "@/components/shared/form/CustomTextField";
import LayoutBus from "@/components/shared/layoutBus/LayuotBus";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import MyScaleLoader from "@/components/ui/MyScaleLoader";
import CheckboxOptionsDriver from "@/components/shared/form/CheckboxOptionsDriver";
import SubPassengersOrders from "@/components/shared/form/SubPassengersOrders";

import { FormValuesRoute } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { UserSession } from "@/types/next-auth";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { IGetRouteAgain, IGetRouteUpdate, IGetSearchRouteAgainOption, IGetSearchRouteUpdateOption } from "@/fetchFunctions/fetchGetRoutesById";
import { IBusSeats } from "@/types/interface";

import { handleChangeVariantBus, transformData, updateValues } from "./action";
import fetchCreateRoute from "@/fetchFunctions/fetchCreateRoute";
import { fetchGetRoutesByIdAgain, fetchGetRoutesByIdUpdate } from "@/fetchFunctions/fetchGetRoutesById";
import fetchUpdateRouteById from "@/fetchFunctions/fetchUpdateRouteById";
import { zodCreateRouteAll, zodUpdateRouteAll } from "@/zod_shema/zodBase";
import { selectRouteAgain, selectRouteUpdate } from "@/selectBooleanObjeckt/selectBooleanObjeckt";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

export interface ISendDataBaseRouteDriverWidthId extends ISendDataBaseRouteDriver {
  id: number;
}
const timeShowToast = Number(process.env.NEXT_PUBLIC_TIMEOUT_SHOW) || 3000;

export default function CreateRoute() {
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    reset,
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
  const [route, setRoute] = useState<IGetRouteUpdate | IGetRouteAgain | null>(null);
  const [startStops, setStartStops] = useState<string[]>([]);

  const renderRef = useRef(0);

  const id = params.id ? Number(params.id) : 0;
  const type = params.type ? params.type : "";
  const sessionUser = status === "authenticated" ? (session?.user as UserSession) : null;
  const userIdSession = Number(sessionUser?.id);

  console.log("CreateRoute params id", id, type, route);
  console.log("CreateRoute params watch", watch());

  const idOrderPassengers = useMemo(
    () =>
      dataLayoutBus?.passenger
        .filter((e) => e.passenger === userIdSession && e.busSeatStatus === SeatStatusEnum.RESERVEDEMPTY)
        .map((e) => e.passenger),
    [dataLayoutBus, userIdSession]
  );

  console.log("idiOrderPassengers", idOrderPassengers);
  //Кількість пасажирів в кожному автобусі
  const passengersLength: number[] = useMemo(() => layoutsData.map((e) => e.passengerLength), []);

  useEffect(() => {
    if (id !== 0) {
      if (type === "change") {
        fetchGetRoutesByIdUpdate<IGetSearchRouteUpdateOption, IGetRouteUpdate[]>([Number(id)], selectRouteUpdate).then(
          (result: IGetRouteUpdate[]) => {
            const res = result[0];
            updateValues<IGetRouteUpdate>(res, setValue, setStartStops, setDataLayoutBus, setIndexSelectVariantBus);
            setValue("departureDate", new Date(res.departureDate));
            setValue("arrivalDate", new Date(res.arrivalDate));
            setValue("wifi", res.wifi);
            setValue("coffee", res.coffee);
            setValue("power", res.power);
            setValue("restRoom", res.restRoom);
            setRoute(res);
          }
        );
      } else if (type === "again") {
        fetchGetRoutesByIdAgain<IGetSearchRouteAgainOption, IGetRouteAgain[]>([Number(id)], selectRouteAgain).then((result: IGetRouteAgain[]) => {
          const res = result[0];
          updateValues<IGetRouteAgain>(res, setValue, setStartStops, setDataLayoutBus, setIndexSelectVariantBus);
          setRoute(res);
        });
      }
    }
  }, [id, type]);

  console.log("idOrderPassengers", idOrderPassengers);

  const onSubmit: SubmitHandler<FormValuesRoute> = async (dataForm: FormValuesRoute) => {
    try {
      console.log("ISendDataBaseRouteDriverWidthId--------------", type, dataForm);
      const createRouteDriver: ISendDataBaseRouteDriver = transformData(dataForm, dataLayoutBus as ILayoutData, sessionUser as UserSession);
      const updateRouteByIdParsed = z.object(zodUpdateRouteAll).parse({ ...createRouteDriver, id });

      if (type === "change") {
        console.log("ISendDataBaseRouteDriverWidthId", { ...updateRouteByIdParsed, id });
        fetchUpdateRouteById<ISendDataBaseRouteDriverWidthId>({ ...updateRouteByIdParsed, id })
          .then(async (response) => {
            if (response) {
              toast.success("Your route has been successfully update", {
                duration: timeShowToast,
              });
              // setDataLayoutBus(null);
              // setIndexSelectVariantBus(null);
              // reset();
              await new Promise((resolve) => setTimeout(() => resolve(null), timeShowToast));
              router.push("/myroutes");
            } else {
              toast.error("Your reservation has not been completed", {
                duration: timeShowToast,
              });
            }
          })
          .catch((err) => console.error("Fetch failed:", err));
      } else {
        const updateRouteByIdParsed = z.object(zodCreateRouteAll).parse(createRouteDriver);
        const response = await fetchCreateRoute<ISendDataBaseRouteDriver>(updateRouteByIdParsed);

        if (!response) {
          toast.error("Error creating route or update route", {
            duration: timeShowToast,
          });
          return;
        }
        toast.success("Your route has been successfully created", {
          duration: timeShowToast,
        });
        // setDataLayoutBus(null);
        // setIndexSelectVariantBus(null);
        // reset();
        await new Promise((resolve) => setTimeout(() => resolve(null), timeShowToast));
        router.push("/myroutes");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Error creating route");
      throw err; // 🔥 ЦЕ ДОЗВОЛИТЬ Next.js ПЕРЕХОПИТИ ПОМИЛКУ!
    }
  };

  if (status === "loading") return <MyScaleLoader />;

  return (
    <Container className=" bg-[#F9FAFB]">
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        {/* Форму тепер обгортаємо в onSubmit */}
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TextField з react-hook-form */}

          {/* Додавання CustomDatePicker */}

          <div className="flex gap-5 mb-5 flex-wrap">
            <CustomDatePicker
              title="Departure Date"
              name="departureDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
            <CustomDatePicker
              title="Arrival Date"
              name="arrivalDate"
              register={register}
              errors={errors}
              watch={watch}
              control={control} // Передаємо control
            />
          </div>
          <div className="flex gap-5  mb-5 flex-wrap">
            <CustomTextField register={register} errors={errors} name={"departureFrom"} title={"Departure From"} className="grow" />
            <CustomTextField register={register} errors={errors} name={"arrivalTo"} title={"Arrival To"} className="grow" />
          </div>

          <IntermediateStops startStops={startStops} unregister={unregister} register={register} errors={errors} />

          <CustomTextField register={register} errors={errors} name={"busNumber"} title={"Bus Number"} className="mb-5" />

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
                className="flex justify-center"
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

          <CustomTextField register={register} errors={errors} name={"routePrice"} title={"Route Price"} className="mb-5" />

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
                disabled={!isValid} // Вимикає кнопку, якщо форма не валідна
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
