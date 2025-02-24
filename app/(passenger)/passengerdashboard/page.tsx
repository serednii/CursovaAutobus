import { Container } from "@/components/ui/Container";
import FindRoute from "@/components/shared/findroute/FindRoute";

export default function PassengersDashboard() {
  return (
    <div className="pt-[45px]">
      <Container className="bg-[#F9FAFB]">
        <div className=" px-4 pt-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Route Management</h1>
            <p>Create and manage your bus routes</p>
          </div>
        </div>
        <FindRoute />
      </Container>
    </div>
  );
}
