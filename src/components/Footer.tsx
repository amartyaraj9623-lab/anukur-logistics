import {
  ShieldCheck, BadgeCheck, Plane, Anchor, Truck,
  MapPin, Phone, Mail, Clock, ArrowUpRight, Award,
} from 'lucide-react';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const TRUST = [
  { icon: Award, label: 'ISO 9001:2015' },
  { icon: Plane, label: 'IATA Compliant' },
  { icon: ShieldCheck, label: 'AEO Verified' },
  { icon: BadgeCheck, label: '100% Transit Insured' },
];

const ROUTES = [
  'Delhi → Mumbai (NH48)', 'Delhi → Bengaluru (NH44)', 'Delhi → Kolkata (NH19)',
  'Delhi → Chennai', 'IGI DEL → Frankfurt FRA', 'JNPT → Jebel Ali',
  'Chennai → Shanghai', 'Delhi → Kathmandu (Cross-border)',
];

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10 border-t border-white/8 bg-midnight-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="glass rounded-2xl p-4 flex items-center gap-3 hover:border-ember-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ember-500/10 text-ember-500 grid place-items-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white/80 leading-tight">{t.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-10 pb-12 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 grid place-items-center shadow-ember-glow">
                <Truck className="w-5 h-5 text-midnight-900" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display font-bold text-base text-white">Ankur Logistics</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Delhi · India</div>
              </div>
            </div>
            <p className="text-sm text-white/55 max-w-sm leading-relaxed">
              Multimodal freight platform engineered with real-time GPS tracking, e-POD,
              and a 24/7 dispatch desk — moving India's commerce from Delhi to the world.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Truck, Plane, Anchor].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 grid place-items-center text-ember-500">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mb-4">Registered Office</div>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ember-500 mt-0.5 shrink-0" />
                <span>Bawana Logistics Hub, Sector 5,<br />Bawana Industrial Area, New Delhi 110039</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ember-500 shrink-0" />
                <a href="tel:+911146460000" className="hover:text-white transition-colors">24/7 Hotline: +91 11 4646 0000</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ember-500 shrink-0" />
                <a href="mailto:dispatch@ankurlogistics.in" className="hover:text-white transition-colors">dispatch@ankurlogistics.in</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-ember-500 shrink-0" />
                <span>Operations · 24 / 7 / 365</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/40 mb-4">Operational Routes</div>
            <ul className="space-y-2">
              {ROUTES.map((r) => (
                <li key={r} className="flex items-center justify-between gap-2 text-sm text-white/60 hover:text-white transition-colors cursor-pointer group">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-ember-500" />
                    {r}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-ember-500 transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Ankur Logistics Pvt. Ltd. · CIN U60300DL2015PTC281234 · GSTIN 07AAGCA1234F1Z5</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">GST E-Way</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const WHATSAPP = 'https://wa.me/919999999999?text=' + encodeURIComponent('Hi Ankur Logistics dispatch desk, I need assistance with a shipment.');
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-strong rounded-2xl p-4 w-72 animate-fade-up shadow-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 grid place-items-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Dispatch Desk</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online · 24/7
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/55 mb-3">
            Chat with our Delhi dispatch team for bookings, tracking, and instant quotes.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold py-2.5 rounded-xl transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 grid place-items-center shadow-[0_8px_32px_-4px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
        aria-label="Chat with dispatch desk"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6 text-white relative" />
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-ember-500 border-2 border-midnight-900 animate-pulse-dot" />
        )}
      </button>
    </div>
  );
}
