export interface ProjectItem {
  name: string;
  category: string;
  location: string;
  href: string;
  image: string;
  summary: string;
  notes: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    name: "Osaka Beauty House",
    category: "Beauty Salon",
    location: "Chicago, IL",
    href: "https://beautyhouseosaka.com/",
    image: "/images/projects/osakabeautyhouse.webp",
    summary:
      "A premium beauty salon website built around Russian manicure, lash services, and a luxury brand presentation for Chicago clients.",
    notes: [
      "Positioned around Japanese hospitality and Russian manicure precision.",
      "Structured to support bookings, training offers, and product sales.",
      "Designed to feel polished, editorial, and high-trust from the first screen.",
    ],
  },
  {
    name: "LS Beauty Salon",
    category: "Nail Studio",
    location: "Paoli, PA",
    href: "https://lsbeautysalon.com/",
    image: "/images/projects/lsbeutysalon.webp",
    summary:
      "A conversion-focused salon site for Russian manicure and pedicure services with strong local credibility and founder-led storytelling.",
    notes: [
      "Highlights expertise, team quality, and Google review proof.",
      "Supports service discovery, education, and online booking.",
      "Built to make a specialist nail studio feel established and premium.",
    ],
  },
  {
    name: "EcoTouch Service",
    category: "Exterior Cleaning",
    location: "Chicago Suburbs",
    href: "https://ecotouchservice.com/",
    image: "/images/projects/oneword-project-cleaning-website.webp",
    summary:
      "A service business website focused on eco-friendly exterior cleaning, lead capture, and local trust for homeowners across the Chicago area.",
    notes: [
      "Built around fast quote requests and strong service clarity.",
      "Combines neighborhood credibility, offers, and testimonials.",
      "Optimised for local search and action-oriented landing sections.",
    ],
  },
  {
    name: "Mira",
    category: "Equine Nutrition Brand",
    location: "International",
    href: "https://miragenza.com/",
    image: "/images/projects/miragenza.png",
    summary:
      "A product-led brand site for premium equine nutrition, designed to communicate science, trust, and performance at a global standard.",
    notes: [
      "Built to present complex product lines in a clear commercial flow.",
      "Balances premium storytelling with educational content and lead generation.",
      "Supports brand credibility with compliance, results, and lifecycle-based product positioning.",
    ],
  },
  {
    name: "DeeVa Nail Boutique",
    category: "Nail Boutique",
    location: "Chicago, IL",
    href: "https://deevasalon-v1.vercel.app/",
    image: "/images/projects/oneword-project-nailsalon-website.webp",
    summary:
      "A clean boutique experience for a West Loop nail studio, built to showcase pricing, premium service quality, and easy appointment booking.",
    notes: [
      "Presents detailed service rates without losing the luxury feel.",
      "Built around non-toxic positioning and meticulous salon standards.",
      "Encourages bookings while keeping the brand tone calm and refined.",
    ],
  },
  {
    name: "FACELINES Beauty Studio",
    category: "Beauty Studio",
    location: "Auburn, WA",
    href: "https://face-lines-beauty-studio.vercel.app/",
    image: "/images/projects/facelinestudio.webp",
    summary:
      "A multi-service beauty studio website that combines laser treatments, permanent makeup, skincare, and Russian manicure into one coherent brand experience.",
    notes: [
      "Designed to make a broad service offering feel focused and elegant.",
      "Supports online booking, service education, and local trust-building.",
      "Uses a softer luxury direction while still staying conversion-oriented.",
    ],
  },
  {
    name: "Elite Arrival",
    category: "Transportation Service",
    location: "Chicago, IL",
    href: "https://elite-arrival.com/",
    image: "/images/projects/oneword-project-limo-website.webp",
    summary:
      "A polished transportation website for Chicago limo and chauffeur services, built to present reliability, fleet quality, and direct booking intent.",
    notes: [
      "Structured around airport transfers, corporate rides, and event transportation.",
      "Uses a clear service flow to move visitors from browsing to booking faster.",
      "Built to reinforce punctuality, professionalism, and premium vehicle presentation.",
    ],
  },
];