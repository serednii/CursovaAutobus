import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export default function NavbarMenuOverlay({ isOpen, setIsOpen }: Props) {
  return (
    <div
      className={`${isOpen ? "is_open" : ""} navbar__overlay`}
      onClick={() => setIsOpen(false)}
    ></div>
  );
}
