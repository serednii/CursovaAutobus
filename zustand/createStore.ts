import { RoleEnum, SeatStatusEnum } from "@/enum/shared.enums";
import { SubPassengerDetails } from "@/types/form.types";
import { ILayoutData } from "@/types/layoutbus.types";
import { NullableNumber } from "@/types/types";
import { create } from "zustand";
import debounce from "lodash/debounce";

export interface BearState {
  userSessionId: number | null;
  subPassengers: SubPassengerDetails[];
  setSubPassengers: (
    value: SubPassengerDetails[] | ((prev: SubPassengerDetails[]) => SubPassengerDetails[])
  ) => void;
  dataLayoutBus: ILayoutData | null;
  // dataLayoutBusMap: ILayoutData | null;
  idOrderSubPassengers: NullableNumber[];
  // updateIdOrderPassengers: (userId: number, action: RoleEnum) => void;
  setDataLayoutBus: (
    value:
      | ILayoutData
      | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined)
      | null
      | undefined,
    action: RoleEnum
  ) => void;
  setUserIdSession: (value: number | null) => void;
  // setDataLayoutBusMap: (value: ILayoutData | ((prev: ILayoutData | null | undefined) => ILayoutData | null | undefined) | null | undefined) => void;
}
// const debouncedSet = debounce((set, idOrderSubPassengers) => {
//   set({ idOrderSubPassengers });
// }, 800);

const debouncedSet = debounce(
  (set, idOrderSubPassengers) => {
    // console.log("idOrderSubPassengers***********", idOrderSubPassengers);
    set({ idOrderSubPassengers });
  },
  800,
  { leading: false, trailing: true }
);

const useStore = create<BearState>((set, get) => ({
  userSessionId: null,
  dataLayoutBus: null,
  // dataLayoutBusMap: null,
  idOrderSubPassengers: [],
  subPassengers: [],
  setSubPassengers: (value) =>
    set((state) => ({
      subPassengers: typeof value === "function" ? value(state.subPassengers) : value ?? [],
    })),
  // updateIdOrderPassengers: (userId: number, action: RoleEnum) => {

  // }
  // updateIdOrderPassengers: (userId: number, action: RoleEnum) => {
  //   const state = get(); // Отримуємо актуальний стан
  //   // console.log("number updateIdOrderPassengers", userId, action, state.dataLayoutBus);
  //   const newIdOrderPassengers =
  //     state.dataLayoutBus?.passenger
  //       ?.filter(
  //         (e) =>
  //           e.passenger === userId && e.busSeatStatus === (action === RoleEnum.PASSENGER ? SeatStatusEnum.SELECTED : SeatStatusEnum.RESERVEDEMPTY)
  //       )
  //       .map((e) => e.passenger) ?? [];
  //   // console.log("idOrderSubPassengers***********", idOrderSubPassengers);
  //   // debounce(() => set({ idOrderPassengers }), 800);
  //   debouncedSet(set, newIdOrderPassengers);
  //   // set(newIdOrderPassengers);
  //   // set({ idOrderPassengers: newIdOrderPassengers });
  // },

  // setDataLayoutBusMap: (value) => {
  //   console.log("value", value);
  //   set((state) => ({
  //     dataLayoutBusMap: typeof value === "function" ? value(state.dataLayoutBusMap) : value ?? null,
  //   }));
  // },

  setDataLayoutBus: (value, action: RoleEnum) => {
    const state = get(); // Отримуємо актуальний стан
    // console.log("value", value, state.userSessionId, action);
    set((state) => ({
      dataLayoutBus: typeof value === "function" ? value(state.dataLayoutBus) : value,
    }));

    if (!value || !("passenger" in value)) {
      state.idOrderSubPassengers = [];
      return;
    }
    // console.log("XXXXXXXXXxxxxxx");
    const newIdOrderPassengers = value.passenger
      .filter(
        (e) =>
          e.passenger === state.userSessionId &&
          e.busSeatStatus ===
            (action === RoleEnum.PASSENGER ? SeatStatusEnum.SELECTED : SeatStatusEnum.RESERVEDEMPTY)
      )
      .map((e) => e.passenger);

    debouncedSet(set, newIdOrderPassengers);
  },

  setUserIdSession: (value) => set({ userSessionId: value }),
}));

export default useStore;
