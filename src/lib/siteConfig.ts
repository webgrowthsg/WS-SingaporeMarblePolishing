/**
 * Centralised site configuration.
 * Values that are unverified are left blank so the UI can conditionally
 * hide the corresponding elements. This prevents fake contact details
 * from appearing on the public site.
 */

export const siteConfig = {
  name: "Singapore Marble Polishing",
  domain: "singaporemarblepolishing.com",
  whatsappNumber:
    (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "+6593485255",
  telephone: (import.meta.env.VITE_TELEPHONE as string | undefined) ?? "",
  email: (import.meta.env.VITE_EMAIL_ADDRESS as string | undefined) ?? "",
  ga4Id: (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined) ?? "",
  gtmId: (import.meta.env.VITE_GTM_CONTAINER_ID as string | undefined) ?? "",
  siteEnv: (import.meta.env.SITE_ENV as string | undefined) ?? "development",
};

/**
 * WhatsApp deep link that opens a pre-filled chat.
 * `text` is URL-encoded automatically.
 */
export function whatsappLink(message?: string): string {
  const num = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${num}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string | null {
  if (!siteConfig.telephone) return null;
  return `tel:${siteConfig.telephone.replace(/\s/g, "")}`;
}

export function emailLink(): string | null {
  if (!siteConfig.email) return null;
  return `mailto:${siteConfig.email}`;
}
