"use client";
import React from "react";
import Link from "next/link";
import { FaBusAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function LogoComponent({ className }: { className?: string }) {
  return (
    <div>
      <Link href="/" className={cn(className, "items-center gap-2")}>
        <FaBusAlt style={{ width: "32px", height: "32px", color: "blue" }} />
        <h1 className="font-bold text-black text-xl hidden lg:block">ExpressBus</h1>
      </Link>
    </div>
  );
}
