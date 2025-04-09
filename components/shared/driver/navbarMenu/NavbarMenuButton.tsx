"use client";

import React from "react";
import "./style.scss";

interface Props {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

export default function NavbarMenuButton({ setIsOpen, isOpen }: Props) {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar__button_wrapper  items-center relative ">
      <div className="absolute inset-y-0 left-[-10px] sm:left-0 flex items-center ">
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
  );
}
