import CreateRouteForm from "./createRouteForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

async function CreateRoutePage({ params }) {
  const { locale } = await params; // Використовуємо params без await
  // console.log("params", params);

  const { t, resources } = await initTranslations(locale, ["createroute", "home", "form"]);

  return (
    <TranslationsProvider namespaces={["createroute", "home", "form"]} locale={locale} resources={resources}>
      <CreateRouteForm />
    </TranslationsProvider>
  );
}

export default CreateRoutePage;

// console.log("window in CreateRoutePage", window);
// const params = useParams();
// const id = params.id ? Number(params.id) : 0;
// const type = params.type ? params.type : "";
