export const SITE = {
  name: "RTO Mitra",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rtomitra.in",
  tagline: "India's Smart Vehicle Help Platform",
  description:
    "All RTO help in one place — guides, forms, AI assistance, community support and end-to-end paid help for RC transfer, hypothecation removal, duplicate RC, NOC, address change, DL renewal and more.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+919999999999",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@rtomitra.in",
  office:
    "RTO Mitra HQ, 2nd Floor, Iscon Cross Road, S.G. Highway, Ahmedabad, Gujarat 380015",
  socials: {
    twitter: "https://x.com/rtomitra",
    instagram: "https://instagram.com/rtomitra",
    facebook: "https://facebook.com/rtomitra",
    linkedin: "https://linkedin.com/company/rtomitra",
    youtube: "https://youtube.com/@rtomitra",
  },
};

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/knowledge", label: "Knowledge Hub" },
  { href: "/community", label: "Community" },
  { href: "/ai-assistant", label: "Ask AI" },
  { href: "/track", label: "Track Status" },
  { href: "/about", label: "About" },
];

export const STATES = [
  "Gujarat",
  "Maharashtra",
  "Rajasthan",
  "Madhya Pradesh",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
  "Bihar",
  "Odisha",
  "Assam",
  "Jharkhand",
  "Chhattisgarh",
  "Uttarakhand",
];

export const VEHICLE_TYPES = [
  "Two Wheeler",
  "Four Wheeler — Private",
  "Four Wheeler — Commercial",
  "Goods Vehicle",
  "Passenger Vehicle",
  "Tractor",
];
