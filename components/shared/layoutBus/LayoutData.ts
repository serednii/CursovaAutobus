import { ILayoutData } from "@/types/layoutbus.types";
import { layoutsData_0deg } from "./LayoutData_0deg";
import { layoutsData_90deg } from "./LayoutData_90deg";

export default function LayoutsData(isRotate: boolean = false): ILayoutData[] {
  if (isRotate) {
    return layoutsData_90deg;
  } else {
    return layoutsData_0deg;
  }
}
