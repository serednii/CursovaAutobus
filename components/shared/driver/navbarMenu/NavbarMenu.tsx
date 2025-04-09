"use client";

import { MenuDriver } from "@/types/menudriver.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./style.scss";

interface Props {
  menuDriver: MenuDriver[];
}

export default function NavbarMenu({ menuDriver }: Props) {
  const pathname = usePathname();
  const IsSeatSelection = pathname.includes("seatselection");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar__button_wrapper  items-center relative ">
        <div className="absolute inset-y-0 left-[-20px] flex items-center ">
          {/* <!-- Mobile menu button--> */}
          <button
            type="button"
            className="navbar__button z-[100] inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={handleToggle}
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed.
            Menu open: "hidden", Menu closed: "block" */}

            <svg
              className="block size-6"
              style={isOpen ? { display: "none" } : {}}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            {/* Icon when menu is open.
            Menu open: "block", Menu closed: "hidden" */}

            <svg
              className="size-6"
              style={isOpen ? {} : { display: "none" }}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "is_open" : ""} navbar__overlay`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`${isOpen ? "is_open" : ""} navbar__menu_wrapper `}>
        <ul
          className={`isOpen ${isOpen ? "is_open" : ""} navbar__menu_list  gap-1 sm:gap-2 lg:gap-3`}
          // style={
          //   isOpen
          //     ? { display: "flex", flexDirection: "column", alignItems: "start" }
          //     : { flexDirection: "row", alignItems: "center" }
          // }
        >
          {menuDriver.map((item, index) => {
            const includeSeatSelection = item.link.includes("seatselection");

            if (includeSeatSelection && !IsSeatSelection) {
              return null;
            }

            return (
              <li
                key={index}
                className="flex items-center "
                // style={{ marginLeft: includeSeatSelection ? "0px" : "1rem" }}
              >
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
