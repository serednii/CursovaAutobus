import Link from "next/link";
import { FaBusAlt, FaUserAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// import Image from "next/image";
import './style.scss';
import { Overlay } from "@/components/shared/overlay";


export default function Role() {
  return (
    // <div className="role">
    <Overlay className="role bg-[#CED4DA] justify-center items-center">
      <div className="role__inner">
        <h1>Choose Your Role</h1>
        <p>Are you a Driver or a Passenger?</p>
        <div className="role__links">
          <Link href="/auth/driver">
            <FaBusAlt style={{ color: "#2563EB", width: "32px", height: "36px" }} />
            <h2>Driver</h2>
            <p>I want to drive</p>
          </Link>
          <Link href="/auth/passenger">
            <FaUserAlt style={{ color: "#2563EB", width: "32px", height: "36px" }} />
            <h2>Passenger</h2>
            <p>I need a ride</p>
          </Link>
        </div>
        <Link href="/auth/">
        <RxCross2 style={{ display: "inline", marginBottom: "3px", marginRight: "10px" }} />Cancel
          </Link>
       
      </div>
    </Overlay>

    // </div>
  );
}