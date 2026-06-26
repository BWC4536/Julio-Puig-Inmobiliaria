import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { SlidersHorizontal, X } from 'lucide-react';
import { properties, formatPrice } from '../data';
import { PropertyCard } from '../PropertyCard';

const PROPERTY_TYPES = [
  { value: '', label: 'Todos los tipos' },
  { value: 'piso', label: 'Piso / Ático' },
  { value: 'chalet', label: 'Chalet' },
  { value: 'villa', label: 'Villa de lujo' },
  { value: 'adosado', label: 'Adosado' },
  { value: 'duplex', label: 'Dúplex' },
];

const LOCATIONS = [
  '', 'Sevilla Capital', 'Palomares del Río', 'Mairena del Aljarafe',
  'Tomares', 'Bormujos', 'San Juan de Aznalfarache', 'Valencina de la Concepción', 'Camas', 'Gines',
];

interface Filters {
  priceRange: [number, number];
  type: string;
  location: string;
  piscina: boolean;
  ascensor: boolean;
  garaje: boolean;
  noHipotecable: boolean;
}

function CheckboxRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      className="flex items-center gap-3 cursor-pointer group"
      style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--foreground)' }}
    >
      <div
        onClick={() => onChange(!checked)}
        className="flex items-center justify-center transition-colors"
        style={{
          width: '16px',
          height: '16px',
          border: `1.5px solid ${checked ? 'var(--primary)' : 'var(--border)'}`,
          backgroundColor: checked ? 'var(--primary)' : 'transparent',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="group-hover:text-primary transition-colors">{label}</span>
    </label>
  );
}

function FiltersPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
}) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const activeCount = [
    filters.type !== '',
    filters.location !== '',
    filters.priceRange[0] > 50000 || filters.priceRange[1] < 1000000,
    filters.piscina,
    filters.ascensor,
    filters.garaje,
    filters.noHipotecable,
  ].filter(Boolean).length;

  return (
    <aside
      className="flex flex-col gap-8"
      style={{
        width: '260px',
        flexShrink: 0,
        padding: '28px',
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: '88px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} style={{ color: 'var(--primary)' }} strokeWidth={1.5} />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--foreground)',
            }}
          >
            Filtros
          </span>
          {activeCount > 0 && (
            <span
              className="flex items-center justify-center"
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
                fontSize: '10px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 hover:text-primary transition-colors"
            style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)' }}
          >
            <X size={11} /> Limpiar
          </button>
        )}
      </div>

      {/* Price range */}
      <div className="flex flex-col gap-4">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          Precio
        </p>
        <div className="flex justify-between" style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--foreground)' }}>
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
        <Slider.Root
          className="relative flex items-center w-full"
          style={{ height: '20px' }}
          value={filters.priceRange}
          onValueChange={(val) => set('priceRange', val as [number, number])}
          min={50000}
          max={1000000}
          step={10000}
        >
          <Slider.Track className="relative grow rounded-full" style={{ height: '2px', backgroundColor: 'var(--border)' }}>
            <Slider.Range className="absolute h-full rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
          </Slider.Track>
          <Slider.Thumb
            className="block rounded-full focus:outline-none cursor-pointer"
            style={{ width: '14px', height: '14px', backgroundColor: 'var(--primary)', boxShadow: '0 1px 6px rgba(26,54,93,0.3)' }}
            aria-label="Precio mínimo"
          />
          <Slider.Thumb
            className="block rounded-full focus:outline-none cursor-pointer"
            style={{ width: '14px', height: '14px', backgroundColor: 'var(--primary)', boxShadow: '0 1px 6px rgba(26,54,93,0.3)' }}
            aria-label="Precio máximo"
          />
        </Slider.Root>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          Localidad
        </p>
        <select
          value={filters.location}
          onChange={(e) => set('location', e.target.value)}
          className="w-full outline-none bg-background"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            padding: '10px 12px',
            border: '1px solid var(--border)',
            color: filters.location ? 'var(--foreground)' : 'var(--muted-foreground)',
            cursor: 'pointer',
          }}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc || 'Todas las zonas'}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          Tipo de inmueble
        </p>
        <div className="flex flex-col gap-2.5">
          {PROPERTY_TYPES.map((pt) => (
            <label
              key={pt.value}
              className="flex items-center gap-2.5 cursor-pointer"
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--foreground)' }}
            >
              <div
                onClick={() => set('type', pt.value)}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: `1.5px solid ${filters.type === pt.value ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: filters.type === pt.value ? 'var(--primary)' : 'transparent',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              />
              <span className={filters.type === pt.value ? 'text-primary font-medium' : ''}>
                {pt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--muted-foreground)',
          }}
        >
          Características
        </p>
        <div className="flex flex-col gap-3">
          <CheckboxRow label="Piscina" checked={filters.piscina} onChange={(v) => set('piscina', v)} />
          <CheckboxRow label="Ascensor" checked={filters.ascensor} onChange={(v) => set('ascensor', v)} />
          <CheckboxRow label="Garaje" checked={filters.garaje} onChange={(v) => set('garaje', v)} />
          <CheckboxRow label="No Hipotecable" checked={filters.noHipotecable} onChange={(v) => set('noHipotecable', v)} />
        </div>
      </div>
    </aside>
  );
}

const DEFAULT_FILTERS: Filters = {
  priceRange: [50000, 1000000],
  type: '',
  location: '',
  piscina: false,
  ascensor: false,
  garaje: false,
  noHipotecable: false,
};

export function CatalogoPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = properties.filter((p) => {
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.location && p.location !== filters.location) return false;
    if (filters.piscina && !p.piscina) return false;
    if (filters.ascensor && !p.ascensor) return false;
    if (filters.garaje && !p.garaje) return false;
    if (filters.noHipotecable && !p.noHipotecable) return false;
    return true;
  });

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Page header */}
      <div style={{ padding: '48px 0 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-end">
            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div className="w-6 h-px" style={{ backgroundColor: 'var(--accent)' }} />
                Propiedades
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                Catálogo de Inmuebles
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)' }}>
                <strong style={{ color: 'var(--foreground)', fontWeight: 600 }}>{filtered.length}</strong> propiedades encontradas
              </p>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border hover:border-primary transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--foreground)' }}
              >
                <SlidersHorizontal size={13} strokeWidth={1.5} />
                Filtros
              </button>
            </div>
          </div>
          {/* Mobile filters */}
          {showFilters && (
            <div className="lg:hidden mt-6">
              <FiltersPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FiltersPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </div>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center text-center py-20"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--foreground)', marginBottom: '8px' }}>
                  Sin resultados
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)', marginBottom: '20px' }}>
                  Prueba ajustando los filtros de búsqueda
                </p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="px-6 py-2.5 transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* CTA block at bottom */}
            {filtered.length > 0 && (
              <div
                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
                style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--foreground)' }}>
                    ¿No encuentras lo que buscas?
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                    Cuéntanos qué necesitas y lo buscamos por ti.
                  </p>
                </div>
                <a
                  href="https://wa.me/34600123456?text=Hola%20Julio%2C%20busco%20una%20propiedad%20y%20no%20la%20encuentro%20en%20el%20cat%C3%A1logo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-7 py-3 no-underline transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  Contactar por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
