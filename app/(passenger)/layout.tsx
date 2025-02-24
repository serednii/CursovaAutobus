import { Container } from "@/components/ui/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  w-[100%]">
      <Container className="grow  w-[100%]">{children}</Container>
    </div>
  );
}
