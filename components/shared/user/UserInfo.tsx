"use client";
import { FaRegBell } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { SessionData } from "@/types/next-auth";
import Link from "next/link";
import UserInfoParams from "./UserInfoParams";
import ShowIf from "@/components/ShowIf";
import UserAvatar from "@/components/UserAvatar";
import LanguageChanger from "@/components/LanguageChanger";
import Bell from "@/components/Bell";
// import LanguageChanger from "@/components/LanguageChanger";

export default function UserInfo() {
  const session = useSession();

  const { data } = session as SessionData;
  const { user } = data || {};

  return (
    <div className="flex  gap-1 sm:gap-2 lg:gap-3  items-center">
      <ShowIf condition={!!user}>
        <UserInfoParams user={user} />
        <Bell />
        <UserAvatar avatarUrl={user?.avatar_url || user?.image || ""} {...user} />
      </ShowIf>
      <ShowIf condition={!!data}>
        <Link
          style={{
            // backgroundColor: "yellow",
            // padding: "5px",
            borderRadius: "15px",
          }}
          href="#"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          {/* <IoMdLogOut style={{ width: "32px", height: "32px" }} /> */}
          <button className="h-[35px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-1 px-4 rounded transform hover:scale-105 transition duration-300">
            SignOut
          </button>
        </Link>
      </ShowIf>
      <ShowIf condition={!data}>
        <Link
          style={{
            // backgroundColor: "yellow",
            // padding: "5px",
            borderRadius: "15px",
          }}
          href="/signin"
        >
          {/* <IoMdLogIn style={{ width: "32px", height: "32px" }} /> */}
          <button className="h-[35px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-1 px-4 rounded transform hover:scale-105 transition duration-300">
            SignIn
          </button>
        </Link>
      </ShowIf>
      <LanguageChanger className="" />
    </div>
  );
}
