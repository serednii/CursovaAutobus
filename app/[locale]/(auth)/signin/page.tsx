"use client";
import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import "../style.scss";
import { Overlay } from "@/components/shared/Overlay";
import SingInComponent from "@/components/shared/singInComponent/SingInComponent";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

export default function SignIn() {
  const { t: auth } = useAppTranslation("auth");

  return (
    <Overlay className="auth top-[80px]">
      <div className="auth__select">
        <div className="auth__select-inner py-6">
          <FaBusAlt style={{ color: "#2563EB", width: "48px", height: "48px" }} />
          <h1 className="welcomeText mb-4">{auth("sign_in.welcome")}</h1>
          <SingInComponent />
          <Link href="/selectrole">
            <button className="button-transparent">{auth("sign_in.register")}</button>{" "}
            {/* Прозора кнопка з синім ободком */}
          </Link>
        </div>
      </div>
    </Overlay>
  );
}
