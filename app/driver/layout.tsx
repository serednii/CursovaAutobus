// import type { Metadata } from "next";

import HeaderDriver from "@/components/shared/driver/headerDriver";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderDriver className="h-[60px] flex items-center border-b-2 border-[#E5E7EB] " />
      <div className="grow bg-[#F9FAFB]">{children}</div>
    </div>
  );
}
