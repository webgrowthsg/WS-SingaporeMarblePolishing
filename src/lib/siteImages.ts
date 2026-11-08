/** AI-generated editorial illustrations. Not photographs of real projects, partners or Singapore addresses. */
export interface SiteImage { src: string; alt: string; width: number; height: number }
const image = (file: string, alt: string): SiteImage => ({
  src: `/images/${file}.webp`, alt, width: 752, height: 496,
});
export const pageImages: Record<string, SiteImage> = {
  "/": image("home-marble", "Illustration of a residential interior with polished cream marble flooring"),
  "/marble-restoration/": image("restoration-machine", "Illustration of a rotary floor machine working on natural marble"),
  "/marble-grinding/": image("grinding-machine", "Illustration of a floor treatment machine on veined marble"),
  "/marble-sealing/": image("sealing-detail", "Illustrative close-up of a finished natural marble surface"),
  "/hdb-marble-polishing/": image("marble-surface", "Illustrative close-up of polished marble flooring, not a specific HDB flat"),
  "/condo-marble-polishing/": image("condo-marble", "Illustration of a modern apartment with polished marble flooring"),
  "/commercial-marble-polishing/": image("commercial-lobby", "Illustration of a commercial lobby with polished marble flooring"),
  "/marble-polishing-cost-singapore/": image("marble-finish-detail", "Illustration of natural marble surface texture and reflective finish"),
  "/about-us/": image("polishing-machine", "Illustration of a floor polishing machine on marble, not a partner photograph"),
  "/request-a-quote/": image("residential-marble", "Illustration of marble flooring in a residential interior"),
};
export const serviceImages: Record<string, SiteImage> = {
  "/hdb-marble-polishing/": pageImages["/hdb-marble-polishing/"],
  "/condo-marble-polishing/": pageImages["/condo-marble-polishing/"],
  "/commercial-marble-polishing/": pageImages["/commercial-marble-polishing/"],
  "/marble-restoration/": pageImages["/marble-restoration/"],
  "/marble-grinding/": pageImages["/marble-grinding/"],
  "/marble-sealing/": pageImages["/marble-sealing/"],
};
export const sectionImages: Record<string, SiteImage> = {
  "Residential Marble Polishing": image("residential-marble", "Illustration of polished marble in a residential interior"),
  "Commercial Marble Polishing": image("office-lobby", "Illustration of a commercial marble-floor lobby"),
  "Marble Restoration Options": image("stone-treatment", "Illustration of floor treatment equipment working on marble"),
  "When Marble Restoration May Be Needed": image("marble-surface", "Illustration of marble texture and finish"),
  "When Grinding May Be Appropriate": image("grinding-machine", "Illustration of floor treatment machinery on marble"),
  "When Marble Sealing May Help": image("sealing-detail", "Illustration of natural marble surface texture"),
  "Marble Issues in HDB Homes": image("marble-surface", "Illustration of marble flooring, not an identified HDB residence"),
  "Marble Surfaces in Condominiums": image("condo-marble", "Illustration of marble flooring in a modern apartment"),
  "Commercial Marble Surface Challenges": image("hotel-lobby", "Illustration of marble flooring in a hospitality-style lobby"),
  "What Affects Marble Polishing Cost": image("marble-finish-detail", "Illustration of marble finish and texture"),
  "What This Website Does": image("polishing-machine", "Illustration of a marble polishing machine"),
  "What Happens After You Enquire": image("residential-marble", "Illustration of marble flooring in a residential interior"),
};
