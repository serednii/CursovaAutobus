import HeaderUser from "@/components/shared/user/headerUser";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuPassenger = [
    {
      name: "Passenger`s Dashboard",
      link: "/passengerdashboard",
    },
    {
      name: "Seat selection",
      link: "/seatselection",
    },
    {
      name: "My Bookings",
      link: "/mybookings",
    },
    {
      name: "My profile",
      link: "/myprofile",
    },
  ];

  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderUser
        className="h-[60px] shrink-0 flex items-center border-b-2 border-[#E5E7EB]"
        menuDriver={menuPassenger}
      />
      <div className="grow bg-[#F9FAFB]">{children}</div>
    </div>
  );
}
