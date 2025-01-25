import HeaderUser from "@/components/shared/user/headerUser";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderUser
        className="h-[60px] shrink-0 flex items-center border-b-2 border-[#E5E7EB]"
        title="Passenger's Dashboard"
      />
      <div className="grow bg-[#F9FAFB]">{children}</div>
    </div>
  );
}
