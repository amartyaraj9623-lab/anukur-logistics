import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Currency } from '@/lib/currency';

interface CurrencyCtx {
  currency: Currency;
  toggle: () => void;
  set: (c: Currency) => void;
}

const Ctx = createContext<CurrencyCtx | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('INR');
  const value = useMemo<CurrencyCtx>(() => ({
    currency,
    toggle: () => setCurrency((c) => (c === 'INR' ? 'USD' : 'INR')),
    set: setCurrency,
  }), [currency]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency(): CurrencyCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}
