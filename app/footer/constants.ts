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
  { href: "/contact", labelKey: "footer.customerService.contact", icon: PhoneIcon },
  { href: "/support", labelKey: "footer.customerService.support", icon: MailIcon },
  { href: "/shipping", labelKey: "footer.customerService.shipping", icon: MapPinIcon },
  { href: "/returns", labelKey: "footer.customerService.returns" }
];

export const quickLinksData = [
  { href: "/pages/men", labelKey: "footer.quickLinks.mens" },
  { href: "/pages/women", labelKey: "footer.quickLinks.womens" },
  { href: "/pages/kids", labelKey: "footer.quickLinks.childrens" },
  { href: "/pages/shop", labelKey: "footer.quickLinks.shop" }
];
