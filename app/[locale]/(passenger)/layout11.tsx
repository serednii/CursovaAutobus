export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  w-[100%] h-[100%]">
      <div className="grow  w-[100%] ">{children}</div>
    </div>
  );
}
