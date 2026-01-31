"use client";

import Link from "next/link";
import { customerServices } from "../constants";

export function CustomerService() {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Customer Service
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {customerServices.map((service, index) => (
          <li key={index}>
            <Link 
              href={service.href}
              className="flex items-center gap-2 text-xs sm:text-sm transition-colors hover:text-[#C7AB6C] text-gray-400"
            >
              {service.icon && <service.icon className="h-3 w-3 sm:h-4 sm:w-4" />}
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
