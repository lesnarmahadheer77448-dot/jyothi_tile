import { LookbookRoom } from "@/types";

export const lookbooksData: LookbookRoom[] = [
  {
    id: "luxury-marble-living-suite",
    slug: "luxury-marble-living-suite",
    title: "The Grand Mediterranean Salone",
    subtitle: "A Masterclass in Continuous Vein Flow & Warm Alabaster Reflections",
    spaceType: "living-room",
    styleTag: "Italian Neo-Classic",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    narrative: "Designed for a private coastal residence, this double-height living room utilizes uninterrupted 120×180cm Calacatta Luxe Royale on the floor plane, anchoring low-slung Italian leather sofas. A monolithic Titanium Gold Granite fireplace cantilever introduces tactile tension against the luminous gloss.",
    designer: "Atelier V. Rossi & Partners",
    location: "Alibaug Luxury Waterfront, Mumbai",
    hotspots: [
      {
        xPercent: 48,
        yPercent: 78,
        title: "Main Floor Surface",
        productRole: "Floor Surface",
        productId: "calacatta-luxe-120-180",
        productName: "Calacatta Luxe Royale (120×180 cm)",
        specs: "High Gloss PGVT • Nano Polish • Italian Vein",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
      },
      {
        xPercent: 72,
        yPercent: 42,
        title: "Architectural Fireplace Cantilever",
        productRole: "Countertop & Island",
        productId: "titanium-leather-granite",
        productName: "Titanium Gold Leather Granite",
        specs: "30mm Solid Natural Slab • Velvet Leather Touch",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
      },
      {
        xPercent: 24,
        yPercent: 36,
        title: "Feature Accent Column",
        productRole: "Feature Wall",
        productId: "statuario-fluted-carving",
        productName: "Statuario Fluted Carving (80×160 cm)",
        specs: "3D Tactile Fluting • Anti-Glare Matte",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop"
      }
    ],
    usedProducts: [
      {
        role: "Primary Floor Surface",
        productId: "calacatta-luxe-120-180",
        productName: "Calacatta Luxe Royale",
        spec: "120 × 180 cm • High Gloss",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
      },
      {
        role: "Monolithic Fireplace Hearth",
        productId: "titanium-leather-granite",
        productName: "Titanium Gold Leather Granite",
        spec: "30 mm Slab • Leather Finish",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
      },
      {
        role: "Fluted Feature Wall",
        productId: "statuario-fluted-carving",
        productName: "Statuario Fluted Carving",
        spec: "80 × 160 cm • 3D Carving",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "minimalist-japandi-culinary-suite",
    slug: "minimalist-japandi-culinary-suite",
    title: "The Warm Travertine Culinary Studio",
    subtitle: "Organic Tones, Seamless Waterfall Slabs & Zero-Stain Vitrified Precision",
    spaceType: "kitchen",
    styleTag: "Warm Japandi Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
    narrative: "Created for an avid culinary enthusiast, this kitchen pairs monolithic Roman Travertine sintered stone on the expansive 3.2-meter island with blonde Nordic Oak porcelain planks on the flooring. Every surface is resistant to heat up to 350°C and impervious to lemon acid and turmeric stains.",
    designer: "Studio Kanso Architecture",
    location: "Jubilee Hills Villa, Hyderabad",
    hotspots: [
      {
        xPercent: 52,
        yPercent: 62,
        title: "Monolithic Kitchen Island",
        productRole: "Countertop & Island",
        productId: "travertine-roman-silk",
        productName: "Travertine Roman Navona Silk (120×240 cm)",
        specs: "12mm Sintered Stone • Heat & Stain Proof",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
      },
      {
        xPercent: 44,
        yPercent: 88,
        title: "Warm Timber Floor Planks",
        productRole: "Floor Surface",
        productId: "nordic-oak-chevron-wood",
        productName: "Nordic White Oak Plank (20×120 cm)",
        specs: "Vitrified Porcelain • Zero Water Warp",
        image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop"
      }
    ],
    usedProducts: [
      {
        role: "Kitchen Island & Backsplash",
        productId: "travertine-roman-silk",
        productName: "Travertine Roman Navona Silk",
        spec: "120 × 240 cm • Sintered Stone",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
      },
      {
        role: "Flooring Base",
        productId: "nordic-oak-chevron-wood",
        productName: "Nordic White Oak Plank",
        spec: "20 × 120 cm • GVT Porcelain",
        image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "emerald-spa-wellness-bath",
    slug: "emerald-spa-wellness-bath",
    title: "The Serpentine Emerald Spa",
    subtitle: "Deep Verde Alpi Slabs Meet Sculptural Fluted Basins",
    spaceType: "bathroom",
    styleTag: "Biophilic Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop",
    narrative: "An immersive spa-grade sanctuary wrapping the wet enclosure in 2.4-meter Verde Alpi Emerald slabs. Paired with satin-honed Pietra Grey flooring to create a soothing, grounding barefoot sensation.",
    designer: "Lucent Interiors",
    location: "Sadashivanagar Penthouse, Bangalore",
    hotspots: [
      {
        xPercent: 65,
        yPercent: 40,
        title: "Serpentine Wet Wall",
        productRole: "Feature Wall",
        productId: "verde-alpi-emerald-slab",
        productName: "Verde Alpi Emerald Botanical Slab",
        specs: "120×240 cm • Polished Sintered Stone",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
      },
      {
        xPercent: 35,
        yPercent: 82,
        title: "Spa Floor Surface",
        productRole: "Floor Surface",
        productId: "pietra-grey-matte",
        productName: "Pietra Grey Soft Honed (80×160 cm)",
        specs: "R10 Slip Rating • Satin Silk Touch",
        image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format&fit=crop"
      }
    ],
    usedProducts: [
      {
        role: "Slab Feature Enclosure",
        productId: "verde-alpi-emerald-slab",
        productName: "Verde Alpi Emerald Slab",
        spec: "120 × 240 cm • High Gloss",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
      },
      {
        role: "Honed Floor Plane",
        productId: "pietra-grey-matte",
        productName: "Pietra Grey Soft Honed",
        spec: "80 × 160 cm • Satin Honed",
        image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

