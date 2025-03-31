"use client";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PastRoutes({ className, children }: Props) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <h2 className="font-bold mb-4">{t("past_routes")}</h2>
      {children}
    </div>
  );
}
