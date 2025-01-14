import { Container } from "@/components/shared/container";
import { prisma } from "@/prisma/prisma-client";
import { GetRouteById } from "@/types/route-driver.types";
import { routeFetch } from "./action";

export default async function RouteId({ params: { id } }: any) {
  console.log("routes", typeof id);

  const routes: GetRouteById = await routeFetch(Number(id));

  console.log("routes", routes);

  return (
    <Container>
      <header className="h-[150px] flex flex-col justify-center">
        <h1 className="text-3xl font-bold">View Сhosen route</h1>
        <p>Route: New York to Boston - March 15, 2025</p>
      </header>
      <main>
        <h2 className="text-2xl font-bold h-[80px] bg-white flex items-center pl-5">
          Passenger Details
        </h2>
      </main>
      <footer>route {id}</footer>
    </Container>
  );
}
