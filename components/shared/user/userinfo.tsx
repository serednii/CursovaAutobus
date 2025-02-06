"use client";
import Image from "next/image";

import { FaRegBell } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { SessionData } from "@/types/next-auth";
import Link from "next/link";
import UserInfoParams from "./userinfoParams";
import ShowIf from "@/components/ShowIf";

export default function UserInfo() {
  const session = useSession();
  if (session.status === "loading") return <p>Loading...</p>;

  const { data } = session as SessionData;
  if (!data) return <p>No user is logged in</p>;
  const { user } = data;

  console.log(user);

  return (
    <div className="flex gap-4 items-center">
      <UserInfoParams user={user} />
      <div className="relative ">
        <FaRegBell style={{ width: "32px", height: "32px" }} />
        <div className="absolute top-[-2px] left-4  bg-[#EF4444] color-white w-5 h-5 rounded-[50%] flex justify-center items-center text-white">
          3
        </div>
      </div>
      <Image width={32} height={32} alt="User" src="/users/user.jpeg" />

      <ShowIf condition={!!data}>
        <Link
          style={{
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="#"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Link>
      </ShowIf>
      <ShowIf condition={!data}>
        <Link
          style={{
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="/auth/signin"
        >
          SignIn
        </Link>
      </ShowIf>

      <IoMdExit style={{ width: "32px", height: "32px" }} />
    </div>
  );
}
