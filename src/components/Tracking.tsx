import { useState } from 'react';
import { Search, Package, MapPin, Truck, Clock, CheckCircle2, Loader2 } from 'lucide-react';

interface TrackResult {
  id: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Booked';
  origin: string;
  destination: string;
  vehicle: string;
  eta: string;
  progress: number;
  timeline: { time: string; event: string; done: boolean }[];
}

function generate(id: string): TrackResult {
  const idUpper = id.toUpperCase();
  return {
    id: idUpper,
    status: 'In Transit',
    origin: 'New Delhi Hub (Bawana)',
    destination: 'Mumbai Logistics Park',
    vehicle: 'ANK-T-7842',
    eta: 'Tomorrow, 14:30 IST',
    progress: 62,
    timeline: [
      { time: '26 Oct · 08:14', event: 'Consignment booked at Delhi HQ', done: true },
      { time: '26 Oct · 11:02', event: 'Loaded onto FTL · ANK-T-7842', done: true },
      { time: '26 Oct · 19:40', event: 'Crossed Jaipur toll plaza · NH48', done: true },
      { time: '27 Oct · 06:15', event: 'In transit · Udaipur corridor', done: false },
      { time: '28 Oct · 14:30', event: 'Estimated delivery · Mumbai', done: false },
    ],
  };
}

export default function Tracking() {
  const [id, setId] = useState('ANK-2026-1145');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(generate('ANK-2026-1145'));

  const track = () => {
    if (!id.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(generate(id.trim()));
      setLoading(false);
    }, 800);
  };

  return (
    <section id="tracking" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-5">
              <Search className="w-3 h-3 text-ember-500" />
              Real-time Visibility
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
              Track Your <span className="text-gradient-ember">Consignment</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-md">
              Enter your Ankur docket number to get live GPS coordinates, vehicle telemetry,
              and estimated delivery — updated every 90 seconds from our Delhi control tower.
            </p>

            <div className="mt-7 glass-strong rounded-2xl p-2 flex gap-2">
              <div className="relative flex-1">
                <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && track()}
                  placeholder="e.g. ANK-2026-1145"
                  className="w-full bg-transparent border-0 pl-10 pr-3 py-3 text-sm text-white placeholder-white/30 outline-none font-mono"
                />
              </div>
              <button
                onClick={track}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-ember-500 hover:bg-ember-400 text-midnight-900 font-bold text-sm px-5 rounded-xl transition-all hover:scale-[1.02]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Track
              </button>
            </div>
            <p className="mt-3 text-[11px] text-white/35 font-mono">
              Demo: any ID returns simulated live telemetry.
            </p>
          </div>

          {/* Result panel */}
          {result && (
            <div className="glass-strong rounded-3xl p-6 sm:p-7 shadow-card animate-fade-up">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">Docket</div>
                  <div className="font-mono text-lg font-semibold text-white">{result.id}</div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ember-500/10 border border-ember-500/20">
                  <span className="w-2 h-2 rounded-full bg-ember-500 animate-pulse-dot" />
                  <span className="text-xs font-semibold text-ember-400">{result.status}</span>
                </div>
              </div>

              {/* Route */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-5">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Origin</div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                    <MapPin className="w-3.5 h-3.5 text-ember-500" />
                    {result.origin}
                  </div>
                </div>
                <div className="relative flex-1 h-px bg-white/10 min-w-[40px]">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-500 to-ember-400 rounded-full"
                    style={{ width: `${result.progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ember-500 border-2 border-midnight-900 shadow-ember-glow transition-all duration-700"
                    style={{ left: `calc(${result.progress}% - 6px)` }}
                  />
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Destination</div>
                  <div className="flex items-center justify-end gap-1.5 text-sm font-medium text-white">
                    {result.destination}
                    <MapPin className="w-3.5 h-3.5 text-ember-500" />
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { icon: <Truck className="w-3.5 h-3.5" />, l: 'Vehicle', v: result.vehicle },
                  { icon: <Clock className="w-3.5 h-3.5" />, l: 'ETA', v: result.eta },
                  { icon: <CheckCircle2 className="w-3.5 h-3.5" />, l: 'Progress', v: `${result.progress}%` },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-midnight-950/40 border border-white/5 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40">
                      <span className="text-ember-500">{m.icon}</span>
                      {m.l}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">{m.v}</div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {result.timeline.map((t, i) => (
                  <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                    {i < result.timeline.length - 1 && (
                      <div className="absolute left-[7px] top-5 bottom-0 w-px bg-white/10" />
                    )}
                    <div className={`relative shrink-0 w-4 h-4 rounded-full mt-0.5 grid place-items-center ${
                      t.done ? 'bg-ember-500 border-ember-500' : 'bg-midnight-900 border-white/15'
                    } border-2`}>
                      {t.done && <CheckCircle2 className="w-2.5 h-2.5 text-midnight-900" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] font-mono text-white/40">{t.time}</div>
                      <div className={`text-sm ${t.done ? 'text-white' : 'text-white/50'}`}>{t.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
