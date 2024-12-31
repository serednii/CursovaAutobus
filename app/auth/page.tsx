import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import Image from "next/image";
import "./style.scss";
import { Overlay } from "@/components/shared/overlay";

export default function Auth() {
  return (
    // <div className="auth">
    <Overlay className="auth">
      <div className="auth__select">
        <div className="auth__select-inner">
          <FaBusAlt
            style={{ color: "#2563EB", width: "48px", height: "48px" }}
          />
          <h1 className="welcomeText">Welcome to ExpressBus</h1>
          <Link className="button-blue" href="/auth/singin">
            Sign in
            {/* Повністю синя кнопка */}
          </Link>
          <Link className="button-transparent" href="/auth/role">
            Register
            {/* Прозора кнопка з синім ободком */}
          </Link>
        </div>
      </div>
      <div className="auth__img">
        <Image
          className="dark:invert"
          src="/images/bus.png"
          alt="Next.js logo"
          width={540}
          height={540}
          priority
        />
      </div>
    </Overlay>

    // </div>
  );
}
