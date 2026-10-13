export const site = {
  businessName: "Tailor Forged",
  subbrand: "Marketing",
  brandMark: "TF",
  email: "hello@tailorforged.com",

  seo: {
    title: "Tailor Forged Marketing | Websites Built for Growth",
    description:
      "Professional websites and reliable website care for businesses ready to grow.",
  },

  navigation: [
    { label: "Services", href: "#services" },
    { label: "Our Process", href: "#process" },
    { label: "Get a Quote", href: "#contact", emphasis: true },
  ],

  hero: {
    eyebrow: "BUILT WITH PURPOSE. DESIGNED TO PERFORM.",
    heading:
      "Your business deserves a website that works as hard as you do.",
    description:
      "Professional websites and reliable website care for businesses ready to grow.",
    buttonText: "Get a Website Quote",
    note: "Clear process. Thoughtful design. Dependable support.",
    stamp: ["BUILT", "FOR", "GROWTH."] as const,
  },

  servicesSection: {
    eyebrow: "WHAT WE DO",
    heading: "A stronger digital foundation.",
    description: "Practical digital services built around your business.",
    cardLinkText: "Discuss your project",
  },

  services: [
    {
      number: "01",
      title: "Website Design",
      description:
        "Clear, professional websites designed to turn visitors into potential customers.",
    },
    {
      number: "02",
      title: "Website Development",
      description:
        "Fast, responsive websites built around your business, services, and goals.",
    },
    {
      number: "03",
      title: "Website Care",
      description:
        "Ongoing updates, maintenance, and practical support as your business grows.",
    },
  ],

  processSection: {
    eyebrow: "HOW WE WORK",
    heading: "Simple by design.",
    description:
      "A clear process from the first conversation to ongoing support.",
  },

  process: [
    {
      number: "01",
      title: "Discover",
      description: "We learn about your business, customers, and goals.",
    },
    {
      number: "02",
      title: "Build",
      description: "We design and develop a website around your needs.",
    },
    {
      number: "03",
      title: "Support",
      description: "We help keep your website reliable and up to date.",
    },
  ],

  contact: {
    eyebrow: "YOUR NEXT STEP",
    heading: "Let's build something that moves your business forward.",
    description:
      "Tell us what your business needs. We'll start with a conversation.",
    buttonText: "Start a Project",
  },

  footer: {
    tagline: "Thoughtful digital work for businesses ready to grow.",
  },

  colors: {
    background: "#F8F7F4",
    foreground: "#1E1E1C",
    accent: "#8B6A48",
    accentContrast: "#C5A17B",
    secondary: "#55514B",
    muted: "#625D56",
    neutral: "#E8E3DB",
    border: "#D8CFC2",
    card: "#FFFEFA",
    inverse: "#F8F7F4",
    inverseForeground: "#1E1E1C",
  },
} as const;

export function validateSiteConfig(config: typeof site = site): void {
  const requiredText = [
    ["businessName", config.businessName],
    ["subbrand", config.subbrand],
    ["brandMark", config.brandMark],
    ["SEO title", config.seo.title],
    ["SEO description", config.seo.description],
    ["hero heading", config.hero.heading],
    ["contact heading", config.contact.heading],
    ["footer tagline", config.footer.tagline],
  ] as const;

  const missing = requiredText
    .filter(([, value]) => !value.trim())
    .map(([label]) => label);

  if (missing.length > 0) {
    throw new Error(`Site configuration is missing required text: ${missing.join(", ")}`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    throw new Error("Site configuration email must be a valid email address.");
  }

  const invalidColors = Object.entries(config.colors)
    .filter(([, value]) => !/^#[0-9a-fA-F]{6}$/.test(value))
    .map(([name]) => name);

  if (invalidColors.length > 0) {
    throw new Error(`Site configuration has invalid hex colors: ${invalidColors.join(", ")}`);
  }

  if (config.services.length === 0 || config.process.length === 0) {
    throw new Error("Site configuration must include at least one service and one process step.");
  }

  const validAnchors = new Set(["#home", "#services", "#process", "#contact"]);
  const invalidNavigation = config.navigation.filter(
    (item) => !item.label.trim() || !validAnchors.has(item.href),
  );

  if (invalidNavigation.length > 0) {
    throw new Error("Site configuration navigation labels and anchor targets must be valid.");
  }
}

validateSiteConfig();
