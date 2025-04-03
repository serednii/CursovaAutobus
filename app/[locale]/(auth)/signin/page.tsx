"use client";
import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import "../style.scss";
import { Overlay } from "@/components/shared/Overlay";
import SingInComponent from "@/components/shared/singInComponent/SingInComponent";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <Overlay className="auth top-[80px]">
      <div className="auth__select">
        <div className="auth__select-inner py-6">
          <FaBusAlt style={{ color: "#2563EB", width: "48px", height: "48px" }} />
          <h1 className="welcomeText mb-4">{t("auth:sign_in:welcome")}</h1>
          <SingInComponent t={t} />
          <Link href="/selectrole">
            <button className="button-transparent">{t("auth:sign_in:register")}</button>{" "}
            {/* Прозора кнопка з синім ободком */}
          </Link>
        </div>
      </div>
    </Overlay>
  );
}
