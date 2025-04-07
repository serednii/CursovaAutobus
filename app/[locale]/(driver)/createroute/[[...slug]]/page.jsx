import CreateRouteForm from "./createRouteForm";
import { getRoute } from "./getRoute";

// async function CreateRoutePage({ params }: { params: { slug: string[] } }) {
//   const { slug } = await params; // Використовуємо params без await

//   const id = (slug && Number(slug[0])) || 0;
//   const type = (slug && slug[1]) || "";
//   const route = await getRoute({ id, type });
//   console.log(id, type, route);
//   return <CreateRouteForm id={id} type={type} route={route} />;
// }

// import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// async function CreateRoutePage({ params }: { params: { slug?: string[] } }) {
//   const slug = params.slug || [];

//   const id = Number(slug[0]) || 0;
//   const type = slug[1] || "";
//   const route = await getRoute({ id, type });

//   return <CreateRouteForm id={id} type={type} route={route} />;
// }

// import { Metadata } from "next";

// Визначаємо тип параметрів відповідно до структури маршруту

// @ts-expect-error  - ігноруємо помилку типів, пов'язану з Next.js
export default async function CreateRoutePage({ params }) {
  const slug = params.slug || [];

  const id = Number(slug[0]) || 0;
  const type = slug[1] || "";
  const route = await getRoute({ id, type });
  console.log("create route ", id, type, route);
  return <CreateRouteForm id={id} type={type} route={route} />;
}
