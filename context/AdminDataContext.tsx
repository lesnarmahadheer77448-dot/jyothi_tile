'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, GraniteSlab, Collection, SurfaceCategory, SpaceType } from '@/types';
import { productsData as defaultProducts } from '@/data/products';
import { graniteData as defaultGranite } from '@/data/granite';
import { collectionsData as defaultCollections } from '@/data/collections';
import { spacesData as defaultSpaces, SpaceMetadata } from '@/data/spaces';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, onSnapshot, deleteDoc, writeBatch } from 'firebase/firestore';

export interface UnifiedSurface {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: SurfaceCategory | string;
  collectionId?: string;
  collectionName?: string;
  brand?: string;
  material?: string;
  finish?: string;
  finishesAvailable?: string[];
  colorFamily?: string;
  colorHex?: string;
  size?: string;
  slabDimensions?: string;
  widthCm?: number;
  heightCm?: number;
  thicknessMm?: number;
  application?: string[];
  suitableSpaces?: SpaceType[] | string[];
  priceSqFtEstimate?: string;
  priceBand?: string;
  priceType?: 'quote' | 'fixed' | 'range' | 'sqft' | 'box' | 'piece' | string;
  waterAbsorption?: string;
  peiRating?: number;
  mohsHardness?: number;
  frostResistant?: boolean;
  boxCoverageSqFt?: number;
  tilesPerBox?: number;
  origin?: string;
  quarryLocation?: string;
  featured?: boolean;
  isNew?: boolean;
  inStock?: boolean;
  stockStatus?: string;
  leadTime?: string;
  description: string;
  editorialQuote?: string;
  mainImage: string;
  roomImages?: string[];
  textureImage?: string;
  slabImages?: string[];
  recommendedGrout?: string;
  tags?: string[];
  matchingGraniteSku?: string;
  matchingWallTileSku?: string;
  currentBatchBlocks?: string[];

  // Warehouse & Admin metadata
  stockQuantityBoxes?: number;
  stockQuantitySlabs?: number;
  stockSqFt?: number;
  warehouseBin?: string;
  batchLotNumber?: string;
  minThreshold?: number;
  unitPrice?: number;
}

export interface InvoiceLineItem {
  productId: string;
  name: string;
  sku: string;
  type: 'tile' | 'granite';
  image: string;
  rateSqFt: number;
  areaSqFt: number;
  wastagePercent: number;
  boxesNeeded?: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  projectType: string;
  siteAddress: string;
  gstin?: string;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Draft' | 'Cancelled';
  paymentMode: 'Bank Transfer (NEFT/RTGS)' | 'UPI / Cheque' | 'Credit Card' | 'Pending';
  items: InvoiceLineItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxPercent: number; // 18% GST (9% CGST + 9% SGST)
  taxAmount: number;
  grandTotal: number;
  notes?: string;
}

export interface StockAdjustmentLog {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  changeType: 'RESTOCK' | 'DISPATCH' | 'ADJUSTMENT' | 'DAMAGE';
  quantityChanged: number;
  unit: 'Boxes' | 'Slabs';
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
}

export interface HeroScene {
  id: string;
  tag: string;
  tabLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  videoUrl?: string;
  fallbackImage: string;
  specs: { label: string; value: string }[];
  ctaText: string;
  ctaLink: string;
}

export interface WhatsAppEnquiry {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  productImage: string;
  source: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface CallbackRequest {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  projectType: string;
  notes: string;
  itemsSummary: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Closed';
}

interface AdminDataContextType {
  // Products
  products: UnifiedSurface[];
  addProduct: (newSurface: Partial<UnifiedSurface>) => void;
  updateProduct: (id: string, updatedFields: Partial<UnifiedSurface>) => void;
  deleteProduct: (id: string) => void;
  toggleStockStatus: (id: string) => void;

  // Stock
  adjustStock: (productId: string, quantityChange: number, reason: string, changeType?: 'RESTOCK' | 'DISPATCH' | 'ADJUSTMENT' | 'DAMAGE') => void;
  stockLogs: StockAdjustmentLog[];

