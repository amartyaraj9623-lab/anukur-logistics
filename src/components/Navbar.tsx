import { useEffect, useState } from 'react';
import { Truck, Plane, Ship, Menu, X, Phone } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const LINKS = [
  { label: 'Domestic Network', href: '#services' },
  { label: 'Global Freight', href: '#services' },
  { label: 'Fleet & Tech', href: '#fleet' },
  { label: 'Solutions', href: '#quote' },
  { label: 'Contact Us', href: '#contact' },
];

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 group">
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 grid place-items-center shadow-ember-glow group-hover:scale-105 transition-transform">
        <Truck className="w-5 h-5 text-midnight-900" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-400 border-2 border-midnight-900 animate-pulse-dot" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-[15px] tracking-tight text-white">Ankur Logistics</span>
        <span className="flex items-center gap-1 mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/50">
          <Truck className="w-2.5 h-2.5 text-ember-500" />
          <Plane className="w-2.5 h-2.5 text-ember-500" />
          <Ship className="w-2.5 h-2.5 text-ember-500" />
          Multimodal Freight
        </span>
      </div>
    </a>
  );
}

function CurrencySwitcher() {
  const { currency, toggle } = useCurrency();
  return (
    <button
      onClick={toggle}
      className="relative flex items-center h-8 px-1 rounded-full bg-white/5 border border-white/10 hover:border-ember-500/50 transition-colors"
      aria-label="Toggle currency"
    >
      <span
        className={`flex items-center justify-center h-6 px-2 text-[11px] font-semibold rounded-full transition-all duration-300 ${
          currency === 'INR' ? 'bg-ember-500 text-midnight-900' : 'text-white/50'
        }`}
      >
        ₹ INR
      </span>
      <span
        className={`flex items-center justify-center h-6 px-2 text-[11px] font-semibold rounded-full transition-all duration-300 ${
          currency === 'USD' ? 'bg-ember-500 text-midnight-900' : 'text-white/50'
        }`}
      >
        $ USD
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-ember-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <CurrencySwitcher />
            </div>
            <a
              href="#tracking"
              className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/85 hover:text-white px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-ember-500" />
              Track Consignment
            </a>
            <a
              href="#quote"
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-bold text-midnight-900 bg-ember-500 hover:bg-ember-400 px-4 py-2 rounded-lg shadow-ember-glow transition-all hover:scale-[1.03]"
            >
              Request a Quote
            </a>
            <button
              className="lg:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="glass-strong rounded-2xl p-4 flex flex-col gap-1">
            <div className="sm:hidden mb-2">
              <CurrencySwitcher />
            </div>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#tracking"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-ember-400 hover:bg-white/5"
            >
              Track Consignment
            </a>
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="mt-1 px-3 py-2.5 rounded-lg text-center text-sm font-bold text-midnight-900 bg-ember-500"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
