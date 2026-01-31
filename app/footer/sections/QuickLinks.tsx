"use client";

import Link from "next/link";
import { quickLinksData } from "../constants";

export function QuickLinks() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        Quick Links
      </h3>
      <ul className="space-y-3">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href}
              className="text-sm transition-colors hover:text-[#C7AB6C] text-gray-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
