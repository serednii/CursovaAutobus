"use client";

import { MenuDriver } from "@/types/menudriver.types";
import React from "react";
import NavbarMenuOverlay from "./NavbarMenuOverlay";
import NavbarMenuButton from "./NavbarMenuButton";
import NavbarMenuList from "./NavbarMenuList";
import "./style.scss";

interface Props {
  menuDriver: MenuDriver[];
}

export default function NavbarMenu({ menuDriver }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="navbar">
      <NavbarMenuButton setIsOpen={setIsOpen} isOpen={isOpen} />
      <NavbarMenuOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavbarMenuList menuDriver={menuDriver} setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}
