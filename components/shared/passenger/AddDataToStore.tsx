"use client";
import React, { useEffect } from "react";
import busStore from "@/mobx/busStore";
import { RoleEnum } from "@/enum/shared.enums";
import { observer } from "mobx-react-lite";
import { ILayoutData } from "@/types/layoutbus.types";

interface Props {
  route: ILayoutData | null;
  userSessionId: number;
  children: React.ReactNode;
}

function AddDataToStore({ route, userSessionId, children }: Props) {
  useEffect(() => {
    busStore.setDataLayoutBus(null, RoleEnum.PASSENGER);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => busStore.setDataLayoutBus(route, RoleEnum.PASSENGER), 100);
    // busStore.setDataLayoutBus(route, RoleEnum.PASSENGER);
    return () => clearTimeout(timer);
  }, [route]);

  useEffect(() => {
    if (userSessionId) {
      busStore.setUserIdSession(userSessionId);
    }
  }, [userSessionId]);

  console.log(route);

  return <div>{children}</div>;
}

export default observer(AddDataToStore);
