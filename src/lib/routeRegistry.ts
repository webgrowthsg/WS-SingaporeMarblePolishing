export type PublishStatus = "published" | "blocked";

export interface RouteMeta {
  /** Canonical path with trailing slash (e.g. "/marble-restoration/") */
  path: string;
  /** Unique short identifier used in code */
  id: string;
  /** SEO title tag */
  title: string;
  /** Meta description (unique, max ~160 chars) */
  description: string;
  /** Visible H1 heading */
  h1: string;
  /** H2 headings in the order they appear on the page */
  h2: string[];
  /** Primary keyword this route owns */
  primaryKeyword: string;
  /** Supporting keyword variants (natural language) */
  supportingKeywords: string[];
  /** Breadcrumb chain (array of {label, path}; last entry is current page) */
  breadcrumbs: { label: string; path: string }[];
  /** Contextual links to other routes (paths) */
  contextualLinks: string[];
  /** Whether the route is approved for publication */
  publishStatus: PublishStatus;
  /** Short label for navigation menus */
  navLabel: string;
  /** Group for footer linking */
  footerGroup: "services" | "pricing" | "about" | "legal" | "conversion";
}

const HOME = "/";

export const routeRegistry: RouteMeta[] = [
  {
    path: HOME,
    id: "home",
    title: "Marble Polishing Singapore | Residential & Commercial",
    description:
      "Enquire about marble polishing in Singapore for HDB, condo and commercial properties. We coordinate assessments with independent service partners.",
    h1: "Marble Polishing Services in Singapore",
    h2: [
      "Residential Marble Polishing",
      "Commercial Marble Polishing",
      "Marble Restoration Options",
      "How Enquiry Coordination Works",
      "Common Marble Problems",
      "Frequently Asked Questions",
      "Request a Quotation",
    ],
    primaryKeyword: "marble polishing Singapore",
    supportingKeywords: [
      "marble floor polishing Singapore",
      "professional marble polishing Singapore",
    ],
    breadcrumbs: [{ label: "Home", path: HOME }],
    contextualLinks: [
      "/marble-restoration/",
      "/hdb-marble-polishing/",
      "/condo-marble-polishing/",
      "/commercial-marble-polishing/",
      "/marble-polishing-cost-singapore/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Home",
    footerGroup: "about",
  },
  {
    path: "/marble-restoration/",
    id: "restoration",
    title: "Marble Restoration Singapore | Treatment Options",
    description:
      "Marble restoration options in Singapore — grinding, honing, polishing, sealing and aftercare. Enquire for an independent assessment of your marble surface.",
    h1: "Marble Restoration Services in Singapore",
    h2: [
      "When Marble Restoration May Be Needed",
      "Common Damage Types",
      "Grinding, Honing and Polishing Explained",
      "Sealing and Aftercare",
      "Assessment and Service Coordination",
      "Frequently Asked Questions",
      "Request a Quote",
    ],
    primaryKeyword: "marble restoration Singapore",
    supportingKeywords: ["marble floor restoration", "restore damaged marble"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Marble Restoration", path: "/marble-restoration/" },
    ],
    contextualLinks: [
      "/marble-grinding/",
      "/marble-sealing/",
      "/marble-polishing-cost-singapore/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Restoration",
    footerGroup: "services",
  },
  {
    path: "/marble-grinding/",
    id: "grinding",
    title: "Marble Grinding Singapore | Surface Restoration",
    description:
      "Marble grinding in Singapore for uneven floors and deep damage. Learn when grinding may be appropriate, its limitations, and how an assessment helps decide.",
    h1: "Marble Grinding in Singapore",
    h2: [
      "When Grinding May Be Appropriate",
      "When Grinding Is Not Appropriate",
      "Typical Assessment and Process",
      "Risks and Surface Limitations",
      "Grinding vs Honing and Polishing",
      "Frequently Asked Questions",
      "Request an Assessment",
    ],
    primaryKeyword: "marble grinding Singapore",
    supportingKeywords: ["marble floor grinding", "uneven marble levelling"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Marble Restoration", path: "/marble-restoration/" },
      { label: "Marble Grinding", path: "/marble-grinding/" },
    ],
    contextualLinks: [
      "/marble-restoration/",
      "/marble-sealing/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Grinding",
    footerGroup: "services",
  },
  {
    path: "/marble-sealing/",
    id: "sealing",
    title: "Marble Sealing Singapore | Stone Protection",
    description:
      "Marble sealing in Singapore — what sealers do and don't prevent, surface preparation, and reapplication guidance. Enquire for an independent assessment.",
    h1: "Marble Sealing in Singapore",
    h2: [
      "When Marble Sealing May Help",
      "What Sealing Does and Does Not Prevent",
      "Surface Preparation and Assessment",
      "Maintenance and Reapplication",
      "Related Marble Treatments",
      "Frequently Asked Questions",
      "Request an Assessment",
    ],
    primaryKeyword: "marble sealing Singapore",
    supportingKeywords: ["marble floor sealing", "marble stone protection"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Marble Restoration", path: "/marble-restoration/" },
      { label: "Marble Sealing", path: "/marble-sealing/" },
    ],
    contextualLinks: [
      "/marble-restoration/",
      "/marble-grinding/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Sealing",
    footerGroup: "services",
  },
  {
    path: "/hdb-marble-polishing/",
    id: "hdb",
    title: "HDB Marble Floor Polishing Singapore | Quote",
    description:
      "HDB marble floor polishing enquiries in Singapore. Learn about treatment options for HDB homes, access considerations, and how to request a quotation.",
    h1: "HDB Marble Floor Polishing",
    h2: [
      "Marble Issues in HDB Homes",
      "Suitable Treatment Options",
      "Home Access and Preparation",
      "What to Expect from an Assessment",
      "Related Restoration Services",
      "Frequently Asked Questions",
      "Request a Quote",
    ],
    primaryKeyword: "HDB marble floor polishing",
    supportingKeywords: ["HDB marble polishing Singapore", "HDB marble restoration"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "HDB Marble Polishing", path: "/hdb-marble-polishing/" },
    ],
    contextualLinks: [
      "/marble-restoration/",
      "/condo-marble-polishing/",
      "/marble-polishing-cost-singapore/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "HDB",
    footerGroup: "services",
  },
  {
    path: "/condo-marble-polishing/",
    id: "condo",
    title: "Condo Marble Floor Polishing Singapore | Quote",
    description:
      "Condominium marble floor polishing in Singapore. Treatment options, management and access considerations, and how to request a tailored quote.",
    h1: "Condominium Marble Floor Polishing",
    h2: [
      "Marble Surfaces in Condominiums",
      "Common Wear and Finish Problems",
      "Treatment and Finish Options",
      "Management and Access Considerations",
      "Related Restoration Services",
      "Frequently Asked Questions",
      "Request a Quote",
    ],
    primaryKeyword: "condo marble floor polishing",
    supportingKeywords: [
      "condominium marble polishing Singapore",
      "condo marble restoration",
    ],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Condo Marble Polishing", path: "/condo-marble-polishing/" },
    ],
    contextualLinks: [
      "/marble-restoration/",
      "/hdb-marble-polishing/",
      "/marble-polishing-cost-singapore/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Condo",
    footerGroup: "services",
  },
  {
    path: "/commercial-marble-polishing/",
    id: "commercial",
    title: "Commercial Marble Polishing Singapore | Enquiries",
    description:
      "Commercial marble polishing enquiries in Singapore for lobbies, retail and office spaces. Restoration options, access and downtime planning guidance.",
    h1: "Commercial Marble Polishing in Singapore",
    h2: [
      "Commercial Marble Surface Challenges",
      "Relevant Building and Facility Types",
      "Restoration and Maintenance Options",
      "Access, Safety and Downtime Planning",
      "How Commercial Enquiries Are Assessed",
      "Frequently Asked Questions",
      "Request a Commercial Quote",
    ],
    primaryKeyword: "commercial marble polishing Singapore",
    supportingKeywords: [
      "commercial marble restoration",
      "marble lobby polishing",
    ],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Commercial Marble Polishing", path: "/commercial-marble-polishing/" },
    ],
    contextualLinks: [
      "/marble-restoration/",
      "/marble-polishing-cost-singapore/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Commercial",
    footerGroup: "services",
  },
  {
    path: "/marble-polishing-cost-singapore/",
    id: "cost",
    title: "Marble Polishing Cost Singapore | Pricing Factors",
    description:
      "What affects marble polishing cost in Singapore — area, condition, treatment and access. Learn what a quotation should include and request a tailored quote.",
    h1: "Marble Polishing Cost in Singapore",
    h2: [
      "What Affects Marble Polishing Cost",
      "Polishing vs Restoration Pricing",
      "Area, Condition and Access Factors",
      "What a Written Quotation Should Include",
      "Frequently Asked Pricing Questions",
      "Request a Tailored Quote",
    ],
    primaryKeyword: "marble polishing cost Singapore",
    supportingKeywords: [
      "marble polishing price Singapore",
      "marble polishing price per sqft",
    ],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Marble Polishing Cost", path: "/marble-polishing-cost-singapore/" },
    ],
    contextualLinks: [
      "/hdb-marble-polishing/",
      "/condo-marble-polishing/",
      "/commercial-marble-polishing/",
      "/request-a-quote/",
    ],
    publishStatus: "published",
    navLabel: "Pricing",
    footerGroup: "pricing",
  },
  {
    path: "/about-us/",
    id: "about",
    title: "About Us | Singapore Marble Polishing",
    description:
      "About SingaporeMarblePolishing.com — a lead coordination website that connects enquiries with independent marble polishing service partners in Singapore.",
    h1: "About Singapore Marble Polishing",
    h2: [
      "What This Website Does",
      "How Enquiries Are Coordinated",
      "Independent Service Partners",
      "Our Approach to Accurate Information",
      "Contact and Enquiries",
    ],
    primaryKeyword: "Singapore Marble Polishing about",
    supportingKeywords: ["marble polishing enquiry Singapore"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "About Us", path: "/about-us/" },
    ],
    contextualLinks: ["/request-a-quote/"],
    publishStatus: "published",
    navLabel: "About",
    footerGroup: "about",
  },
  {
    path: "/request-a-quote/",
    id: "quote",
    title: "Request a Marble Polishing Quote | Singapore",
    description:
      "Request a marble polishing quotation in Singapore. Tell us about your marble surface and issue. We coordinate enquiries with independent service partners.",
    h1: "Request a Marble Polishing Quotation",
    h2: [
      "Tell Us About Your Marble Surface",
      "What Happens After You Enquire",
      "Contact Options",
      "How Your Information Is Used",
    ],
    primaryKeyword: "marble polishing quotation Singapore",
    supportingKeywords: ["marble polishing estimate", "marble restoration quote"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Request a Quote", path: "/request-a-quote/" },
    ],
    contextualLinks: ["/about-us/", "/privacy-policy/"],
    publishStatus: "published",
    navLabel: "Request a Quote",
    footerGroup: "conversion",
  },
  {
    path: "/privacy-policy/",
    id: "privacy",
    title: "Privacy Policy | Singapore Marble Polishing",
    description:
      "Privacy policy for SingaporeMarblePolishing.com — how enquiry information is collected, used and shared with independent service partners.",
    h1: "Privacy Policy",
    h2: [
      "Who Handles Your Information",
      "What We Collect",
      "Why We Use and Share It",
      "Retention and Security",
      "Your Requests and Contact",
      "Updates to This Policy",
    ],
    primaryKeyword: "privacy policy marble polishing Singapore",
    supportingKeywords: ["PDPA enquiry handling Singapore"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Privacy Policy", path: "/privacy-policy/" },
    ],
    contextualLinks: ["/terms-and-conditions/", "/request-a-quote/"],
    publishStatus: "published",
    navLabel: "Privacy Policy",
    footerGroup: "legal",
  },
  {
    path: "/terms-and-conditions/",
    id: "terms",
    title: "Terms and Conditions | Singapore Marble Polishing",
    description:
      "Terms and conditions for SingaporeMarblePolishing.com — enquiry service, independent service providers, quotations and information limitations.",
    h1: "Terms and Conditions",
    h2: [
      "Website and Enquiry Service",
      "Independent Service Providers",
      "Quotations and Service Arrangements",
      "Information and Limitations",
      "Contact and Updates",
    ],
    primaryKeyword: "terms and conditions marble polishing Singapore",
    supportingKeywords: ["marble polishing enquiry terms"],
    breadcrumbs: [
      { label: "Home", path: HOME },
      { label: "Terms and Conditions", path: "/terms-and-conditions/" },
    ],
    contextualLinks: ["/privacy-policy/", "/request-a-quote/"],
    publishStatus: "published",
    navLabel: "Terms & Conditions",
    footerGroup: "legal",
  },
];

// ---------- Derived helpers ----------

const allPaths = routeRegistry.map((r) => r.path);

if (new Set(allPaths).size !== allPaths.length) {
  throw new Error("Duplicate route path detected in routeRegistry");
}

if (allPaths.length !== 12) {
  throw new Error(
    `routeRegistry must contain exactly 12 routes; found ${allPaths.length}`
  );
}

export function getRoute(path: string): RouteMeta | undefined {
  return routeRegistry.find((r) => r.path === path);
}

export function getPublishedRoutes(): RouteMeta[] {
  return routeRegistry.filter((r) => r.publishStatus === "published");
}

export const siteOrigin: string = (
  import.meta.env.PUBLIC_SITE_URL as string | undefined
  ?? "https://singaporemarblepolishing.com"
).replace(/\/$/, "");

export const siteEnv: string = (
  import.meta.env.SITE_ENV as string | undefined
  ?? "development"
);
