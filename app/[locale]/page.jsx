import FindRoute from "@/components/shared/findroute/FindRoute";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

// export default async function Home({ params }: { params: { locale: string } }) {

export default async function Home({ params }) {
  const { locale } = await params; // Використовуємо ?? для надійності
  const { t, resources } = await initTranslations(locale, ["home", "form"]);

  return (
    <TranslationsProvider namespaces={["home", "form"]} locale={locale} resources={resources}>
      <div className="pt-[45px] px-0 bg-[#F9FAFB] font-bold text-3xl">
        <h1 className="px-4 mb-[30px]">{t("find_your_route")}</h1>
        <FindRoute className="p-6" />
      </div>
    </TranslationsProvider>
  );
}
