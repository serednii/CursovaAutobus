import React from "react";
import { ScaleLoader } from "react-spinners";
import { LoaderHeightWidthRadiusProps } from "react-spinners/helpers/props";
import { ContainerCenter } from "./ContainerCenter";

export default function MyScaleLoader({ className, settings }: { className?: string; settings?: LoaderHeightWidthRadiusProps }) {
  return (
    <ContainerCenter>
      <ScaleLoader className={className} speedMultiplier={1.5} radius={10} height={100} width={20} color="#0fcee1" {...settings} />
    </ContainerCenter>
  );
}
