"use client";

import React from "react";
import { Container } from "./ui/Container";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

export default function Footer() {
  const { t: footer } = useAppTranslation("footer");

  return (
    <footer className="bg-[#1F2937] text-[#9CA3AF] w-full z-10 relative pt-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="max-w-[300px] mx-auto sm:mx-0">
            <h3 className="text-white text-lg font-semibold mb-2 text-center sm:text-left">
              {footer("company_name")}
            </h3>
            <p className="text-sm text-center sm:text-left">{footer("company_description")}</p>
          </div>

          <div className="max-w-[300px] mx-auto sm:mx-0">
            <h3 className="text-white text-lg font-semibold mb-2 text-center sm:text-left">
              {footer("quick_links")}
            </h3>
            <ul className="space-y-1 text-sm text-center sm:text-left">
              <li>{footer("about_us")}</li>
              <li>{footer("contact")}</li>
              <li>{footer("terms")}</li>
            </ul>
          </div>

          <div className="max-w-[300px] mx-auto sm:mx-0">
            <h3 className="text-white text-lg font-semibold mb-2 text-center sm:text-left">
              {footer("support")}
            </h3>
            <ul className="space-y-1 text-sm text-center sm:text-left">
              <li>{footer("faq")}</li>
              <li>{footer("help_center")}</li>
              <li>{footer("privacy")}</li>
            </ul>
          </div>

          <div className="max-w-[300px] mx-auto sm:mx-0">
            <h3 className="text-white text-lg font-semibold mb-2 text-center sm:text-left">
              {footer("follow_us")}
            </h3>
            <ul className="space-y-1 text-sm text-center sm:text-left">
              <li>{footer("facebook")}</li>
              <li>{footer("instagram")}</li>
              <li>{footer("twitter")}</li>
            </ul>
          </div>
        </div>

        <div className="py-6 text-center text-sm text-gray-500">
          © 2025 ExpressBus. {footer("rights")}
        </div>
      </Container>
    </footer>
  );
}
