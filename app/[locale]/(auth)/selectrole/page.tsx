"use client";
import Link from "next/link";
import { FaBusAlt, FaUserAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// import Image from "next/image";
import "../style.scss";
import "./style.scss";

import { Overlay } from "@/components/shared/Overlay";
import { useTranslation } from "react-i18next";

export default function SelectRole() {
  const { t } = useTranslation();
  return (
    <Overlay className="role flex items-center justify-center top-[80px]">
      {/* <div className="w-[50%] flex justify-center items-center"> */}
      <div className="role__inner">
        <h1>{t("auth:select_role:title")}</h1>
        <p>{t("auth:select_role:description")}</p>
        <div className="role__links">
          <Link href="/registerdriver">
            <FaBusAlt style={{ color: "#2563EB", width: "32px", height: "36px" }} />
            <h2>{t("auth:select_role:driver:title")}</h2>
            <p>{t("auth:select_role:driver:description")}</p>
          </Link>
          <Link href="/registerpassenger">
            <FaUserAlt style={{ color: "#2563EB", width: "32px", height: "36px" }} />
            <h2>{t("auth:select_role:passenger:title")}</h2>
            <p>{t("auth:select_role:passenger:description")}</p>
          </Link>
        </div>
        <Link href="/">
          <RxCross2
            style={{
              display: "inline",
              marginBottom: "3px",
              marginRight: "10px",
            }}
          />
          {t("auth:select_role:cancel")}
        </Link>
      </div>
    </Overlay>
  );
}
