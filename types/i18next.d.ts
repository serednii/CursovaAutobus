import "i18next";

// Розширюємо модуль i18next
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "header";
    resources: {
      header: HeaderTranslations;
      auth: AuthTranslations;
      form: FormTranslations;
    };
  }
}
