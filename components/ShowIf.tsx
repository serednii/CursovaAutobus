import React from "react";
interface Props {
  condition: boolean;
  children: React.ReactNode;
}
export default function ShowIf({ condition, children }: Props) {
  return condition ? <>{children}</> : null;
}
