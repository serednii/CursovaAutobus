import CreateRouteForm from "./createRouteForm";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

async function CreateRoutePage({ params: paramsPromise }) {
  const params = await paramsPromise; // Чекаємо params
  const { locale, id, type } = params; // Тепер можна використовувати
  console.log("params", params);

  const { t, resources } = await initTranslations(locale, ["createroute"]);

  return (
    <TranslationsProvider namespaces={["createroute"]} locale={locale} resources={resources}>
      <h1>{t("title")}</h1>
      <CreateRouteForm />
    </TranslationsProvider>
  );
}

export default CreateRoutePage;
