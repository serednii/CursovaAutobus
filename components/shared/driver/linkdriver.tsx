"use client";

import { MenuDriver } from "@/types/menudriver.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  menuDriver: MenuDriver[];
}

export default function LinkDriver({ menuDriver }: Props) {
  const pathname = usePathname();

  return (
    <div>
      <ul className="flex items-center">
        {menuDriver.map((item, index) => (
          <li key={index}>
            <Link
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "15px",
                color: "black",
                fontWeight: `${pathname === item.link ? "bold" : "normal"}`,
                fontSize: `${pathname === item.link ? "1.3rem" : "1rem"}`,
              }}
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