  // Categories & Collections
  collections: Collection[];
  addCollection: (col: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, updated: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;

  // Spaces (Homepage Categories)
  spaces: SpaceMetadata[];
  updateSpaceImage: (id: string, imageUrl: string) => void;
  deleteSpaceImage: (id: string) => void;

  // Hero Slider
  heroScenes: HeroScene[];
  updateHeroScene: (id: string, updatedFields: Partial<HeroScene>) => void;

  // Billing & Invoices
  invoices: Invoice[];
  createInvoice: (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'date'>) => Invoice;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  deleteInvoice: (id: string) => void;

  // Sales aggregates
  totalGrossRevenue: number;
  totalSqFtSold: number;
  lowStockItems: UnifiedSurface[];
  totalInvoicesCount: number;

  // WhatsApp Enquiries
  whatsappEnquiries: WhatsAppEnquiry[];
  addWhatsAppEnquiry: (enquiry: Omit<WhatsAppEnquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateWhatsAppEnquiryStatus: (id: string, status: WhatsAppEnquiry['status']) => void;

  // Callback Requests
  callbackRequests: CallbackRequest[];
  addCallbackRequest: (request: Omit<CallbackRequest, 'id' | 'timestamp' | 'status'>) => void;
  updateCallbackRequestStatus: (id: string, status: CallbackRequest['status']) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<UnifiedSurface[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [spaces, setSpaces] = useState<SpaceMetadata[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stockLogs, setStockLogs] = useState<StockAdjustmentLog[]>([]);
  const [heroScenes, setHeroScenes] = useState<HeroScene[]>([]);
  const [whatsappEnquiries, setWhatsappEnquiries] = useState<WhatsAppEnquiry[]>([]);
  const [callbackRequests, setCallbackRequests] = useState<CallbackRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Firestore Seeding Logic
  const seedProducts = async () => {
    const initialSurfaces: UnifiedSurface[] = [
      ...defaultProducts.map((p, idx) => ({
        ...p,
        stockQuantityBoxes: [180, 240, 60, 420, 15, 310, 85, 520][idx % 8] || 150,
        stockSqFt: ([180, 240, 60, 420, 15, 310, 85, 520][idx % 8] || 150) * p.boxCoverageSqFt,
        warehouseBin: `Bay-A${(idx % 6) + 1}`,
        batchLotNumber: `Batch #LOT-${880 + idx}-GVT`,
        minThreshold: 50,
        unitPrice: Number(p.priceSqFtEstimate?.replace(/[^0-9]/g, '')?.slice(0, 3) || 165),
      })),
      ...defaultGranite.map((g, idx) => ({
        ...g,
        stockQuantitySlabs: [14, 8, 22, 6][idx % 4] || 10,
        stockSqFt: ([14, 8, 22, 6][idx % 4] || 10) * 65,
        warehouseBin: `Slab-Yard-${idx + 1}`,
        batchLotNumber: g.currentBatchBlocks?.[0] || `Batch #GR-${700 + idx}`,
        minThreshold: 5,
        unitPrice: 420,
      })),
    ];
    
    const batch = writeBatch(db);
    initialSurfaces.forEach(surface => {
      const docRef = doc(db, 'products', surface.id);
      batch.set(docRef, surface);
    });
    await batch.commit();
  };
  
  const seedCollections = async () => {
    const batch = writeBatch(db);
    defaultCollections.forEach(c => {
      const docRef = doc(db, 'collections', c.id);
      batch.set(docRef, c);
    });
    await batch.commit();
  };

  const seedSpaces = async () => {
    const batch = writeBatch(db);
    defaultSpaces.forEach(s => {
      const docRef = doc(db, 'spaces', s.id);
      batch.set(docRef, s);
    });
    await batch.commit();
  };

  const seedHeroScenes = async () => {
    const defaultHeroScenes: HeroScene[] = [
      {
        id: 'monumental-slabs',
        tag: 'THE ARCHITECTURAL EDIT',
        tabLabel: '01 MONUMENTAL SLABS',
        headlineLine1: 'JYOTHI TILES',
        headlineLine2: 'SURFACES THAT DEFINE SPACE',
        description: 'Transforming luxury residences with 120×240 cm sintered stone slabs, 12-layer nano-mirror gloss, and bookmatch precision.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-large-windows-and-marble-floor-41484-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2400&auto=format&fit=crop',
        specs: [
          { label: 'MAX FORMAT', value: '120 × 240 CM' },
          { label: 'WATER ABSORPTION', value: '< 0.02%' },
          { label: 'SURFACES IN STOCK', value: '12,000+' }
        ],
        ctaText: 'EXPLORE COLLECTIONS',
        ctaLink: '/products',
      },
      {
        id: 'exotic-granite',
        tag: 'NATURAL STONE ATELIER',
        tabLabel: '02 EXOTIC GRANITE',
        headlineLine1: 'RAW EARTH MONOLITHS',
        headlineLine2: 'BILLION-YEAR CHARACTER',
        description: 'Direct quarry shipments of Titanium Gold, Patagonia Quartzite, and Black Galaxy. 350°C thermal resistance for statement kitchen islands.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-with-large-marble-countertop-41487-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=85&w=2400&auto=format&fit=crop',
        specs: [
          { label: 'SLAB DIMENSIONS', value: '320 × 195 CM' },
          { label: 'THICKNESS', value: '18 / 20 / 30 MM' },
          { label: 'HEAT RESISTANCE', value: 'UP TO 350°C' }
        ],
        ctaText: 'VIEW GRANITE SLABS',
        ctaLink: '/granite',
      },
      {
        id: 'wellness-spa',
        tag: 'TACTILE WELLNESS SPAS',
        tabLabel: '03 CARVED & FLUTED',
        headlineLine1: 'WHISPER-QUIET LUXURY',
        headlineLine2: '3D TACTILE SANCTUARIES',
        description: 'Fluted carving porcelain and silk-matte travertines engineered for five-star private bath spas and master suites.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-bathroom-interior-41486-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=85&w=2400&auto=format&fit=crop',
        specs: [
          { label: 'SLIP RESISTANCE', value: 'R10 / R11 RATED' },
          { label: 'ANTI-MICROBIAL', value: 'ZERO POROSITY' },
          { label: 'TEXTURES', value: '3D FLUTED & SILK' }
        ],
        ctaText: 'EXPLORE SURFACES',
        ctaLink: '/products',
      },
      {
        id: 'facades-outdoor',
        tag: 'EXTERIOR & LANDSCAPE',
        tabLabel: '04 OUTDOOR & FACADES',
        headlineLine1: 'WEATHERPROOF GRANDEUR',
        headlineLine2: 'ENDURING ACROSS GENERATIONS',
        description: 'UV-stable, frost-proof vitrified surfaces and rugged Ceppo di Gré textures designed for monsoon rains, pool coping, and modern facades.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-house-exterior-with-swimming-pool-41485-large.mp4',
        fallbackImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=2400&auto=format&fit=crop',
        specs: [
          { label: 'DURABILITY', value: 'PEI-5 HIGH TRAFFIC' },
          { label: 'UV STABILITY', value: '100% COLOR RETENTION' },
          { label: 'WARRANTY', value: '10-YEAR ASSURANCE' }
        ],
        ctaText: 'SHOP THE LOOK',
        ctaLink: '/shop-the-look',
      },
    ];

    const batch = writeBatch(db);
    defaultHeroScenes.forEach(s => {
      const docRef = doc(db, 'heroScenes', s.id);
      batch.set(docRef, s);
    });
    await batch.commit();
  };

  const seedInvoices = async () => {
    const initialInvoices: Invoice[] = [
      {
        id: 'inv-1081',
        invoiceNumber: 'INV-JT-2026-1081',
        clientName: 'Ar. Rajesh Mehta (Studio Lotus)',
        clientPhone: '9820089123',
        clientEmail: 'rajesh@studiolotus.in',
        projectType: 'Alibaug Seafront Villa',
        siteAddress: 'Plot 14, Mandwa Beach Road, Alibaug, Maharashtra',
        gstin: '27AAAAA0000A1Z5',
        date: '2026-08-28',
        dueDate: '2026-09-10',
        status: 'Paid',
        paymentMode: 'Bank Transfer (NEFT/RTGS)',
        items: [
          {
            productId: 'calacatta-luxe-120-180',
            name: 'Calacatta Luxe Royale Sintered Porcelain',
            sku: 'JT-SLAB-108',
            type: 'tile',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
            rateSqFt: 185,
            areaSqFt: 3200,
            wastagePercent: 10,
            boxesNeeded: 152,
            lineTotal: 651200,
          }
        ],
        subtotal: 651200,
        discountPercent: 5,
        discountAmount: 32560,
        taxPercent: 18,
        taxAmount: 111355.20,
        grandTotal: 729995.20,
        notes: 'High-polish bookmatch pairing included. Delivery on crane flatbed.',
      }
    ];

    const batch = writeBatch(db);
    initialInvoices.forEach(inv => {
      const docRef = doc(db, 'invoices', inv.id);
      batch.set(docRef, inv);
    });
    await batch.commit();
  };

  useEffect(() => {
    // Real-time Firestore Sync
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UnifiedSurface[]);
      } else {
        seedProducts(); // Seed if empty
      }
    });

    const unsubCollections = onSnapshot(collection(db, 'collections'), (snapshot) => {
      if (!snapshot.empty) {
        setCollections(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Collection[]);
      } else {
        seedCollections();
      }
    });

    const unsubSpaces = onSnapshot(collection(db, 'spaces'), (snapshot) => {
      if (!snapshot.empty) {
        setSpaces(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SpaceMetadata[]);
      } else {
        seedSpaces();
      }
    });

    const unsubInvoices = onSnapshot(collection(db, 'invoices'), (snapshot) => {
      if (!snapshot.empty) {
        setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Invoice[]);
      } else {
        seedInvoices();
      }
    });

