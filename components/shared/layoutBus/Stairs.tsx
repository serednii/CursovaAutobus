// import { cn } from "@/lib/utils";
import useStore from "@/zustand/createStore";
import { memo } from "react";
import { getKeysStyles } from "./LayuotBus";
import Stair from "./Stair";

export default memo(function Stairs() {
  console.log("Stairs RENDER");
  const dataLayoutBus = useStore((state) => state.dataLayoutBus);
  if (dataLayoutBus === null || dataLayoutBus === undefined) {
    return null;
  }
  // const keysStairs_0 = Object.keys(dataLayoutBus.stairs[0]) as (keyof (typeof dataLayoutBus.stairs)[0])[];

  const keysStairs_1 = dataLayoutBus.stairs.length === 2 && (Object.keys(dataLayoutBus.stairs[1]) as (keyof (typeof dataLayoutBus.stairs)[1])[]);

  // const styleStairs_0 = getKeysStyles(keysStairs_0, dataLayoutBus.stairs[0]);
  const styleStairs_1 = (keysStairs_1 && getKeysStyles(keysStairs_1, dataLayoutBus.stairs[1])) || null;
  return (
    <>
      <Stair className="right-[100px] top-[0px]" />
      {styleStairs_1 && <Stair style={styleStairs_1 || {}} className="left-[50px] top-[0px]" />}
    </>
  );
});
