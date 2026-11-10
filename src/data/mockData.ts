import { SolarProduct, CalculatorInputs, SurveyBooking, Quotation } from '../types';

export const INITIAL_PRODUCTS: SolarProduct[] = [
  {
    id: 'prod-p1',
    name: 'Tata Power Solar 550W Mono PERC Panel',
    brand: 'Tata Power Solar',
    model: 'TP-PERC-550',
    category: 'panels',
    priceINR: 16500,
    originalPriceINR: 19000,
    capacityValue: 550,
    capacityUnit: 'W',
    efficiencyPct: 21.3,
    warrantyYears: 25,
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    description: 'High efficiency Half-Cut Mono PERC solar module designed for extreme weather conditions and high performance yield.',
    specifications: {
      'Cell Type': 'Mono PERC Half-Cut',
      'Max Power (Pmax)': '550 W',
      'Module Efficiency': '21.3%',
      'Max System Voltage': '1500V DC',
      'Frame': 'Anodized Aluminum Alloy',
      'Front Glass': '3.2mm Anti-Reflective Tempered Glass',
      'Junction Box': 'IP68 Weatherproof'
    },
    features: [
      'PID Resistant & Salt Mist Certified',
      '25-Year Linear Power Output Performance Warranty',
      'Enhanced Low-Light Performance (Cloudy Days)',
      'Heavy Duty Load Resistance (5400 Pa Wind/Snow)'
    ],
    dimensions: '2278 x 1134 x 35 mm',
    weightKg: 28.2,
    popular: true
  },
  {
    id: 'prod-p2',
    name: 'Vikram Solar 540W Bifacial Mono PERC Module',
    brand: 'Vikram Solar',
    model: 'HYPERSOL-540-BF',
    category: 'panels',
    priceINR: 17200,
    originalPriceINR: 20000,
    capacityValue: 540,
    capacityUnit: 'W',
    efficiencyPct: 21.0,
    warrantyYears: 25,
    inStock: true,
    rating: 4.8,
    reviewsCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    description: 'Dual glass bifacial module generating power from both front and rear sides, giving up to 25% extra energy generation.',
    specifications: {
      'Cell Type': 'Bifacial Mono PERC',
      'Max Power (Pmax)': '540 W (+25% Rear Gain)',
      'Module Efficiency': '21.0%',
      'Bifaciality Factor': '70±5%',
      'Junction Box': 'IP68 Split Box'
    },
    features: [
      'Up to 25% additional rear side energy yield',
      '30-Year Performance Guarantee for Dual Glass',
      'Ideal for flat concrete rooftops and elevated structures'
    ],
    dimensions: '2279 x 1134 x 30 mm',
    weightKg: 32.0,
    popular: true
  },
  {
    id: 'prod-p3',
    name: 'Waaree Energies 545W Mono PERC Module',
    brand: 'Waaree Energies',
    model: 'WSM-545',
    category: 'panels',
    priceINR: 15800,
    originalPriceINR: 18000,
    capacityValue: 545,
    capacityUnit: 'W',
    efficiencyPct: 21.1,
    warrantyYears: 25,
    inStock: true,
    rating: 4.7,
    reviewsCount: 86,
    imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    description: 'Tier-1 manufactured ultra-reliable solar panel engineered for residential rooftop solar applications with high temperature tolerance.',
    specifications: {
      'Cell Type': '144 Half-Cut Monocrystalline',
      'Max Power': '545 W',
      'Module Efficiency': '21.1%',
      'Temperature Coefficient': '-0.35%/°C'
    },
    features: [
      '12-Year Product Warranty, 25-Year Power Warranty',
      'High wind resistance certified',
      'Positive power tolerance 0 to +5W'
    ],
    dimensions: '2278 x 1134 x 35 mm',
    weightKg: 27.8
  },
  {
    id: 'prod-i1',
    name: 'Growatt 5kW On-Grid Dual MPPT Solar Inverter',
    brand: 'Growatt',
    model: 'MIN 5000TL-X',
    category: 'inverters',
    priceINR: 42000,
    originalPriceINR: 48000,
    capacityValue: 5,
    capacityUnit: 'kW',
    efficiencyPct: 98.4,
    warrantyYears: 10,
    inStock: true,
    rating: 4.9,
    reviewsCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek, lightweight grid-tied smart solar inverter with integrated WiFi monitoring, OLED display, and dual MPPT trackers.',
    specifications: {
      'Rated AC Output': '5000 W (Single Phase)',
      'Max DC Input Voltage': '550V',
      'MPPT Trackers': '2 Independent Trackers',
      'Max Efficiency': '98.4%',
      'Communication': 'WiFi / RS485 / 4G Optional',
      'Protection Rating': 'IP65 Outdoor Rated'
    },
    features: [
      'Integrated DC Switch & Surge Protection (Type II)',
      'ShinePhone Mobile App for Real-Time Yield Analytics',
      'Touch key & OLED display screen'
    ],
    dimensions: '375 x 350 x 160 mm',
    weightKg: 10.8,
    popular: true
  },
  {
    id: 'prod-i2',
    name: 'Havells Enviro 3kW On-Grid Inverter',
    brand: 'Havells',
    model: 'ENV-3.0K-TL',
    category: 'inverters',
    priceINR: 28500,
    originalPriceINR: 33000,
    capacityValue: 3,
    capacityUnit: 'kW',
    efficiencyPct: 97.8,
    warrantyYears: 10,
    inStock: true,
    rating: 4.8,
    reviewsCount: 74,
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    description: 'Compact high-efficiency solar string inverter designed specifically for Indian residential power grid conditions.',
    specifications: {
      'Rated AC Output': '3000 W',
      'Max Efficiency': '97.8%',
      'Protection': 'IP65',
      'Grid Support': 'Single Phase 230V'
    },
    features: [
      'Built-in Anti-Islanding Protection',
      'Wide MPPT operating voltage range',
      'Havells Solar Connect App Support'
    ],
    dimensions: '320 x 300 x 140 mm',
    weightKg: 8.5
  },
  {
    id: 'prod-i3',
    name: 'Enphase IQ8P Microinverter (For 1 Panel)',
    brand: 'Enphase',
    model: 'IQ8P-72-2-INT',
    category: 'inverters',
    priceINR: 12500,
    originalPriceINR: 14500,
    capacityValue: 480,
    capacityUnit: 'W',
    efficiencyPct: 97.2,
    warrantyYears: 15,
    inStock: true,
    rating: 4.9,
    reviewsCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    description: 'Panel-level grid forming microinverter. Eliminates single point of failure and maximizes energy production under shading.',
    specifications: {
      'Peak Output Power': '480 VA',
      'Input Module Power': '320W - 640W+',
      'Grid Forming': 'Yes (Enphase Sunlight Jumpstart)',
      'Warranty': '15 Years Extendable to 25'
    },
    features: [
      'Individual panel monitoring & rapid shutdown compliant',
      'No high voltage DC on roof (Max safety)',
      'Shade tolerant & expandable one panel at a time'
    ],
    dimensions: '212 x 175 x 30 mm',
    weightKg: 1.2
  },
  {
    id: 'prod-b1',
    name: 'Luminous Li-ON 5kWh Lithium Solar Battery',
    brand: 'Luminous',
    model: 'LIO-5000-LFP',
    category: 'batteries',
    priceINR: 128000,
    originalPriceINR: 145000,
    capacityValue: 5,
    capacityUnit: 'kWh',
    efficiencyPct: 95.0,
    warrantyYears: 10,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    description: 'Wall-mounted LiFePO4 (Lithium Iron Phosphate) safe solar energy storage system with 6000+ cycle life.',
    specifications: {
      'Nominal Energy': '5.12 kWh',
      'Battery Chemistry': 'LiFePO4 (LFP)',
      'Nominal Voltage': '51.2 V',
      'Cycle Life': '6000 Cycles @ 80% DoD',
      'BMS Protection': 'Integrated Smart BMS'
    },
    features: [
      'Wall-mountable space saving design',
      'Fast charging in 2.5 hours',
      'Zero maintenance with 10 year operational warranty'
    ],
    dimensions: '600 x 480 x 180 mm',
    weightKg: 46.0,
    popular: true
  },
  {
    id: 'prod-s1',
    name: '3kW Complete Home Solar Power System',
    brand: 'Vizon Solar Certified',
    model: 'HOME-3KW-KIT',
    category: 'systems',
    priceINR: 165000,
    originalPriceINR: 195000,
    capacityValue: 3,
    capacityUnit: 'kW',
    efficiencyPct: 21.2,
    warrantyYears: 25,
    inStock: true,
    rating: 5.0,
    reviewsCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    description: 'Complete turn-key 3kW rooftop solar kit suitable for 2-3 BHK homes. Includes panels, inverter, mounting structure, cabling, and DISCOM approval assistance.',
    specifications: {
      'System Size': '3.3 kW (6 x 550W Mono PERC Panels)',
      'Inverter': 'Growatt / Havells 3kW Grid-Tie Inverter',
      'Est. Monthly Yield': '360 - 420 kWh (Units)',
      'Rooftop Area Required': '300 Sq Ft',
      'Expected Monthly Bill Savings': '₹ 3,000 - ₹ 4,200',
      'PM Surya Ghar Subsidy': 'Eligible for ₹ 78,000 Govt Subsidy'
    },
    features: [
      'Includes HDG Aluminum Roof Mounting Structure',
      'Complete DC/AC Lightning Protection & Earthing Kit',
      'Net Metering Application & Commissioning included',
      'Free 1-Year On-Site Maintenance & Cleaning'
    ],
    dimensions: 'Req: 300 sq.ft roof',
    weightKg: 200,
    popular: true
  },
  {
    id: 'prod-s2',
    name: '5kW Villa Solar System with Battery Backup',
    brand: 'Vizon Solar Certified',
    model: 'VILLA-5KW-HYBRID',
    category: 'systems',
    priceINR: 345000,
    originalPriceINR: 390000,
    capacityValue: 5,
    capacityUnit: 'kW',
    efficiencyPct: 21.3,
    warrantyYears: 25,
    inStock: true,
    rating: 4.9,
    reviewsCount: 115,
    imageUrl: 'https://images.unsplash.com/photo-1548611716-3001859e4b6d?auto=format&fit=crop&w=800&q=80',
    description: 'Hybrid solar power system for 3-4 BHK villas. Powers ACs, refrigerators, lights, and appliances even during grid power cuts.',
    specifications: {
      'Panels': '9 x 550W Tata Mono PERC (4.95 kW)',
      'Inverter': '5kW Hybrid Bi-directional Inverter',
      'Battery Storage': '5.12 kWh Luminous Lithium Battery',
      'Est. Monthly Yield': '600 - 700 kWh'
    },
    features: [
      'Automatic seamless grid-to-battery failover (<10ms)',
      'Zero electricity bill potential with net metering',
      '24/7 Remote mobile app monitoring'
    ],
    popular: true
  },
  {
    id: 'prod-a1',
    name: 'Aluminium Heavy Duty Roof Structure Kit (1kW)',
    brand: 'SolarMount Pro',
    model: 'SMP-ALU-1KW',
    category: 'accessories',
    priceINR: 4800,
    originalPriceINR: 5800,
    capacityValue: 1,
    capacityUnit: 'kW',
    warrantyYears: 15,
    inStock: true,
    rating: 4.7,
    reviewsCount: 41,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Anodized aluminium elevated roof mounting structure designed to withstand wind speeds up to 170 km/h.',
    specifications: {
      'Material': 'AL6005-T5 Anodized Aluminium & SUS304 Fasteners',
      'Tilt Angle': '15° - 30° Adjustable',
      'Wind Speed Rating': '170 km/h'
    },
    features: [
      'Corrosion free for 25+ years',
      'Easy assembly pre-drilled brackets'
    ]
  }
];

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  monthlyBillINR: 4500,
  tariffPerUnitINR: 8.0,
  rooftopAreaSqFt: 500,
  city: 'Mumbai',
  propertyType: 'Residential',
  panelWattage: 550,
  sunHoursPerDay: 5.0,
  subsidyEligible: true,
  degradationRatePct: 0.5
};

