"use client";

import { socialLinks } from "../constants";

export function SocialMedia() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        Follow Us
      </h3>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            className="p-2 rounded-full transition-all hover:scale-110 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-400">
        Stay connected with us on social media
      </p>
    </div>
  );
}
