import CreateRouteForm from "./createRouteForm";
import { getRoute } from "./getRoute";

async function CreateRoutePage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params; // Використовуємо params без await

  const id = (slug && Number(slug[0])) || 0;
  const type = (slug && slug[1]) || "";
  const route = await getRoute({ id, type });
  console.log(id, type, route);
  return <CreateRouteForm id={id} type={type} route={route} />;
}

export default CreateRoutePage;
