import CreateRouteForm from "./createRouteForm";

async function CreateRoutePage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params; // Використовуємо params без await

  const id = (slug && Number(slug[0])) || 0;
  const type = (slug && slug[1]) || "";

  return <CreateRouteForm id={id} type={type} />;
}

export default CreateRoutePage;
