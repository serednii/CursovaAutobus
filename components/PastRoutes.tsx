"use client";
import { useAppTranslation } from "./CustomTranslationsProvider";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PastRoutes({ className, children }: Props) {
  const { t } = useAppTranslation("myroutes");
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">{t("past_routes")}</h2>
      {children}
    </div>
  );
}
