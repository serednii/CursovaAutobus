"use client";
import Image from "next/image";

import { FaRegBell } from "react-icons/fa";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { SessionData } from "@/types/next-auth";
import Link from "next/link";
import UserInfoParams from "./UserinfoParams";
import ShowIf from "@/components/ShowIf";
import UserAvatar from "@/components/UserAvatar";

export default function UserInfo() {
  const session = useSession();
  if (session.status === "loading") return <p>Loading...</p>;

  const { data } = session as SessionData;
  // if (!data) return <p>No user is logged in</p>;
  const { user } = data || {};

  // console.log("user", user);

  return (
    <div className="flex gap-4 items-center">
      <ShowIf condition={!!user}>
        <UserInfoParams user={user} />
        <div className="relative ">
          <FaRegBell style={{ width: "32px", height: "32px" }} />
          <div className="absolute top-[-2px] left-4  bg-[#EF4444] color-white w-5 h-5 rounded-[50%] flex justify-center items-center text-white">
            3
          </div>
        </div>
        <UserAvatar avatarUrl={user?.avatar_url || user?.image || ""} {...user} />
      </ShowIf>
      <ShowIf condition={!!data}>
        <Link
          style={{
            // backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="#"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <IoMdLogOut style={{ width: "32px", height: "32px" }} />
        </Link>
      </ShowIf>
      <ShowIf condition={!data}>
        <Link
          style={{
            // backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
          href="/signin"
        >
          <IoMdLogIn style={{ width: "32px", height: "32px" }} />
        </Link>
      </ShowIf>
    </div>
  );
}
