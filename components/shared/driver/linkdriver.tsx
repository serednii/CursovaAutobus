"use client";

import { MenuDriver } from "@/types/menudriver.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";
interface Props {
  menuDriver: MenuDriver[];
}

export default function LinkDriver({ menuDriver }: Props) {
  const pathname = usePathname();
  const IsSeatSelection = pathname.includes("seatselection");
  return (
    <div>
      <ul className="flex items-center ">
        {menuDriver.map((item, index) => {
          console.log("*********", item.link, pathname);
          const includeSeatSelection = item.link.includes("seatselection");

          if (includeSeatSelection && !IsSeatSelection) {
            return null;
          }

          return (
            <li
              key={index}
              className="flex items-center"
              style={{ marginLeft: includeSeatSelection ? "0px" : "1rem" }}
            >
              {includeSeatSelection && (
                <FaLongArrowAltRight style={{ fontSize: "1.3rem" }} />
              )}
              <Link
                style={{
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "15px",
                  color: "black",
                  fontWeight: `${
                    pathname.includes(item.link) ? "bold" : "normal"
                  }`,
                  fontSize: `${pathname === item.link ? "1.3rem" : "1rem"}`,
                  pointerEvents: `${includeSeatSelection ? "none" : "auto"}`,
                }}
                href={item.link}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
