import React from "react";
import { Container } from "./ui/Container";
interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function Main({ className, children }: Props) {
  return (
    <main className={className}>
      <Container className=" flex-grow py-3 w-full rounded-lg">{children}</Container>
    </main>
  );
}
