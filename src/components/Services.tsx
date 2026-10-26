import { useState } from 'react';
import {
  Truck, Plane, Ship, Snowflake, ArrowRight, Warehouse,
  FileCheck, Map, Container, Globe, Building2, Anchor,
} from 'lucide-react';

interface Service {
  key: 'domestic' | 'international';
  title: string;
  badge: string;
  blurb: string;
  features: { icon: React.ReactNode; label: string; desc: string }[];
  accent: 'ember' | 'sky';
}

const SERVICES: Service[] = [
  {
    key: 'domestic',
    title: 'Domestic Pan-India Logistics',
    badge: '28 States · 1,400+ Vehicles',
    blurb: 'From the Delhi-NCR Bawana hub to every district — high-velocity surface freight with green-corridor e-Way bill compliance and cold-chain integrity.',
    accent: 'ember',
    features: [
      { icon: <Truck className="w-4 h-4" />, label: 'FTL / PTL Corridors', desc: 'Dedicated 32ft multi-axle and part-load consolidation across NH44, NH48, NH19.' },
      { icon: <Warehouse className="w-4 h-4" />, label: 'Bawana Staging Yards', desc: 'Delhi-NCR hub with cross-docking, 120-bay loading, and bonded warehousing.' },
      { icon: <FileCheck className="w-4 h-4" />, label: 'GST e-Way Green Corridor', desc: 'Auto-generated e-Way bills, fast-tag enabled, zero-detention guarantee.' },
      { icon: <Snowflake className="w-4 h-4" />, label: 'Cold Chain 2°C–8°C', desc: 'Pharma and perishable temperature-controlled reefer fleet with data loggers.' },
    ],
  },
  {
    key: 'international',
    title: 'International Multimodal Freight',
    badge: 'Air · Ocean · Cross-Border',
    blurb: 'Air cargo via IGI Airport Delhi, FCL/LCL ocean via JNPT, and customs-cleared cross-border road to Nepal, Bhutan, Bangladesh & beyond.',
    accent: 'sky',
    features: [
      { icon: <Plane className="w-4 h-4" />, label: 'Air Cargo via IGI Delhi', desc: 'Daily uplift to Frankfurt, Dubai, Singapore. IATA-compliant handling & AEO.' },
      { icon: <Ship className="w-4 h-4" />, label: 'Ocean FCL / LCL', desc: 'JNPT, Mundra, Chennai port consolidation with carrier partnerships.' },
      { icon: <FileCheck className="w-4 h-4" />, label: 'Customs Clearance', desc: 'In-house CHA team, AEO-T1 certified, duty drawback & drawback filing.' },
      { icon: <Globe className="w-4 h-4" />, label: 'Global Partner Network', desc: 'Agents in 42 countries, end-to-end DDP/DDU delivery with track-and-trace.' },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState<'domestic' | 'international'>('domestic');
  const svc = SERVICES.find((s) => s.key === active)!;

  return (
    <section id="services" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-5">
            <Container className="w-3 h-3 text-ember-500" />
            Dual Service Network
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            One Platform. <span className="text-gradient-ember">Two Continents.</span>
          </h2>
          <p className="mt-4 text-white/60">
            Whether you move freight across Delhi and Mumbai or Delhi and Frankfurt —
            Ankur runs both networks on the same control tower, same SLA, same visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s) => {
            const isActive = s.key === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`text-left rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  isActive
                    ? 'glass-strong border-ember-500/30 shadow-ember-glow scale-[1.01]'
                    : 'glass border-white/8 hover:border-white/15'
                } border`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl grid place-items-center ${
                      s.accent === 'ember' ? 'bg-ember-500/15 text-ember-500' : 'bg-sky-500/15 text-sky-400'
                    }`}>
                      {s.key === 'domestic'
                        ? <Truck className="w-5 h-5" />
                        : <Plane className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
                      <div className="text-[11px] uppercase tracking-wider text-white/40 mt-0.5">{s.badge}</div>
                    </div>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full mt-1.5 transition-all ${
                    isActive ? 'bg-ember-500 shadow-ember-glow' : 'bg-white/15'
                  }`} />
                </div>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">{s.blurb}</p>
              </button>
            );
          })}
        </div>

        {/* Multimodal visual showcase */}
        <div className="mt-6 grid grid-cols-3 gap-3 h-40 sm:h-56">
          {[
            { src: 'https://images.pexels.com/photos/20922619/pexels-photo-20922619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Surface', icon: <Truck className="w-3.5 h-3.5" /> },
            { src: 'https://images.pexels.com/photos/35424560/pexels-photo-35424560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Air', icon: <Plane className="w-3.5 h-3.5" /> },
            { src: 'https://images.pexels.com/photos/20581299/pexels-photo-20581299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', label: 'Ocean', icon: <Ship className="w-3.5 h-3.5" /> },
          ].map((m) => (
            <div key={m.label} className="relative rounded-2xl overflow-hidden group border border-white/8">
              <img
                src={m.src}
                alt={m.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-strong">
                <span className="text-ember-500">{m.icon}</span>
                <span className="text-xs font-semibold text-white">{m.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active feature grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" key={active}>
          {svc.features.map((f) => (
            <div
              key={f.label}
              className="group glass rounded-2xl p-5 hover:border-ember-500/30 hover:bg-white/[0.04] border border-white/8 transition-all hover:-translate-y-1"
            >
              <div className="w-9 h-9 rounded-lg bg-ember-500/10 text-ember-500 grid place-items-center mb-3 group-hover:bg-ember-500/20 transition-colors">
                {f.icon}
              </div>
              <div className="font-semibold text-sm text-white">{f.label}</div>
              <div className="mt-1.5 text-xs text-white/50 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Multimodal route strip */}
        <div className="mt-8 glass rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/50 border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-ember-500" />
              <span className="text-xs font-medium text-white/70">Delhi HQ</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/50 border border-white/10">
              <Truck className="w-3.5 h-3.5 text-ember-500" />
              <span className="text-xs font-medium text-white/70">Surface</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/50 border border-white/10">
              <Plane className="w-3.5 h-3.5 text-ember-500" />
              <span className="text-xs font-medium text-white/70">Air</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/50 border border-white/10">
              <Anchor className="w-3.5 h-3.5 text-ember-500" />
              <span className="text-xs font-medium text-white/70">Ocean</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/50 border border-white/10">
              <Map className="w-3.5 h-3.5 text-ember-500" />
              <span className="text-xs font-medium text-white/70">Last-Mile</span>
            </div>
          </div>
          <a href="#quote" className="text-xs font-semibold text-ember-400 hover:text-ember-300 flex items-center gap-1.5">
            Plan a multimodal route <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
