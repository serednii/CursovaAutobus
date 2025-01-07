// import Image from "next/image";

"use client";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function Header() {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signIn");
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "unauthenticated") {
  //   return null; // Не рендеримо нічого, поки не перенаправимо
  // }

  // console.log(session);
  return (
    <div className="flex gap-3 fixed bottom-[100px] left-10 z-10">
      <Link
        className={pathname === "/auth" ? "text-[red]-400" : ""}
        href="/auth"
      >
        Auth
      </Link>
      <Link
        className={pathname === "/auth/role" ? "text-[red]-400" : ""}
        href="/auth/role"
      >
        Auth Role
      </Link>
      <Link
        className={pathname === "/auth/driver" ? "text-[red]-400" : ""}
        href="/auth/driver"
      >
        Auth Driver
      </Link>
      <Link
        className={pathname === "/auth/passenger" ? "text-[red]-400" : ""}
        href="/auth/passenger"
      >
        Auth Passenger
      </Link>
      <Link
        className={pathname === "/driver" ? "text-[red]-400" : ""}
        href="/driver/"
      >
        Driver
      </Link>
      <Link
        className={pathname === "/passenger" ? "text-[red]-400" : ""}
        href="/passenger/"
      >
        Passenger
      </Link>
      {session?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
        </Link>
      ) : (
        <Link href="/auth/signin">SignIn</Link>
      )}
    </div>
  );
}
