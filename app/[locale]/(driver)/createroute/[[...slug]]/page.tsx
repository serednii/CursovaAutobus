import CreateRouteForm from "./createRouteForm";
import { getRoute } from "./getRoute";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";
import { UserSession } from "@/types/next-auth";

// async function CreateRoutePage({ params }: { params: { slug: string[] } }) {
//   const { slug } = await params; // Використовуємо params без await

//   const id = (slug && Number(slug[0])) || 0;
//   const type = (slug && slug[1]) || "";
//   const route = await getRoute({ id, type });
//   console.log(id, type, route);
//   return <CreateRouteForm id={id} type={type} route={route} />;
// }

// import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function CreateRoutePage({ params }: { params: { slug?: string[] } }) {
  const { slug } = await params;

  const id = Number(slug && slug[0]) || 0;
  const type = (slug && slug[1]) || "";
  const session: UserSession | null = await getServerSession(authConfig);
  const route = await getRoute({ id, type });
  if (session === null) {
    console.error("Route not found");
    return <div>Route not found</div>;
  }
  return <CreateRouteForm id={id} type={type} route={route} sessionUser={session} />;
}

// import { Metadata } from "next";

// Визначаємо тип параметрів відповідно до структури маршруту

// export default async function CreateRoutePage({ params }) {
//   const { slug } = await params;

//   const id = Number(slug[0]) || 0;
//   const type = slug[1] || "";

//   const session = await getServerSession(authConfig);
//   // const userSessionId = Number(session?.user?.id);

//   const route = await getRoute({ id, type });
//   console.log("create route ", id, type, route);
//   return <CreateRouteForm id={id} type={type} route={route} sessionUser={session} />;
// }
