import CreateRouteForm from "./createRouteForm";
import { getRoute } from "./getRoute";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import { UserSession } from "@/types/next-auth";

type Params = Promise<{ slug: string[] }>;

export default async function CreateRoutePage({ params }: { params: Params }) {
  const { slug } = await params;

  const id = Number(slug && slug[0]) || 0;
  const type = (slug && slug[1]) || "";
  const session: UserSession | null = await getServerSession(authConfig);
  const route = await getRoute({ id, type });

  if (!session) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }

  return <CreateRouteForm id={id} type={type} route={route} sessionUser={session} />;
}
