import { ArchitecturalProject } from "@/types";

export const projectsData: ArchitecturalProject[] = [
  {
    id: "the-palm-villa-residence",
    slug: "the-palm-villa-residence",
    title: "The Palm Sanctuary Estate",
    location: "Alibaug Coastal Belt, Maharashtra",
    year: "2025",
    architect: "Studio Lotus & Atelier Rossi",
    category: "Private Villa",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
    ],
    brief: "A 12,000 sq.ft private oceanfront sanctuary requiring unbroken monumental surfaces that withstand heavy coastal salt air while maintaining an atmosphere of quiet luxury and visual calm.",
    materialPalette: [
      {
        materialName: "Calacatta Luxe Royale (120×180 cm)",
        spec: "12-Layer Nano-Mirror PGVT",
        role: "Main Living & Foyer Plane",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop"
      },
      {
        materialName: "Titanium Gold Leather Granite",
        spec: "30mm Brazilian Exotic Slab",
        role: "Gourmet Island & Fireplace",
        thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop"
      },
      {
        materialName: "Ceppo Di Gré Terrazzo (60×120 cm)",
        spec: "Full Body Porcelain • R11 Anti-Skid",
        role: "Infinity Pool Deck & Verandas",
        thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop"
      }
    ],
    storySections: [
      {
        heading: "01 / The Architectural Intent",
        paragraph: "The architects envisioned a home that dissolved boundaries between indoor living and the Arabian Sea. Minimizing grout lines was paramount; thus, the 120×180cm large-format PGVT was specified with laser-calibrated 1mm joints and color-matched epoxy grout.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
      },
      {
        heading: "02 / Material Tactility & Performance",
        paragraph: "In the open-plan culinary kitchen, natural Titanium granite slabs were waterjet-profiled with mitred 45-degree waterfall aprons. Outside on the ocean-facing pool deck, Ceppo di Gré porcelain delivers tactile safety barefoot, unaffected by pool chlorine or tropical rains.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "the-minimalist-sky-penthouse",
    slug: "the-minimalist-sky-penthouse",
    title: "The Sky Pavilion Penthouse",
    location: "Worli Sea Face, Mumbai",
    year: "2025",
    architect: "Morphogenesis & Vault Studio",
    category: "Luxury Penthouse",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop"
    ],
    brief: "A high-floor sky residence pairing dramatic obsidian bookmatched Nero Marquina with custom fluted Statuario carvings in private wellness chambers.",
    materialPalette: [
      {
        materialName: "Nero Marquina Velvet Bookmatch",
        spec: "120×180 cm Mirror Pair",
        role: "Lobby & Formal Lounge Wall",
        thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=400&auto=format&fit=crop"
      },
      {
        materialName: "Statuario Fluted Carving",
        spec: "80×160 cm 3D Relief",
        role: "Master Powder Room Wall",
        thumbnail: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=400&auto=format&fit=crop"
      }
    ],
    storySections: [
      {
        heading: "01 / Monolithic Contrast",
        paragraph: "By deliberately pairing dark obsidian stone with pure white sculptural carvings, the penthouse achieves a dramatic gallery-like experience elevated high above the city skyline.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  }
];

