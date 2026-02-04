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
  { href: "/contact", label: "Contact Us", icon: PhoneIcon },
  { href: "/support", label: "Support", icon: MailIcon },
  { href: "/shipping", label: "Shipping Info", icon: MapPinIcon },
  { href: "/returns", label: "Returns" }
];

export const quickLinksData = [
  { href: "/pages/men", label: "Men's Fashion" },
  { href: "/pages/women", label: "Women's Fashion" },
  { href: "/pages/kid", label: "Children's Fashion" },
  { href: "/pages/shop", label: "Shop All" }
];
