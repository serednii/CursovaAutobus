import React from "react";
import { Container } from "./ui/Container";

export default function Footer() {
  return (
    <footer className="footer bg-[#1F2937] text-[#9CA3AF] w-full z-10 relative">
      <Container>
        <div className="footer-content border-b-[1px] border-[#374151]">
          <ul className="flex justify-between">
            <li>
              <h3 className="text-white">ExpressBus</h3>
              <p>Your reliable partner for comfortable bus travel across the country.</p>
            </li>
            <li>
              <h3 className="text-white">Quick Links</h3>
              <ul>
                <li>About Us</li>
                <li>Contact</li>
                <li>Terms & Conditions</li>
              </ul>
            </li>
            <li>
              <h3 className="text-white">Support</h3>
              <ul>
                <li>FAQ</li>
                <li>Help Center</li>
                <li>Privacy Policy</li>
              </ul>
            </li>
            <li>
              <h3 className="text-white">Follow Us</h3>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="footer-copyright flex justify-center items-center h-[90px]">© 2025 ExpressBuss. All rights reserved.</div>
      </Container>
    </footer>
  );
}
