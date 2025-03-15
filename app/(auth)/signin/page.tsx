import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import "../style.scss";
import { Overlay } from "@/components/shared/OOOverlay";
import SingInComponent from "@/components/shared/singInComponent/SingInComponent";

export default function SignIn() {
  return (
    <Overlay className="auth top-[80px]">
      <div className="auth__select">
        <div className="auth__select-inner py-6">
          <FaBusAlt style={{ color: "#2563EB", width: "48px", height: "48px" }} />
          <h1 className="welcomeText mb-4">Welcome to ExpressBus</h1>
          <SingInComponent />
          <Link href="/selectrole">
            <button className="button-transparent">Register</button> {/* Прозора кнопка з синім ободком */}
          </Link>
        </div>
      </div>
    </Overlay>
  );
}
