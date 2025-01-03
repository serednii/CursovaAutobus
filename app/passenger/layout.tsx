import HeaderPassenger from "@/components/shared/passenger/headerPassenger";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderPassenger className="h-[60px] flex items-center border-t-1 border-[#E5E7EB] " />
      <div className="grow bg-[#F9FAFB]">{children}</div>
    </div>
  );
}
