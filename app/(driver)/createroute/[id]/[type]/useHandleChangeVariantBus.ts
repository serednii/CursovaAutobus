import { ILayoutData } from "@/types/layoutbus.types";
import { IBusSeats } from "@/types/interface";
import { layoutsData } from "@/components/shared/layoutBus/LayoutData";
import { SeatStatusEnum } from "@/enum/shared.enums";
import useStore from "@/zustand/createStore";

// const handleChangeVariantBus = (
//   number: number,
//   setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>,
//   setDataLayoutBus: React.Dispatch<React.SetStateAction<ILayoutData | null | undefined>>,
//   setDataLayoutBusMap: React.Dispatch<React.SetStateAction<ILayoutData | null | undefined>>,
//   dataLayoutBus?: IBusSeats[]
// ) => {
//   console.log("handleChangeVariantBus+++++++++++++++", number);
//   setIndexSelectVariantBus(number);
//   if (dataLayoutBus) {
//     const selectLayoutsData = layoutsData[number].passenger.map((e) => {
//       const findSeats = dataLayoutBus.find((seat) => seat.number === e.number);
//       return { ...e, busSeatStatus: findSeats?.busSeatStatus || SeatStatusEnum.AVAILABLE, passenger: findSeats?.passenger || null };
//     });
//     setDataLayoutBus({ ...layoutsData[number], passenger: selectLayoutsData });
//     setDataLayoutBusMap({ ...layoutsData[number], passenger: selectLayoutsData });
//   } else {
//     setDataLayoutBus(layoutsData[number]);
//     setDataLayoutBusMap(layoutsData[number]);
//   }
// };
import { useCallback, useEffect, useState } from "react";

export const useHandleChangeVariantBus = () => {
  const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
  const setDataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);
  const [selectLayoutsData, setSelectLayoutsData] = useState<ILayoutData | null>(null);

  useEffect(() => {
    setDataLayoutBus(selectLayoutsData);
    setDataLayoutBusMap(selectLayoutsData);
  }, [setDataLayoutBus, setDataLayoutBusMap, selectLayoutsData]);

  const handleChangeVariantBus = ({
    number,
    setIndexSelectVariantBus,
    dataLayoutBus,
  }: {
    number: number | null;
    setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>;
    dataLayoutBus?: IBusSeats[];
  }) => {
    if (number === null) return;
    console.log("handleChangeVariantBus+++++++++++++++", number);

    const selectedLayout = layoutsData[number];
    if (!selectedLayout) return;
    console.log("selectedLayout ++++++++++++++++", selectedLayout);

    const selectLayoutsData = dataLayoutBus
      ? selectedLayout.passenger.map((e) => {
          const findSeats = dataLayoutBus.find((seat) => seat.number === e.number);
          return {
            ...e,
            busSeatStatus: findSeats?.busSeatStatus ?? SeatStatusEnum.AVAILABLE,
            passenger: findSeats?.passenger ?? null,
          };
        })
      : selectedLayout.passenger;
    console.log("selectLayoutsData ++++++++++++++++", selectLayoutsData, { ...selectedLayout, passenger: selectLayoutsData });
    setSelectLayoutsData({ ...selectedLayout, passenger: selectLayoutsData });
    setIndexSelectVariantBus(number);
  };
  return { handleChangeVariantBus };
};

// export const useHandleChangeVariantBus2 = () => {
//   const setDataLayoutBus = useStore((state) => state.setDataLayoutBus);
//   const setDataLayoutBusMap = useStore((state) => state.setDataLayoutBusMap);

//   const handleChangeVariantBus = ({
//     number,
//     setIndexSelectVariantBus,
//     dataLayoutBus,
//   }: {
//     number: number | null;
//     setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>;
//     dataLayoutBus?: IBusSeats[];
//   }) => {
//     if (number === null) return;
//     setIndexSelectVariantBus(number);
//     if (dataLayoutBus) {
//       const selectLayoutsData = layoutsData[number].passenger.map((e) => {
//         const findSeats = dataLayoutBus.find((seat) => seat.number === e.number);
//         return { ...e, busSeatStatus: findSeats?.busSeatStatus || SeatStatusEnum.AVAILABLE, passenger: findSeats?.passenger || null };
//       });
//       setDataLayoutBus({ ...layoutsData[number], passenger: selectLayoutsData });
//       setDataLayoutBusMap({ ...layoutsData[number], passenger: selectLayoutsData });
//     } else {
//       setDataLayoutBus(layoutsData[number]);
//       setDataLayoutBusMap(layoutsData[number]);
//     }
//   };
//   return { handleChangeVariantBus };
// };

// Cannot update a component (`CreateRoute`) while rendering a different component (`CreateRoute`). To locate the bad setState() call inside `CreateRoute`, follow the stack trace as described in https://react.dev/link/setstate-in-render

// export const useHandleChangeVariantBus1 = () => {
//   const { setDataLayoutBus, setDataLayoutBusMap } = useStore((state) => ({
//     setDataLayoutBus: state.setDataLayoutBus,
//     setDataLayoutBusMap: state.setDataLayoutBusMap,
//   }));

//   const handleChangeVariantBus = ({
//     number,
//     setIndexSelectVariantBus,
//     dataLayoutBus,
//   }: {
//     number: number | null;
//     setIndexSelectVariantBus: React.Dispatch<React.SetStateAction<number | null>>;
//     dataLayoutBus?: IBusSeats[];
//   }) => {
//     if (number == null) return; // Переконуємось, що не відкидаємо `0`

//     setIndexSelectVariantBus(number);

//     const selectedLayout = layoutsData[number];
//     if (!selectedLayout) return;

//     const selectLayoutsData = dataLayoutBus
//       ? selectedLayout.passenger.map((seat) => {
//           const foundSeat = dataLayoutBus.find((s) => s.number === seat.number);
//           return {
//             ...seat,
//             busSeatStatus: foundSeat?.busSeatStatus ?? SeatStatusEnum.AVAILABLE,
//             passenger: foundSeat?.passenger ?? null,
//           };
//         })
//       : selectedLayout.passenger;

//     const newLayout = { ...selectedLayout, passenger: selectLayoutsData };

//     setDataLayoutBus(newLayout);
//     setDataLayoutBusMap(newLayout);
//   };

//   return { handleChangeVariantBus };
// };
