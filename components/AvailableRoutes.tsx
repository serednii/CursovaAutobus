"use client";
import { useAppTranslation } from "./CustomTranslationsProvider";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AvailableRoutes({ children, className }: Props) {
  const { t } = useAppTranslation("myroutes");
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">{t("available_routes")}</h2>
      {children}
    </div>
  );
}
