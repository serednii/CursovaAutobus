import CreateRouteForm from "./createRouteForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

async function CreateRoutePage({ params }: { params: { locale: string; slug: string[] } }) {
  const { locale, slug } = await params; // Використовуємо params без await
  // const slug: string | string[] | undefined = params.slug;

  // console.log("params in CreateRouteForm", slug);
  const id = (slug && Number(slug[0])) || 0;
  const type = (slug && slug[1]) || "";

  console.log("params in CreateRoutePage", locale, slug, id, type);
  // console.log("params", params);

  const { resources } = await initTranslations(locale, ["createroute", "home", "form"]);

  return (
    <TranslationsProvider namespaces={["createroute", "home", "form"]} locale={locale} resources={resources}>
      <CreateRouteForm id={id} type={type} />
    </TranslationsProvider>
  );
}

export default CreateRoutePage;

// console.log("window in CreateRoutePage", window);
// const params = useParams();
// const id = params.id ? Number(params.id) : 0;
// const type = params.type ? params.type : "";
