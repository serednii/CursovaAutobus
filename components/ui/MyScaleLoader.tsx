import React from "react";
import { ScaleLoader } from "react-spinners";
import { ContainerCenter } from "./ContainerCenter";

export default function MyScaleLoader() {
  return (
    <ContainerCenter>
      <ScaleLoader speedMultiplier={1.5} radius={10} height={100} width={20} color="#0fcee1" />
    </ContainerCenter>
  );
}
