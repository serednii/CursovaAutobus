import { Container } from "@/components/ui/Container";
import FindRoute from "@/components/shared/findroute/FindRoute";

export default async function Home() {
  return (
    <Container className="max-w-[1100px] pt-[45px] px-0">
      <div className="font-bold text-3xl">
        <h1 className="mb-[30px]">Find Your Route</h1>
        <FindRoute className="p-6" />
      </div>
    </Container>
  );
}