    const unsubLogs = onSnapshot(collection(db, 'stockLogs'), (snapshot) => {
      if (!snapshot.empty) {
        setStockLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StockAdjustmentLog[]);
      }
    });

    const unsubHeroScenes = onSnapshot(collection(db, 'heroScenes'), (snapshot) => {
      if (!snapshot.empty) {
        setHeroScenes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HeroScene[]);
      } else {
        seedHeroScenes();
      }
    });

    const unsubEnquiries = onSnapshot(collection(db, 'whatsappEnquiries'), (snapshot) => {
      if (!snapshot.empty) {
        setWhatsappEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WhatsAppEnquiry[]);
      }
    });

    const unsubCallbacks = onSnapshot(collection(db, 'callbackRequests'), (snapshot) => {
      if (!snapshot.empty) {
        setCallbackRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CallbackRequest[]);
      }
    });

    setIsLoaded(true);

    return () => {
      unsubProducts();
      unsubCollections();
      unsubSpaces();
      unsubInvoices();
      unsubLogs();
      unsubHeroScenes();
      unsubEnquiries();
      unsubCallbacks();
    };
  }, []);

  // Product Actions
  const addProduct = async (newSurface: Partial<UnifiedSurface>) => {
    const id = newSurface.slug || `jt-surface-${Date.now()}`;
    const productItem: UnifiedSurface = {
      id,
      name: newSurface.name || 'New Architectural Surface',
      slug: newSurface.slug || id,
      sku: newSurface.sku || `JT-SKU-${Math.floor(100 + Math.random() * 900)}`,
      category: newSurface.category || 'tiles',
      collectionId: newSurface.collectionId || 'the-marble-edit',
      collectionName: newSurface.collectionName || 'The Marble Edit',
      brand: 'Jyothi Tiles Atelier',
      material: newSurface.material || 'Glazed Vitrified (GVT)',
      finish: newSurface.finish || 'High Gloss / Polished',
      colorFamily: newSurface.colorFamily || 'White / Carrara',
      colorHex: newSurface.colorHex || '#F5F5F5',
      size: newSurface.size || '120 × 180 cm',
      widthCm: newSurface.widthCm || 120,
      heightCm: newSurface.heightCm || 180,
      thicknessMm: newSurface.thicknessMm || 9,
      application: newSurface.application || ['Floor', 'Wall'],
      suitableSpaces: newSurface.suitableSpaces || ['living-room', 'bathroom'],
      priceSqFtEstimate: newSurface.priceSqFtEstimate !== undefined ? newSurface.priceSqFtEstimate : `₹${newSurface.unitPrice || 175} / sq.ft`,
      priceBand: newSurface.priceBand || 'Premium Range',
      priceType: 'quote',
      waterAbsorption: newSurface.waterAbsorption || '< 0.02%',
      peiRating: 4,
      mohsHardness: 7,
      frostResistant: true,
      boxCoverageSqFt: newSurface.boxCoverageSqFt || 23.25,
      tilesPerBox: newSurface.tilesPerBox || 2,
      origin: newSurface.origin || 'India',
      featured: Boolean(newSurface.featured),
      isNew: true,
      inStock: true,
      stockStatus: 'In Stock',
      leadTime: 'Immediate Dispatch',
      description: newSurface.description || 'Premium architectural surface curated for monumental residential spaces.',
      mainImage: newSurface.mainImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      roomImages: newSurface.roomImages || ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop'],
      textureImage: newSurface.textureImage || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
      recommendedGrout: 'Titanium White Epoxy',
      tags: newSurface.tags || ['Porcelain', 'Luxury', 'Vitrified'],
      stockQuantityBoxes: newSurface.stockQuantityBoxes || 100,
      stockSqFt: (newSurface.stockQuantityBoxes || 100) * (newSurface.boxCoverageSqFt || 23.25),
      warehouseBin: newSurface.warehouseBin || 'Bay-A1',
      batchLotNumber: newSurface.batchLotNumber || `Batch #LOT-${Math.floor(100 + Math.random() * 900)}-GVT`,
      minThreshold: newSurface.minThreshold || 30,
      unitPrice: newSurface.unitPrice !== undefined ? newSurface.unitPrice : 175,
    };

    await setDoc(doc(db, 'products', id), productItem);
  };

  const updateProduct = async (id: string, updatedFields: Partial<UnifiedSurface>) => {
    const item = products.find(p => p.id === id);
    if (!item) return;
    
    const updated = { ...updatedFields };
    if (updatedFields.stockQuantityBoxes !== undefined && item.boxCoverageSqFt) {
      updated.stockSqFt = updatedFields.stockQuantityBoxes * item.boxCoverageSqFt;
    }

    // Firebase setDoc throws error on undefined values, so we must remove or nullify them
    const safeUpdate = Object.fromEntries(
      Object.entries(updated).map(([key, value]) => [key, value === undefined ? null : value])
    );

    await setDoc(doc(db, 'products', id), safeUpdate, { merge: true });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const toggleStockStatus = async (id: string) => {
    const item = products.find(p => p.id === id);
    if (!item) return;
    const currentInStock = Boolean(item.inStock);
    await setDoc(doc(db, 'products', id), {
      inStock: !currentInStock,
      stockStatus: !currentInStock ? 'In Stock' : 'Available to Order'
    }, { merge: true });
  };

  // Stock Adjustments
  const adjustStock = async (
    productId: string,
    quantityChange: number,
    reason: string,
    changeType: 'RESTOCK' | 'DISPATCH' | 'ADJUSTMENT' | 'DAMAGE' = 'RESTOCK'
  ) => {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const currentBoxes = item.stockQuantityBoxes || item.stockQuantitySlabs || 0;
    const newBoxes = Math.max(0, currentBoxes + quantityChange);
    const isTile = item.boxCoverageSqFt !== undefined;
    const newSqFt = isTile ? newBoxes * (item.boxCoverageSqFt || 23.25) : newBoxes * 65;

    // Record Log
    const logId = `log-${Date.now()}`;
    const logEntry: StockAdjustmentLog = {
      id: logId,
      productId: item.id,
      productName: item.name,
      sku: item.sku,
      changeType,
      quantityChanged: quantityChange,
      unit: isTile ? 'Boxes' : 'Slabs',
      previousStock: currentBoxes,
      newStock: newBoxes,
      reason,
      timestamp: new Date().toLocaleString(),
    };
    
    await setDoc(doc(db, 'stockLogs', logId), logEntry);
    await setDoc(doc(db, 'products', productId), {
      stockQuantityBoxes: isTile ? newBoxes : null,
      stockQuantitySlabs: !isTile ? newBoxes : null,
      stockSqFt: newSqFt,
      inStock: newBoxes > 0,
    }, { merge: true });
  };

  // Collections Actions
  const addCollection = async (col: Omit<Collection, 'id'>) => {
    const id = col.slug || `col-${Date.now()}`;
    const newCol: Collection = { ...col, id, itemCount: col.productIds.length };
    await setDoc(doc(db, 'collections', id), newCol);
  };

  const updateCollection = async (id: string, updated: Partial<Collection>) => {
    const item = collections.find(c => c.id === id);
    if (!item) return;
    const merged = { ...updated, itemCount: updated.productIds ? updated.productIds.length : item.itemCount };
    await setDoc(doc(db, 'collections', id), merged, { merge: true });
  };

  const deleteCollection = async (id: string) => {
    await deleteDoc(doc(db, 'collections', id));
  };

  // Spaces Actions
  const updateSpaceImage = async (id: string, imageUrl: string) => {
    await setDoc(doc(db, 'spaces', id), { heroImage: imageUrl }, { merge: true });
  };

  const deleteSpaceImage = async (id: string) => {
    await setDoc(doc(db, 'spaces', id), { heroImage: '' }, { merge: true });
  };

  // Hero Actions
  const updateHeroScene = async (id: string, updatedFields: Partial<HeroScene>) => {
    await setDoc(doc(db, 'heroScenes', id), updatedFields, { merge: true });
  };

  // Billing Actions
  const createInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber' | 'date'>) => {
    const seq = 1080 + invoices.length + 1;
    const invoiceNumber = `INV-JT-2026-${seq}`;
    const date = new Date().toISOString().split('T')[0];
    const id = `inv-${seq}`;
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id,
      invoiceNumber,
      date,
    };

    setDoc(doc(db, 'invoices', id), newInvoice);
    return newInvoice; // Returning synchronously for UI if needed
  };

  const updateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    await setDoc(doc(db, 'invoices', id), { status }, { merge: true });
  };

  const deleteInvoice = async (id: string) => {
    await deleteDoc(doc(db, 'invoices', id));
  };

  // Derived Metrics
  const totalGrossRevenue = invoices
    .filter((inv) => inv.status === 'Paid' || inv.status === 'Pending')
    .reduce((acc, inv) => acc + inv.grandTotal, 0);

  const totalSqFtSold = invoices
    .filter((inv) => inv.status === 'Paid' || inv.status === 'Pending')
    .reduce((acc, inv) => acc + inv.items.reduce((s, it) => s + (it.areaSqFt || 0), 0), 0);

  const lowStockItems = products.filter((p) => {
    const current = p.stockQuantityBoxes || p.stockQuantitySlabs || 0;
    const threshold = p.minThreshold || 30;
    return current <= threshold;
  });

  const totalInvoicesCount = invoices.length;

  const addWhatsAppEnquiry = async (enquiry: Omit<WhatsAppEnquiry, 'id' | 'timestamp' | 'status'>) => {
    const id = `enq-${Date.now()}`;
    const newEnquiry: WhatsAppEnquiry = {
      ...enquiry,
      id,
      timestamp: new Date().toISOString(),
      status: 'New',
    };
    await setDoc(doc(db, 'whatsappEnquiries', id), newEnquiry);
  };

  const updateWhatsAppEnquiryStatus = async (id: string, status: WhatsAppEnquiry['status']) => {
    await setDoc(doc(db, 'whatsappEnquiries', id), { status }, { merge: true });
  };

  const addCallbackRequest = async (request: Omit<CallbackRequest, 'id' | 'timestamp' | 'status'>) => {
    const id = `cb-${Date.now()}`;
    const newRequest: CallbackRequest = {
      ...request,
      id,
      timestamp: new Date().toISOString(),
      status: 'New',
    };
    await setDoc(doc(db, 'callbackRequests', id), newRequest);
  };

  const updateCallbackRequestStatus = async (id: string, status: CallbackRequest['status']) => {
    await setDoc(doc(db, 'callbackRequests', id), { status }, { merge: true });
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStockStatus,
        adjustStock,
        stockLogs,
        collections,
        addCollection,
        updateCollection,
        deleteCollection,
        spaces,
        updateSpaceImage,
        deleteSpaceImage,
        heroScenes,
        updateHeroScene,
        invoices,
        createInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        totalGrossRevenue,
        totalSqFtSold,
        lowStockItems,
        totalInvoicesCount,
        whatsappEnquiries,
        addWhatsAppEnquiry,
        updateWhatsAppEnquiryStatus,
        callbackRequests,
        addCallbackRequest,
        updateCallbackRequestStatus,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