export const CITIES_LIST = [
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Chandigarh',
  'Indore',
  'Kochi'
];

export const SAMPLE_QUOTATIONS: Quotation[] = [
  {
    id: 'quote-101',
    quotationNumber: 'SOL-2026-9812',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    validUntil: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43210',
    customerEmail: 'rahul.verma@example.com',
    customerAddress: 'Flat 402, Green Palms, Andheri West, Mumbai',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Tata 550W
        quantity: 6,
        unitPriceINR: 16500
      },
      {
        product: INITIAL_PRODUCTS[3], // Growatt 5kW
        quantity: 1,
        unitPriceINR: 42000
      }
    ],
    includeInstallation: true,
    installationCostINR: 18000,
    netMeteringFeeINR: 5000,
    subtotalINR: 164000,
    subsidyDiscountINR: 78000,
    promoDiscountINR: 5000,
    promoCodeApplied: 'WELCOME2026',
    gstRatePct: 12,
    gstAmountINR: 9720,
    finalTotalINR: 90720,
    status: 'Saved',
    notes: 'Quote generated for 3.3 kW rooftop solar installation with PM Surya Ghar subsidy.'
  }
];

export const SAMPLE_BOOKINGS: SurveyBooking[] = [
  {
    id: 'bk-201',
    referenceNumber: 'SURVEY-2026-7731',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    customerName: 'Rahul Verma',
    phone: '+91 98765 43210',
    email: 'rahul.verma@example.com',
    propertyType: 'Residential Villa',
    address: 'Plot 42, Silicon Valley Colony, Gachibowli',
    city: 'Hyderabad',
    pinCode: '500032',
    roofAreaSqFt: 650,
    monthlyBillINR: 5200,
    preferredDate: '2026-11-05',
    timeSlot: '11:00 AM - 02:00 PM',
    additionalNotes: 'South-facing flat RCC roof with minor shadow from water tank.',
    status: 'Site Visit Scheduled',
    assignedEngineer: {
      name: 'Vikramaditya Sharma',
      phone: '+91 98112 33445',
      rating: 4.9
    }
  }
];
