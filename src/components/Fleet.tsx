import { useEffect, useState } from 'react';
import {
  Radar, Activity, Truck, Gauge, MapPin, FileSignature,
  Radio, AlertTriangle, Signal,
} from 'lucide-react';

interface Vehicle {
  id: string;
  type: 'Truck' | 'Air' | 'LCV';
  speed: number;
  location: string;
  alert: boolean;
  epod: boolean;
  angle: number; // position on radar
  radius: number; // distance from center (0-1)
}

const INITIAL: Vehicle[] = [
  { id: 'ANK-T-7842', type: 'Truck', speed: 78, location: 'NH48 · Ajmer bypass', alert: false, epod: true, angle: 35, radius: 0.72 },
  { id: 'ARI-A-2015', type: 'Air', speed: 0, location: 'IGI DEL · T2 Cargo', alert: false, epod: true, angle: 110, radius: 0.55 },
  { id: 'ANK-T-9120', type: 'Truck', speed: 64, location: 'Delhi-NCR Geofence', alert: true, epod: false, angle: 200, radius: 0.6 },
  { id: 'ANK-L-441', type: 'LCV', speed: 42, location: 'Bawana Yard · Bay 12', alert: false, epod: true, angle: 280, radius: 0.4 },
  { id: 'ANK-T-6657', type: 'Truck', speed: 88, location: 'Mumbai-Pune Expressway', alert: false, epod: true, angle: 320, radius: 0.82 },
];

export default function Fleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          const angle = (v.angle + 0.7) % 360;
          const speed = Math.max(0, v.speed + (Math.random() - 0.5) * 8);
          return { ...v, angle, speed: Math.round(speed) };
        })
      );
      setTick((t) => t + 1);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="fleet" className="relative py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-5">
            <Radar className="w-3 h-3 text-ember-500" />
            Fleet Visibility & Control Tower
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Radar <span className="text-gradient-ember">Control Tower</span>
          </h2>
          <p className="mt-4 text-white/60">
            Live simulated feed from our Delhi HQ control tower — vehicle telemetry, geofence alerts,
            and digital e-POD readiness updated in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* Radar */}
          <div className="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-ember-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold tracking-wider text-white/70">DELHI TOWER · LIVE</span>
              </div>
              <span className="font-mono text-[10px] text-white/40">TICK #{String(tick).padStart(4, '0')}</span>
            </div>

            <div className="relative aspect-square max-w-md mx-auto">
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-[12%] rounded-full border border-white/10" />
              <div className="absolute inset-[28%] rounded-full border border-white/10" />
              <div className="absolute inset-[44%] rounded-full border border-white/10" />
              {/* Crosshair */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/8 -translate-x-1/2" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/8 -translate-y-1/2" />
              {/* Center dot */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ember-500 shadow-ember-glow" />

              {/* Sweep */}
              <div
                className="absolute inset-0 rounded-full animate-radar-sweep"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(255,106,0,0) 0deg, rgba(255,106,0,0) 300deg, rgba(255,106,0,0.05) 330deg, rgba(255,106,0,0.35) 359deg, rgba(255,106,0,0) 360deg)',
                }}
              />

              {/* Vehicles */}
              {vehicles.map((v) => {
                const rad = (v.angle * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * v.radius * 45;
                const y = 50 + Math.sin(rad) * v.radius * 45;
                return (
                  <div
                    key={v.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      v.alert ? 'bg-amber-400 animate-pulse-dot' : 'bg-ember-500'
                    } shadow-ember-glow`} />
                    <div className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[9px] font-mono text-white/60">
                      {v.id}
                    </div>
                  </div>
                );
              })}

              {/* Compass labels */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30">N</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30">S</span>
              <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30">W</span>
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30">E</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-ember-500" /> Active</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Geofence Alert</span>
              <span className="flex items-center gap-1.5"><Signal className="w-3 h-3 text-emerald-400" /> GPS Lock</span>
            </div>
          </div>

          {/* Telemetry list */}
          <div className="glass-strong rounded-3xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-ember-500" />
                <h3 className="font-display text-base font-bold text-white">Active Vehicle Telemetry</h3>
              </div>
              <span className="text-[11px] font-mono text-white/40">{vehicles.length} active</span>
            </div>

            <div className="space-y-3">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className={`rounded-2xl p-4 border transition-all ${
                    v.alert
                      ? 'border-amber-400/30 bg-amber-400/5'
                      : 'border-white/8 bg-midnight-950/40 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-lg grid place-items-center shrink-0 ${
                        v.type === 'Air' ? 'bg-sky-500/15 text-sky-400' : 'bg-ember-500/15 text-ember-500'
                      }`}>
                        {v.type === 'Air' ? <Radio className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-semibold text-white truncate">{v.id}</div>
                        <div className="flex items-center gap-1 text-[11px] text-white/50 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{v.location}</span>
                        </div>
                      </div>
                    </div>
                    {v.alert && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 shrink-0">
                        <AlertTriangle className="w-3 h-3" /> Geofence
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-midnight-900/60 py-2">
                      <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-wider text-white/40">
                        <Gauge className="w-2.5 h-2.5" /> Speed
                      </div>
                      <div className="text-xs font-mono font-semibold text-white mt-0.5">{v.speed} <span className="text-white/40">km/h</span></div>
                    </div>
                    <div className="rounded-lg bg-midnight-900/60 py-2">
                      <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-wider text-white/40">
                        <FileSignature className="w-2.5 h-2.5" /> e-POD
                      </div>
                      <div className={`text-xs font-semibold mt-0.5 ${v.epod ? 'text-emerald-400' : 'text-amber-300'}`}>
                        {v.epod ? 'Ready' : 'Pending'}
                      </div>
                    </div>
                    <div className="rounded-lg bg-midnight-900/60 py-2">
                      <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-wider text-white/40">
                        <Signal className="w-2.5 h-2.5" /> GPS
                      </div>
                      <div className="text-xs font-semibold text-emerald-400 mt-0.5">Locked</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-[11px] text-white/40 pt-4 border-t border-white/8">
              <span className="font-mono">Refresh: 1.4s · Delhi Tower</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Telemetry healthy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
