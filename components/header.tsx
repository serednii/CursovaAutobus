// // import Image from "next/image";

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const session = useSession();
  // const { data: session, status } = useSession();

  if (session.status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No user is logged in</p>;

  console.log(session);
  return (
    <div className="flex gap-3 fixed bottom-[100px] left-10 z-10 flex-wrap">
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/auth" ? "active-link" : ""}
        href="/auth"
      >
        Auth
      </Link>
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/auth/role" ? "active-link" : ""}
        href="/auth/role"
      >
        Auth Role
      </Link>
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/auth/driver" ? "active-link" : ""}
        href="/auth/driver"
      >
        Auth Driver
      </Link>
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/auth/passenger" ? "active-link" : ""}
        href="/auth/passenger"
      >
        Auth Passenger
      </Link>
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/driver" ? "active-link" : ""}
        href="/driver/"
      >
        Driver
      </Link>
      <Link
        style={{
          backgroundColor: "yellow",
          padding: "5px",
          borderRadius: "15px",
        }}
        className={pathname === "/passenger" ? "active-link" : ""}
        href="/passenger/"
      >
        Passenger
      </Link>
      {session?.data ? (
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
      ) : (
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
      )}
      <div>
        <h1
          style={{
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "15px",
          }}
        >
          {/* <div>
            <h1>Welcome, {session?.data?.user?.firstName}!</h1>
            <p>Email: {session?.data?.user?.email}</p>
            <p>Role: {session?.data?.user?.role}</p>
            <p>Phone: {session?.data?.user?.phone}</p>
            <p>License: {session?.data?.user?.license}</p>
            <p>isNewUser: {session?.data?.user?.isNewUser}</p>
          </div> */}
        </h1>
        {/* {session?.user?.firstName && <img src={session.user.image} alt="" />} */}
      </div>
    </div>
  );
}
