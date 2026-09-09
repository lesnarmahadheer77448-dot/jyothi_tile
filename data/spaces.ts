import { SpaceType } from "@/types";

export interface SpaceMetadata {
  id: SpaceType;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  recommendedFinishes: string[];
  recommendedSizes: string[];
  recommendedMaterials: string[];
  designTips: string[];
  architecturalTips?: string[];
}

export const spacesData: SpaceMetadata[] = [
  {
    id: "living-room",
    slug: "living-room",
    name: "Living Room & Lounges",
    tagline: "Expansive Formats for Grand Social Sanctuaries",
    description: "The visual anchor of the residence. We recommend seamless large-format slabs (120×180 cm or 120×240 cm) to minimize grout joint interruptions and expand the spatial perspective.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    recommendedFinishes: ["High Gloss / Polished", "Silk Matte", "Bookmatch"],
    recommendedSizes: ["120 × 180 cm", "120 × 240 cm", "80 × 160 cm"],
    recommendedMaterials: ["Polished Glazed Vitrified (PGVT)", "Sintered Stone Slab"],
    designTips: [
      "Select high-reflection mirror polish to maximize natural window light in north-facing living areas.",
      "Pair bookmatched marble slabs on the entertainment wall with warm silk-matte flooring for layered tactile contrast."
    ]
  },
  {
    id: "bathroom",
    slug: "bathroom",
    name: "Baths & Wellness Spas",
    tagline: "Tactile Carvings & Anti-Microbial Masterpiece Suites",
    description: "Transform daily rituals into five-star hospitality spa experiences. Our vitrified porcelain collections offer zero water permeability (<0.05%) and slip-resistant elegance.",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop",
    recommendedFinishes: ["Carving & Fluted", "Satin & Honed", "Silk Matte"],
    recommendedSizes: ["80 × 160 cm", "60 × 120 cm", "120 × 240 cm"],
    recommendedMaterials: ["Glazed Vitrified (GVT)", "Full Body Porcelain", "Sintered Stone Slab"],
    designTips: [
      "Use 3D fluted carving tiles on vanity splash zones for grazing wall sconce illumination.",
      "Specify R10 slip-rated satin finishes on shower pans to ensure safety without abrasive textures."
    ]
  },
  {
    id: "kitchen",
    slug: "kitchen",
    name: "Culinary & Kitchen Islands",
    tagline: "Zero-Stain Sintered Slabs & Exotic Natural Granite",
    description: "Where intense heat, turmeric spices, citrus acids, and high-traffic cooking demand indestructible surfaces that never compromise on sculptural grandeur.",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    recommendedFinishes: ["Leather Finish", "Silk Matte", "Polished"],
    recommendedSizes: ["320 × 195 cm (Slabs)", "120 × 240 cm"],
    recommendedMaterials: ["Natural Granite", "Sintered Stone Slab"],
    designTips: [
      "Choose 20mm or 30mm natural Brazilian Titanium or Patagonia Granite for cantilevered waterfall breakfast islands.",
      "Ensure backsplashes utilize non-porous sintered stone to resist hot oil splatters."
    ]
  },
  {
    id: "outdoor",
    slug: "outdoor",
    name: "Terraces, Facades & Pools",
    tagline: "R11 Anti-Skid, UV-Stable & Frost-Proof Architectural Surfaces",
    description: "Engineered for intense sunlight exposure, monsoon downpours, and thermal shocks. Full-body vitrified porcelain that retains its original tone across decades.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    recommendedFinishes: ["Anti-Skid / R11 Rustic", "Flamed", "Rough Stone"],
    recommendedSizes: ["60 × 120 cm", "80 × 160 cm"],
    recommendedMaterials: ["Full Body Porcelain", "Natural Granite"],
    designTips: [
      "Always verify R11 slip rating certification for poolside coping and uncovered verandas.",
      "Opt for Ceppo di Gré terrazzo textures to effortlessly conceal garden dust and outdoor leaves."
    ]
  }
];

