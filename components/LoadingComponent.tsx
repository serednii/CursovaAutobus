import { Container } from "@/components/shared/Container";

export default function LoadingComponent() {
  return (
    <Container className="p-4">
      <div className="h-6 w-48 bg-gray-300 rounded animate-pulse mb-2">
        Loading...
      </div>
      <div className="h-6 w-64 bg-gray-300 rounded animate-pulse">
        Loading...
      </div>
    </Container>
  );
}
