import { useState } from 'react';
import {
  MapPin, ArrowRight, Weight, Truck as TruckIcon, Loader2,
  ShieldCheck, Lock, Gauge, Clock, BadgePercent,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import { calculateRate, RateInput, RateResult } from '@/lib/rateEngine';
import { QUOTE_REQUEST_URL } from '@/lib/whatsapp';

const TRUCK_TYPES: RateInput['truckType'][] = [
  'FTL - 32ft Multi-Axle', 'Container', 'LCV', 'Trailer',
];

function Field({ label, children, icon }: { label: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
        <span className="text-ember-500">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full bg-midnight-950/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-ember-500/60 focus:ring-2 focus:ring-ember-500/20 outline-none transition-all';

export default function Hero() {
  const { currency } = useCurrency();
  const [origin, setOrigin] = useState('New Delhi - 110001');
  const [destination, setDestination] = useState('Mumbai - 400001');
  const [weight, setWeight] = useState(14);
  const [unit, setUnit] = useState<'tons' | 'kg'>('tons');
  const [truckType, setTruckType] = useState<RateInput['truckType']>('FTL - 32ft Multi-Axle');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RateResult | null>(null);

  const compute = () => {
    setLoading(true);
    setTimeout(() => {
      const r = calculateRate({ origin, destination, weight, weightUnit: unit, truckType });
      setResult(r);
      setLoading(false);
    }, 650);
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background grid + glows */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute -top-20 left-1/4 w-96 h-96 bg-ember-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-midnight-600/30 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Delhi HQ · Operating 24/7 across 28 states
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight">
              Empowering Commerce <br className="hidden sm:block" />
              Across India.
              <br />
              <span className="text-gradient-ember">Connecting Delhi to the World.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl">
              End-to-end full truckload, express surface freight, and cross-border multimodal
              supply chain solutions engineered with real-time GPS tracking and precision delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={QUOTE_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-midnight-900 bg-ember-500 hover:bg-ember-400 px-5 py-3 rounded-xl shadow-ember-glow transition-all hover:scale-[1.03]"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#fleet"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
              >
                View Fleet Tech
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { v: '28', l: 'States Served' },
                { v: '1,400+', l: 'Vehicles in Fleet' },
                { v: '99.4%', l: 'On-Time SLA' },
              ].map((s) => (
                <div key={s.l} className="text-center sm:text-left">
                  <div className="font-display text-2xl font-bold text-white">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Rate calculator */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="relative glass-strong rounded-3xl p-6 sm:p-8 shadow-card">
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Indicative Rate Estimator</h3>
                  <p className="text-xs text-white/50 mt-0.5">Instant live estimate · no signup</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-ember-500/10 border border-ember-500/20">
                  <BadgePercent className="w-3 h-3 text-ember-500" />
                  <span className="text-[10px] font-mono font-semibold text-ember-400">LIVE</span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Origin" icon={<MapPin className="w-3 h-3" />}>
                    <input
                      className={inputCls}
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="City - Pincode"
                    />
                  </Field>
                  <Field label="Destination" icon={<MapPin className="w-3 h-3" />}>
                    <input
                      className={inputCls}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="City - Pincode"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Load Weight" icon={<Weight className="w-3 h-3" />}>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={0}
                        className={`${inputCls} flex-1`}
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                      />
                      <div className="flex rounded-xl border border-white/10 bg-midnight-950/60 p-1 gap-1">
                        {(['tons', 'kg'] as const).map((u) => (
                          <button
                            key={u}
                            onClick={() => setUnit(u)}
                            className={`px-2.5 text-[11px] font-semibold rounded-lg transition-all ${
                              unit === u ? 'bg-ember-500 text-midnight-900' : 'text-white/50 hover:text-white'
                            }`}
                          >
                            {u === 'tons' ? 'Tons' : 'KG'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Field>
                  <Field label="Truck Type" icon={<TruckIcon className="w-3 h-3" />}>
                    <select
                      className={`${inputCls} appearance-none cursor-pointer`}
                      value={truckType}
                      onChange={(e) => setTruckType(e.target.value as RateInput['truckType'])}
                    >
                      {TRUCK_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-midnight-900">{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <button
                  onClick={compute}
                  disabled={loading}
                  className="mt-1 w-full flex items-center justify-center gap-2 bg-ember-500 hover:bg-ember-400 disabled:opacity-70 text-midnight-900 font-bold text-sm py-3 rounded-xl shadow-ember-glow transition-all hover:scale-[1.01]"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Calculating…</>
                  ) : (
                    <>Get Instant Indicative Rate <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>

              {/* Result */}
              {result && (
                <div className="mt-5 rounded-2xl border border-ember-500/20 bg-gradient-to-br from-ember-500/10 to-transparent p-5 animate-fade-up">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="font-display text-xl sm:text-2xl font-bold text-gradient-ember">
                        {formatPrice(result.costINR, currency)}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">Indicative Cost</div>
                    </div>
                    <div className="border-x border-white/10">
                      <div className="font-display text-xl sm:text-2xl font-bold text-white">
                        ~{result.distanceKm.toLocaleString()} <span className="text-sm text-white/50">km</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">Distance</div>
                    </div>
                    <div>
                      <div className="font-display text-xl sm:text-2xl font-bold text-white">{result.transitDays}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">Transit Time</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] font-semibold text-emerald-300">e-Way Bill Included</span>
                    </div>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold text-ember-400 hover:text-ember-300 transition-colors"
                    >
                      <Lock className="w-3 h-3" />
                      Lock This Rate → Get Guaranteed Corporate Quote
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/35">
                <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> Real-time rates</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2-min SLA</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
