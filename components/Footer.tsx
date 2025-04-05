"use client";

import React from "react";
import { Container } from "./ui/Container";
import { useAppTranslation } from "@/components/CustomTranslationsProvider";

export default function Footer() {
  const { t: footer } = useAppTranslation("footer");

  return (
    <footer className="footer bg-[#1F2937] text-[#9CA3AF] w-full z-10 relative">
      <Container>
        <div className="footer-content border-b-[1px] border-[#374151]">
          <ul className="flex justify-between flex-wrap gap-4">
            <li>
              <h3 className="text-white">{footer("company_name")}</h3>
              <p>{footer("company_description")}</p>
            </li>
            <li>
              <h3 className="text-white">{footer("quick_links")}</h3>
              <ul>
                <li>{footer("about_us")}</li>
                <li>{footer("contact")}</li>
                <li>{footer("terms")}</li>
              </ul>
            </li>
            <li>
              <h3 className="text-white">{footer("support")}</h3>
              <ul>
                <li>{footer("faq")}</li>
                <li>{footer("help_center")}</li>
                <li>{footer("privacy")}</li>
              </ul>
            </li>
            <li>
              <h3 className="text-white">{footer("follow_us")}</h3>
              <ul>
                <li>{footer("facebook")}</li>
                <li>{footer("instagram")}</li>
                <li>{footer("twitter")}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="footer-copyright flex justify-center items-center h-[90px]">
          © 2025 ExpressBus. {footer("rights")}
        </div>
      </Container>
    </footer>
  );
}
