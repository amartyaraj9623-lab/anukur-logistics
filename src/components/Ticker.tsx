import { Radio } from 'lucide-react';

const ITEMS = [
  'DELHI → MUMBAI • NH48 EXPRESS',
  'BENGALURU → CORRIDOR 44',
  'IGI DEL → FRANKFURT FRA (AIR CARGO)',
  'JNPT → JEBEL ALI (OCEAN FREIGHT)',
  'CHENNAI → SHANGHAI',
  'KOLKATA → DHAKA • CROSS-BORDER',
  'DELHI → KASHMIR • NH44 LEH CORRIDOR',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-white/5 bg-midnight-950/60 overflow-hidden">
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-ember-500/10 border-r border-ember-500/20 shrink-0">
          <Radio className="w-3.5 h-3.5 text-ember-500 animate-pulse" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-ember-400 whitespace-nowrap">
            Live Transit Feed
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="flex w-max animate-marquee">
            {doubled.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-pulse-dot" />
                <span className="font-mono text-[11px] font-medium tracking-wider text-white/70 whitespace-nowrap">
                  {item}
                </span>
                <span className="text-white/15">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
