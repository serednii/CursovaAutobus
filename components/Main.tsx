import React from "react";
import { Container } from "./ui/Container";
interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function Main({ className, children }: Props) {
  return (
    <main className={className}>
      <Container className="bg-[url(/images/img@2x.jpg)] bg-cover w-full flex-grow">{children}</Container>
    </main>
  );
}
