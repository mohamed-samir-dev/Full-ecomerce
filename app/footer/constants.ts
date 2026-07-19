import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from "lucide-react";
import { SocialLink, CustomerService } from "./types";

export const socialLinks: SocialLink[] = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" }
];

export const customerServices: CustomerService[] = [
  { href: "/pages/contact", labelKey: "footer.customerService.contact", icon: PhoneIcon },
  { href: "/pages/contact", labelKey: "footer.customerService.support", icon: MailIcon },
  { href: "/pages/shipping", labelKey: "footer.customerService.shipping", icon: MapPinIcon },
  { href: "/pages/returns", labelKey: "footer.customerService.returns" }
];

export const quickLinksData = [
  { href: "/pages/men", labelKey: "footer.quickLinks.mens" },
  { href: "/pages/women", labelKey: "footer.quickLinks.womens" },
  { href: "/pages/kids", labelKey: "footer.quickLinks.childrens" },
  { href: "/pages/shop", labelKey: "footer.quickLinks.shop" }
];
