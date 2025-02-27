"use client";

import { useState, useMemo, useRef } from "react";
import { Button, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container } from "@/components/ui/Container";

import CustomDatePicker from "@/components/shared/form/dataPicker/CustomDatePicker";
import DynamicTextFields from "@/components/shared/form/DynamicTextFields";
import MaterialUISelect from "@/components/shared/form/MaterialUISelect";

import CustomTextField from "@/components/shared/form/CustomTextField";

import LayoutBus from "@/components/shared/layoutBus/LayuotBus";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { FormValues } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";

import { useSession } from "next-auth/react";

import "react-datepicker/dist/react-datepicker.css";
import { UserSession } from "@/types/next-auth";
import { transformData } from "./action";
import fetchCreateRoute from "@/fetchFunctions/fetchCreateRoute";
import { ISendDataBaseRouteDriver } from "@/types/route-driver.types";
import toast from "react-hot-toast";
import CheckboxOptionsDriver from "@/components/shared/form/CheckboxOptionsDriver";
import { ActionEnum } from "@/enum/shared.enums";
import SubPassengersOrders from "@/components/shared/form/SubPassengersOrders";
import { IGetPassengersSeatsList } from "@/types/generaty.types";
import { IPassengersSeatsList } from "@/types/interface";
import { cloneDeep } from "lodash";

export default function CreateRoute() {
  const { data: session, status } = useSession();
  const [indexSelectVariantBus, setIndexSelectVariantBus] = useState<number>(0);
  const [dataLayoutBus, setDataLayoutBus] = useState<ILayoutData | null | undefined>(null);
  const renderRef = useRef(0);

  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      wifi: true, // Початкове значення для чекбокса
      coffee: true,
      power: true,
      restRoom: true,
    },
  });

  // const [passengersSeatsList, setPassengersSeatsList] = useState<IPassengersSeatsList[]>([]);

  const sessionUser = status === "authenticated" ? (session?.user as UserSession) : null; // Присвоюємо значення session.user
  const userIdSession = Number(sessionUser?.id);
  const idOrderPassengers = dataLayoutBus?.passenger.filter((e) => e.passenger === userIdSession).map((e) => e.passenger);
  const passengersLength: number[] = useMemo(() => layoutsData.map((e) => e.passengerLength), []);

  console.log("watch watch", watch(), dataLayoutBus);
  // const myListPassengers = useMemo(() => passengersSeatsList.find((obj) => obj.idPassenger === userIdSession), [passengersSeatsList]);
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const createRouteDriver: ISendDataBaseRouteDriver = transformData(data, dataLayoutBus as ILayoutData, sessionUser as UserSession);

      const response = await fetchCreateRoute(createRouteDriver);

      if (!response) {
        throw new Error("No data received or an error occurred.");
      }

      toast.success("Your route has been successfully created", {
        duration: 5000,
      });
      reset();
      setDataLayoutBus(null);
      setIndexSelectVariantBus(0);
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Error creating route");
      throw err; // 🔥 ЦЕ ДОЗВОЛИТЬ Next.js ПЕРЕХОПИТИ ПОМИЛКУ!
    }
  };

  console.log(idOrderPassengers);
  // console.log(errors);

  const handleChangeVariantBus = (number: number) => {
    setIndexSelectVariantBus(number);
    setDataLayoutBus(cloneDeep(layoutsData[number]));
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <Container>
      <header className=" px-4 pt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl ">
        {/* Форму тепер обгортаємо в onSubmit */}
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

          <DynamicTextFields unregister={unregister} register={register} errors={errors} />

          <CustomTextField register={register} errors={errors} name={"busNumber"} title={"Bus Number"} className="mb-5" />

          <div>
            <h2>Bus Layout</h2>
            <MaterialUISelect
              passengersLength={passengersLength}
              handleChangeVariantBus={handleChangeVariantBus}
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
                action={ActionEnum.CREATEROUTEDRIVER}
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
              <Button variant="contained" color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // disabled={!isValid} // Вимикає кнопку, якщо форма не валідна
              >
                Create Route
              </Button>
            </div>
          </div>
        </form>
      </main>
      <div className="footer"></div>
    </Container>
  );
}
