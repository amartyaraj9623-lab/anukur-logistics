// Indicative rate engine — purely for demo/illustrative pricing.
// Distances are straight-line approximations between major Indian cities (km).

export interface RateInput {
  origin: string;
  destination: string;
  weight: number;
  weightUnit: 'tons' | 'kg';
  truckType: 'FTL - 32ft Multi-Axle' | 'Container' | 'LCV' | 'Trailer';
}

export interface RateResult {
  distanceKm: number;
  transitDays: string;
  costINR: number;
  ewbIncluded: boolean;
}

// Approx straight-line distances (km) between major Indian city pairs.
const DISTANCES: Record<string, Record<string, number>> = {
  'new delhi': { mumbai: 1150, bengaluru: 1740, chennai: 1760, kolkata: 1310, hyderabad: 1250, pune: 1180, ahmedabad: 770, jaipur: 260, lucknow: 420, chandigarh: 240 },
  mumbai: { bengaluru: 840, chennai: 1030, kolkata: 1660, hyderabad: 620, pune: 120, ahmedabad: 440, delhi: 1150, 'new delhi': 1150 },
  bengaluru: { chennai: 290, kolkata: 1560, hyderabad: 500, mumbai: 840, delhi: 1740, 'new delhi': 1740 },
  chennai: { kolkata: 1380, hyderabad: 510, mumbai: 1030, bengaluru: 290, delhi: 1760, 'new delhi': 1760 },
  kolkata: { delhi: 1310, 'new delhi': 1310, mumbai: 1660, chennai: 1380, hyderabad: 1180 },
  hyderabad: { mumbai: 620, bengaluru: 500, chennai: 510, delhi: 1250, 'new delhi': 1250 },
  pune: { mumbai: 120, delhi: 1180, 'new delhi': 1180, bengaluru: 730 },
  ahmedabad: { mumbai: 440, delhi: 770, 'new delhi': 770 },
  jaipur: { delhi: 260, 'new delhi': 260, mumbai: 920 },
  lucknow: { delhi: 420, 'new delhi': 420, mumbai: 1180 },
  chandigarh: { delhi: 240, 'new delhi': 240 },
};

const TRUCK_RATE: Record<RateInput['truckType'], number> = {
  // per-ton-km base rate (INR)
  'FTL - 32ft Multi-Axle': 52,
  'Container': 68,
  'LCV': 95,
  'Trailer': 44,
};

function lookupDistance(origin: string, destination: string): number {
  const o = origin.toLowerCase().trim();
  const d = destination.toLowerCase().trim();
  const oCity = o.split('-')[0].trim();
  const dCity = d.split('-')[0].trim();
  if (DISTANCES[oCity]?.[dCity]) return DISTANCES[oCity][dCity];
  if (DISTANCES[dCity]?.[oCity]) return DISTANCES[dCity][oCity];
  // Fallback: estimate from pincode digits difference (very rough)
  const oPin = parseInt(o.match(/(\d{6})/)?.[1] ?? '0', 10);
  const dPin = parseInt(d.match(/(\d{6})/)?.[1] ?? '0', 10);
  if (oPin && dPin) {
    const diff = Math.abs(oPin - dPin);
    return Math.max(120, Math.round(diff / 6));
  }
  return 1400; // sensible default
}

export function calculateRate(input: RateInput): RateResult {
  const distance = lookupDistance(input.origin, input.destination);
  const weightTons = input.weightUnit === 'kg' ? input.weight / 1000 : input.weight;
  const ratePerTonKm = TRUCK_RATE[input.truckType];
  const base = distance * weightTons * ratePerTonKm;
  // Minimum floor per shipment
  const costINR = Math.max(8500, Math.round(base / 100) * 100);
  const days = Math.max(1, Math.ceil(distance / 480));
  const transitDays = days <= 1 ? '1 Day' : days <= 2 ? '2 Days' : `${days - 1}-${days} Days`;
  return {
    distanceKm: distance,
    transitDays,
    costINR,
    ewbIncluded: true,
  };
}
