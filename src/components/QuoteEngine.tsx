import { useState } from 'react';
import {
  ArrowRight, ArrowLeft, Check, Globe, Building2, MapPin,
  Weight, Package, User, Phone, MessageCircle, Send,
} from 'lucide-react';

const WHATSAPP_NUMBER = '919999999999'; // business dispatch desk

const SCOPE_OPTIONS = [
  { key: 'domestic', label: 'Domestic India', icon: Building2, desc: 'Pan-India surface freight' },
  { key: 'international', label: 'International Export/Import', icon: Globe, desc: 'Air, ocean & cross-border' },
] as const;

const CARGO_CLASSES = [
  'General Merchandise', 'FMCG / Retail', 'Pharmaceuticals (Cold Chain)',
  'Electronics / High-Value', 'Automotive Parts', 'Hazardous / IMDG',
  'Perishables / Agri', 'Machinery / Project Cargo',
];

const inputCls =
  'w-full bg-midnight-950/50 border border-white/10 rounded-xl px-3.5 py-3 text-sm text-white placeholder-white/30 focus:border-ember-500/60 focus:ring-2 focus:ring-ember-500/20 outline-none transition-all';

interface FormData {
  scope: 'domestic' | 'international' | '';
  origin: string;
  destination: string;
  weight: string;
  cargoClass: string;
  name: string;
  phone: string;
  company: string;
}

