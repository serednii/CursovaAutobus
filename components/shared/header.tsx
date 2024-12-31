import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-3 z-[10] fixed">
      <Link href="/auth">Auth</Link>
      <Link href="/auth/role">Role</Link>
      <Link href="/auth/driver">Driver</Link>
      <Link href="/auth/passenger">Passenger</Link>
    </div>
  );
}
