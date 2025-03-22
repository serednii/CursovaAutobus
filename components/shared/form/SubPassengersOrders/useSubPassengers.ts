import { useEffect, useState } from "react";
import { UseFormUnregister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { FormValuesRoute, SubPassengerDetails } from "@/types/form.types";
import { NullableNumber } from "@/types/types";
import { ISubPassengersList } from "@/types/interface";
import { UserSession } from "@/types/next-auth";
import { RoleEnum } from "@/enum/shared.enums";
import useStore from "@/zustand/createStore";

interface UseSubPassengersProps {
  myListPassengers?: ISubPassengersList;
  renderRef: React.RefObject<number>;
  unregister: UseFormUnregister<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
  sessionUser?: UserSession | null;
  action: RoleEnum;
}

export function useSubPassengers({ myListPassengers, renderRef, unregister, action, sessionUser }: UseSubPassengersProps) {
  // const [subPassengers, setSubPassengers] = useState<SubPassengerDetails[]>([]);
  const idOrderPassengers = useStore((state) => state.idOrderPassengers);
  const subPassengers = useStore((state) => state.subPassengers);
  const setSubPassengers = useStore((state) => state.setSubPassengers);
  // const dataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!myListPassengers) renderRef.current = 4;

    if (myListPassengers && renderRef.current === 0) {
      renderRef.current++;
      setSubPassengers(myListPassengers.subPassengersList);
    } else if (renderRef.current > 2) {
      let updatedPassengers = [...subPassengers];

      // Очистка полів у react-hook-form
      // updatedPassengers.forEach((_, index) => {
      //   (["subFirstName", "subLastName", "subPhone", "subEmail"] as const).forEach((field) => {
      //     unregister(`${field}.${index}`);
      //   });
      // });

      // Додаємо нові поля, якщо потрібно
      const delta = idOrderPassengers.length - updatedPassengers.length;
      if (delta > 0) {
        for (let i = 0; i < delta; i++) {
          updatedPassengers.push({
            subFirstName: action === RoleEnum.DRIVER ? "RESERVATION DRIVER" : "",
            subLastName: action === RoleEnum.DRIVER ? "RESERVATION DRIVER" : "",
            subPhone: action === RoleEnum.DRIVER ? sessionUser?.phone || "" : "",
            subEmail: action === RoleEnum.DRIVER ? "RESERVATIONDRIVER@gmail.com" : "",
          });
        }
      } else {
        updatedPassengers = updatedPassengers.slice(0, idOrderPassengers.length);
      }

      setSubPassengers(updatedPassengers);
    }

    renderRef.current++;

    // }, [idOrderPassengers.length, myListPassengers]);
    // }, [idOrderPassengers.length, myListPassengers, action, renderRef, sessionUser?.phone, subPassengers, unregister]);
  }, [idOrderPassengers.length, myListPassengers, action, renderRef, sessionUser?.phone, unregister]);

  return { subPassengers, setSubPassengers };
}