export default function QuoteEngine() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [form, setForm] = useState<FormData>({
    scope: '', origin: '', destination: '', weight: '',
    cargoClass: '', name: '', phone: '', company: '',
  });

  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = [
    form.scope !== '',
    form.origin.trim() && form.destination.trim(),
    form.weight.trim() && form.cargoClass,
    form.name.trim() && form.phone.trim() && form.company.trim(),
  ][step];

  const steps = ['Scope', 'Route', 'Cargo', 'Contact'];

  const buildMessage = () => {
    const lines = [
      '*New Freight Quote Request — Ankur Logistics*',
      '',
      `*Scope:* ${form.scope === 'domestic' ? 'Domestic India' : 'International Export/Import'}`,
      `*Origin:* ${form.origin}`,
      `*Destination:* ${form.destination}`,
      `*Weight:* ${form.weight}`,
      `*Cargo Class:* ${form.cargoClass}`,
      '',
      `*Contact*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Company: ${form.company}`,
      '',
      '— Sent via ankurlogistics.in quote engine',
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const submit = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`;
    setWaUrl(url);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const reset = () => {
    setStep(0);
    setSubmitted(false);
    setForm({ scope: '', origin: '', destination: '', weight: '', cargoClass: '', name: '', phone: '', company: '' });
  };

  return (
    <section id="quote" className="relative py-20 lg:py-24">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-5">
            <MessageCircle className="w-3 h-3 text-ember-500" />
            4-Step Instant Quote
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Get a Quote in <span className="text-gradient-ember">60 Seconds</span>
          </h2>
          <p className="mt-4 text-white/60">
            Answer four quick questions and your enquiry lands directly on our
            Delhi dispatch desk WhatsApp — no call centers, no waiting.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6">
          {/* Progress rail */}
          <div className="glass-strong rounded-3xl p-6 sm:p-7">
            <div className="space-y-1">
              {steps.map((s, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`relative w-9 h-9 rounded-full grid place-items-center text-xs font-bold transition-all ${
                        done
                          ? 'bg-ember-500 text-midnight-900'
                          : current
                            ? 'bg-ember-500/20 text-ember-400 border-2 border-ember-500/40'
                            : 'bg-midnight-950/50 text-white/30 border border-white/10'
                      }`}
                    >
                      {done ? <Check className="w-4 h-4" /> : i + 1}
                      {current && (
                        <span className="absolute inset-0 rounded-full border-2 border-ember-500/40 animate-ping opacity-60" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${current || done ? 'text-white' : 'text-white/40'}`}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-white/8">
              <div className="text-[11px] uppercase tracking-wider text-white/40 mb-2">Why Ankur</div>
              <ul className="space-y-2 text-xs text-white/55">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-ember-500 shrink-0" /> Guaranteed SLA or refund</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-ember-500 shrink-0" /> 100% transit insured</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-ember-500 shrink-0" /> Live GPS + e-POD on app</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-ember-500 shrink-0" /> AEO & IATA compliant</li>
              </ul>
            </div>
          </div>

          {/* Step content */}
          <div className="glass-strong rounded-3xl p-6 sm:p-8 min-h-[340px] flex flex-col">
            {submitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 grid place-items-center mb-5">
                  <Check className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Enquiry Sent to Dispatch Desk</h3>
                <p className="mt-2 text-sm text-white/55 max-w-sm">
                  Your quote request has been formatted and opened in WhatsApp. Our Delhi
                  dispatch team typically responds within 15 minutes during operating hours.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-midnight-900 bg-emerald-500 hover:bg-emerald-400 px-5 py-2.5 rounded-xl transition-all hover:scale-[1.03]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Reopen WhatsApp
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  {/* Step 1: Scope */}
                  {step === 0 && (
                    <div className="animate-fade-up">
                      <h3 className="font-display text-lg font-bold mb-1">What are you moving?</h3>
                      <p className="text-sm text-white/50 mb-5">Choose the scope of your shipment.</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {SCOPE_OPTIONS.map((o) => {
                          const Icon = o.icon;
                          const sel = form.scope === o.key;
                          return (
                            <button
                              key={o.key}
                              onClick={() => set('scope', o.key)}
                              className={`text-left p-5 rounded-2xl border transition-all ${
                                sel
                                  ? 'border-ember-500/40 bg-ember-500/10 shadow-ember-glow'
                                  : 'border-white/10 bg-midnight-950/40 hover:border-white/20'
                              }`}
                            >
                              <Icon className={`w-6 h-6 mb-3 ${sel ? 'text-ember-500' : 'text-white/50'}`} />
                              <div className="font-semibold text-white text-sm">{o.label}</div>
                              <div className="text-xs text-white/50 mt-1">{o.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Route */}
                  {step === 1 && (
                    <div className="animate-fade-up">
                      <h3 className="font-display text-lg font-bold mb-1">Route details</h3>
                      <p className="text-sm text-white/50 mb-5">Where is the cargo moving from and to?</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                            <MapPin className="w-3 h-3 text-ember-500" /> Origin City / Pincode
                          </span>
                          <input className={inputCls} value={form.origin} onChange={(e) => set('origin', e.target.value)} placeholder="e.g. New Delhi - 110001" />
                        </label>
                        <label className="block">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                            <MapPin className="w-3 h-3 text-ember-500" /> Destination City / Pincode
                          </span>
                          <input className={inputCls} value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="e.g. Mumbai - 400001" />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Cargo */}
                  {step === 2 && (
                    <div className="animate-fade-up">
                      <h3 className="font-display text-lg font-bold mb-1">Cargo specifics</h3>
                      <p className="text-sm text-white/50 mb-5">Weight and classification help us pick the right equipment.</p>
                      <label className="block mb-4">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                          <Weight className="w-3 h-3 text-ember-500" /> Weight (with unit)
                        </span>
                        <input className={inputCls} value={form.weight} onChange={(e) => set('weight', e.target.value)} placeholder="e.g. 14 Tons or 1200 KG" />
                      </label>
                      <label className="block">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                          <Package className="w-3 h-3 text-ember-500" /> Cargo Classification
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {CARGO_CLASSES.map((c) => (
                            <button
                              key={c}
                              onClick={() => set('cargoClass', c)}
                              className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                                form.cargoClass === c
                                  ? 'border-ember-500/40 bg-ember-500/10 text-white'
                                  : 'border-white/8 bg-midnight-950/40 text-white/60 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Step 4: Contact */}
                  {step === 3 && (
                    <div className="animate-fade-up">
                      <h3 className="font-display text-lg font-bold mb-1">Contact details</h3>
                      <p className="text-sm text-white/50 mb-5">Where should we send the guaranteed quote?</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="block">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                            <User className="w-3 h-3 text-ember-500" /> Full Name
                          </span>
                          <input className={inputCls} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
                        </label>
                        <label className="block">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                            <Phone className="w-3 h-3 text-ember-500" /> Phone
                          </span>
                          <input className={inputCls} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 …" />
                        </label>
                        <label className="block sm:col-span-2">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                            <Building2 className="w-3 h-3 text-ember-500" /> Company
                          </span>
                          <input className={inputCls} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" />
                        </label>
                      </div>
                      <div className="mt-4 flex items-start gap-2 text-[11px] text-white/40">
                        <MessageCircle className="w-3.5 h-3.5 text-ember-500 mt-0.5 shrink-0" />
                        Submitting will format your enquiry and open WhatsApp to our dispatch desk.
                      </div>
                    </div>
                  )}
                </div>

                {/* Nav */}
                <div className="mt-7 flex items-center justify-between pt-5 border-t border-white/8">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  {step < 3 ? (
                    <button
                      onClick={() => canNext && setStep((s) => s + 1)}
                      disabled={!canNext}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-midnight-900 bg-ember-500 hover:bg-ember-400 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl shadow-ember-glow transition-all hover:scale-[1.02]"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={!canNext}
                      className="inline-flex items-center gap-2 text-sm font-bold text-midnight-900 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
                    >
                      <Send className="w-4 h-4" /> Submit Quote
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
