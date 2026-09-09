export type SurfaceCategory = 'tiles' | 'granite' | 'slabs' | 'marble' | 'quartz';

export type SpaceType = 
  | 'living-room' 
  | 'bathroom' 
  | 'kitchen' 
  | 'bedroom' 
  | 'outdoor' 
  | 'commercial' 
  | 'facade' 
  | 'staircase';

export type TileFinish = 
  | 'High Gloss / Polished'
  | 'Silk Matte'
  | 'Carving & Fluted'
  | 'Bookmatch'
  | 'Satin & Honed'
  | 'Anti-Skid / R11 Rustic'
  | 'Leather & Flamed';

export type MaterialType = 
  | 'Glazed Vitrified (GVT)'
  | 'Polished Glazed Vitrified (PGVT)'
  | 'Full Body Porcelain'
  | 'Sintered Stone Slab'
  | 'Natural Granite'
  | 'Imported Italian Marble'
  | 'Engineered Quartz'
  | 'Ceramic Wall';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: SurfaceCategory;
  collectionId: string;
  collectionName: string;
  brand: string;
  material: MaterialType;
  finish: TileFinish;
  colorFamily: string;
  colorHex: string;
  size: string; // e.g. "120 × 180 cm"
  widthCm: number;
  heightCm: number;
  thicknessMm: number;
  application: string[]; // ["Floor", "Wall", "Countertop", "Exterior"]
  suitableSpaces: SpaceType[];
  priceSqFtEstimate?: string; // e.g. "₹145 – ₹195 / sq.ft"
  priceBand?: string;
  priceType: 'quote' | 'fixed' | 'range';
  waterAbsorption: string; // e.g. "< 0.05%"
  peiRating?: number; // 4 or 5
  slipRating?: string; // "R10", "R11"
  mohsHardness?: number; // 7, 8
  density?: string;
  compressiveStrength?: string;
  frostResistant: boolean;
  boxCoverageSqFt: number; // e.g. 23.25 sq.ft
  tilesPerBox: number; // e.g. 2
  origin: string; // "Italy", "Spain", "India", "Brazil"
  featured: boolean;
  isNew: boolean;
  inStock: boolean;
  stockStatus: 'In Stock' | 'Available to Order' | 'Limited Quarry Batch';
  leadTime: string; // "Immediate dispatch" or "7-10 days"
  description: string;
  editorialQuote?: string;
  mainImage: string;
  roomImages: string[];
  textureImage: string;
  edgeImage?: string;
  fullSlabImage?: string;
  bookmatchImages?: string[];
  recommendedGrout: string;
  matchingGraniteSku?: string;
  matchingWallTileSku?: string;
  tags: string[];
}

export interface GraniteSlab {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: 'granite';
  collectionId?: string;
  collectionName?: string;
  colorFamily: string;
  colorHex: string;
  origin: string; // e.g. "Norway", "Rajasthan, India", "Brazil"
  quarryLocation: string;
  finishesAvailable: string[]; // ["Polished", "Honed", "Leather Finish", "Flamed"]
  slabDimensions: string; // e.g. "320 × 195 cm (Average Slab)"
  thicknessOptions: string[]; // ["18 mm", "20 mm", "30 mm"]
  applications: string[]; // ["Kitchen Island", "Countertop", "Vanity", "Staircase", "Cladding"]
  waterAbsorption: string; // "< 0.02%"
  density: string; // "2.75 g/cm³"
  compressiveStrength: string; // "190 MPa"
  heatResistance: string; // "Up to 300°C"
  stainResistance: 'High' | 'Superior' | 'Ultra High';
  bookmatchAvailable: boolean;
  priceBand: string;
  priceSqFtEstimate?: string;
  inStock?: boolean;
  stockStatus?: string;
  currentBatchBlocks: string[]; // ["Batch #GR-884-A", "Batch #GR-884-B"]
  description: string;
  editorialNotes: string;
  mainImage: string;
  fullSlabImage: string;
  textureMacroImage: string;
  installedRoomImage: string;
  tags: string[];
}

export interface Collection {
  id: string;
  slug: string;
  name?: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage?: string;
  heroImage: string;
  accentColor: string;
  curatorNote: string;
  itemCount?: number;
  productIds: string[];
  featuredSpaces: SpaceType[];
  editorialBadge: string;
}

export interface LookbookRoom {
  id: string;
  slug: string;
  spaceSlug?: string;
  title: string;
  subtitle: string;
  spaceType: SpaceType;
  styleTag: string;
  heroImage: string;
  beforeImage?: string;
  narrative: string;
  designer: string;
  location: string;
  hotspots: {
    xPercent: number;
    yPercent: number;
    title: string;
    productRole: 'Floor Surface' | 'Feature Wall' | 'Countertop & Island' | 'Accent Column' | 'Grout Specification';
    productId: string;
    productName: string;
    specs: string;
    image: string;
  }[];
  usedProducts: {
    role: string;
    productId: string;
    productName: string;
    spec: string;
    image: string;
  }[];
}

export interface ArchitecturalProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  architect: string;
  category: 'Private Villa' | 'Luxury Penthouse' | 'Boutique Hotel' | 'Flagship Commercial' | 'Modern Estate';
  coverImage: string;
  galleryImages: string[];
  brief: string;
  materialPalette: {
    materialName: string;
    spec: string;
    role: string;
    thumbnail: string;
  }[];
  storySections: {
    heading: string;
    paragraph: string;
    image: string;
  }[];
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  landmark: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  timings?: string;
  features: string[];
  mapEmbedUrl: string;
  heroImage: string;
  interiorImages: string[];
  galleryImages?: string[];
  displaySurfacesCount: number;
  valetParking: boolean;
  privateDesignSuite: boolean;
}



export interface QuoteItem {
  productId: string;
  name: string;
  sku: string;
  type: 'tile' | 'granite';
  image: string;
  size: string;
  finish: string;
  roomSpace?: string;
  areaSqFt?: number;
  boxesCount?: number;
  boxesNeeded?: number;
  wastagePercent: number;
  priceSqFtEstimate?: string;
  product?: Product | GraniteSlab;
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  projectType: string;
  sqFtRequirement?: string;
  selectedProducts: string[];
  message: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Showroom Visit';
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Showroom Booked' | 'Closed';
}


