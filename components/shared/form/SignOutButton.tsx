"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      style={{
        backgroundColor: "yellow",
        padding: "5px",
        borderRadius: "15px",
      }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
}
