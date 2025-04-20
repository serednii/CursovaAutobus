import CreateRouteForm from "./CreateRouteForm";
import { getRoute } from "./getRoute";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import { UserSession, UserUserSession } from "@/types/next-auth";

type Params = Promise<{ slug: string[] }>;

export default async function CreateRoutePage({ params }: { params: Params }) {
  const { slug } = await params;

  const id = Number(slug && slug[0]) || 0;
  const type = (slug && slug[1]) || "";
  const session: UserUserSession | null = await getServerSession(authConfig);
  const route = await getRoute({ id, type });
  console.log("route ********** *********** ", type, route);
  if (!session) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }
  const sessionUser = session.user;

  return <CreateRouteForm id={id} type={type} route={route} sessionUser={sessionUser} />;
}
