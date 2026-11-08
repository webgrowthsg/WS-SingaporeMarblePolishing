export interface SiteImage { src: string; alt: string; width: number; height: number }
/** Real stock-photo source URLs. Stock imagery does not depict our projects or partners. */
const photo = (id: string, alt: string): SiteImage => ({
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`,
  alt, width: 1200, height: 800,
});
export const pageImages: Record<string, SiteImage> = {
  "/": photo("6987720", "Room and kitchen interior with marble flooring"),
  "/marble-restoration/": photo("6634144", "Natural marble surface showing veining"),
  "/marble-grinding/": photo("9658110", "Stone surface with contrasting rough and smooth texture"),
  "/marble-sealing/": photo("7718463", "Close-up photograph of natural marble surface"),
  "/hdb-marble-polishing/": photo("6538946", "Compact modern apartment hallway with marble flooring; illustrative stock photo, not identified as HDB"),
  "/condo-marble-polishing/": photo("6920449", "Modern residential living room with marble accents"),
  "/commercial-marble-polishing/": photo("14613453", "Commercial interior with marble flooring"),
  "/marble-polishing-cost-singapore/": photo("7718458", "Beige natural marble surface texture"),
  "/about-us/": photo("6634141", "Close-up of white marble natural veining"),
  "/request-a-quote/": photo("6032411", "Residential hallway with marble flooring"),
};
export const serviceImages: Record<string, SiteImage> = {
  "/marble-restoration/": pageImages["/marble-restoration/"],
  "/marble-grinding/": pageImages["/marble-grinding/"],
  "/marble-sealing/": pageImages["/marble-sealing/"],
  "/hdb-marble-polishing/": pageImages["/hdb-marble-polishing/"],
  "/condo-marble-polishing/": pageImages["/condo-marble-polishing/"],
  "/commercial-marble-polishing/": pageImages["/commercial-marble-polishing/"],
};
export const sectionImages: Record<string, SiteImage> = {
  "Residential Marble Polishing": photo("6980664", "Residential hallway with marble tiled flooring"),
  "Commercial Marble Polishing": photo("33685861", "Modern interior with marble flooring and wood detailing"),
  "Marble Restoration Options": photo("7718459", "Brown natural marble veining close-up"),
};
