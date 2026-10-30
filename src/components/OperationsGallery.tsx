import { ArrowUpRight, Boxes, Camera, PackageCheck, TrainFront, Warehouse } from 'lucide-react';
import logistics01 from '@/assets/images/logistics/logistics-01.jpeg';
import logistics02 from '@/assets/images/logistics/logistics-02.jpeg';
import logistics03 from '@/assets/images/logistics/logistics-03.jpeg';
import logistics04 from '@/assets/images/logistics/logistics-04.jpeg';

const OPERATIONS = [
  {
    src: logistics04,
    label: 'Goods staging',
    description: 'Sorted and secured parcels ready for onward movement.',
    icon: Boxes,
  },
  {
    src: logistics03,
    label: 'Parcel handling',
    description: 'Careful loading workflows for mixed cargo consignments.',
    icon: PackageCheck,
  },
  {
    src: logistics02,
    label: 'Rail freight movement',
    description: 'High-capacity parcel van operations across key corridors.',
    icon: TrainFront,
  },
  {
    src: logistics01,
    label: 'Freight dispatch',
    description: 'Coordinated loading and dispatch at active logistics yards.',
    icon: Warehouse,
  },
];

export default function OperationsGallery() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/30 to-transparent" />
      <div className="absolute -right-40 top-20 w-96 h-96 rounded-full bg-ember-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-white/70 mb-5">
              <Camera className="w-3 h-3 text-ember-500" />
              Behind the Movement
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              A glimpse of goods handling and logistics operations associated with our work
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl leading-relaxed">
              From yard-side sorting to rail-linked dispatch, every movement is handled with
              practical care, clear coordination, and dependable operational visibility.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/40">
            <span className="w-2 h-2 rounded-full bg-ember-500 animate-pulse" />
            FIELD OPERATIONS · DELHI NETWORK
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {OPERATIONS.map((operation, index) => {
            const Icon = operation.icon;
            return (
              <article
                key={operation.label}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-midnight-850 shadow-card ${
                  index === 0 ? 'sm:row-span-2 sm:min-h-[510px]' : 'min-h-[245px]'
                }`}
              >
                <img
                  src={operation.src}
                  alt={operation.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500 text-midnight-900 shadow-ember-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-white">{operation.label}</h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/65">{operation.description}</p>
                    </div>
                    <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-midnight-950/50 text-white/70 transition-all group-hover:border-ember-500/60 group-hover:bg-ember-500 group-hover:text-midnight-900">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
