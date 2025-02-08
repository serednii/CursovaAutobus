// import type { Metadata } from "next";

import HeaderUser from "@/components/shared/user/headerUser";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuDriver = [
    {
      name: "Create route",
      link: "/createroute",
    },
    {
      name: "My routes",
      link: "/myroutes",
    },
  ];

  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderUser
        className="h-[60px] shrink-0 flex items-center border-b-2 border-[#E5E7EB] "
        menuDriver={menuDriver}
      />
      <div className="grow bg-[#F9FAFB]">{children}</div>
    </div>
  );
}
