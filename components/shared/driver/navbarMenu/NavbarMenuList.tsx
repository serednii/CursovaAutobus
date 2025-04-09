"use client";

import React from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MenuDriver } from "@/types/menudriver.types";
import "./style.scss";

interface Props {
  menuDriver: MenuDriver[];
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

export default function NavbarMenuList({ menuDriver, setIsOpen, isOpen }: Props) {
  const pathname = usePathname();
  const IsSeatSelection = pathname.includes("seatselection");

  return (
    <div className="navbar">
      <div className={`${isOpen ? "is_open" : ""} navbar__menu_wrapper `}>
        <ul
          className={`isOpen ${isOpen ? "is_open" : ""} navbar__menu_list  gap-1 sm:gap-2 lg:gap-3`}
        >
          {menuDriver.map((item, index) => {
            const includeSeatSelection = item.link.includes("seatselection");

            if (includeSeatSelection && !IsSeatSelection) {
              return null;
            }

            return (
              <li key={index} className="flex items-center ">
                {includeSeatSelection && <FaLongArrowAltRight style={{ fontSize: "1.3rem" }} />}
                <Link
                  className=""
                  style={{
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "5px",
                    color: "black",
                    fontWeight: `${pathname.includes(item.link) ? "bold" : "normal"}`,
                    fontSize: `${pathname === item.link ? "1.3rem" : "1rem"}`,
                    pointerEvents: `${includeSeatSelection ? "none" : "auto"}`,
                  }}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
