// import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-3 fixed bottom-[100px] left-10 z-10">
      <Link href="/auth">Auth</Link>
      <Link href="/auth/role">Auth Role</Link>
      <Link href="/auth/driver">Auth Driver</Link>
      <Link href="/auth/passenger">Auth Passenger</Link>
      <Link href="/driver/">Driver</Link>
      <Link href="/passenger/">Passenger</Link>
    </div>
  );
}
