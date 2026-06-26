import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  Bed, Bath, Maximize2, ArrowLeft, ChevronLeft, ChevronRight,
  X, MapPin, Calendar, Layers, Compass, Zap, Car, Waves,
  ShieldCheck, ArrowRight, Phone, Heart,
} from 'lucide-react';
import { properties, formatPrice } from '../data';
import { PropertyCard } from '../PropertyCard';
import { useFavorites } from '../../hooks/useFavorites';

function TagBadge({ tag }: { tag: string }) {
  const isVendido = tag === 'VENDIDO';
  const isRebajado = tag.startsWith('REBAJADO');
  const isExclusiva = tag === 'EXCLUSIVA';
  let cls = 'inline-block px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase ';
  if (isVendido) cls += 'bg-foreground text-background';
  else if (isRebajado) cls += 'bg-destructive text-destructive-foreground';
  else if (isExclusiva) cls += 'bg-accent text-accent-foreground';
  else cls += 'bg-primary text-primary-foreground';
  return <span className={cls}>{tag}</span>;
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Cerrar"
      >
        <X size={28} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 p-3 text-white hover:text-gray-300 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={36} />
      </button>
      <img
        src={images[idx]}
        alt={`Foto ${idx + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 p-3 text-white hover:text-gray-300 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={36} />
      </button>
      <span
        className="absolute bottom-6 text-white/60"
        style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}
      >
        {idx + 1} / {images.length}
      </span>
    </div>
  );
}

function Gallery({ mainImage, gallery, title }: { mainImage: string; gallery: string[]; title: string }) {
  const all = [mainImage, ...gallery];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      {lightboxIdx !== null && (
        <Lightbox images={all} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
      <div className="w-full">
        {/* Main image */}
        <div
          className="w-full overflow-hidden cursor-pointer group relative"
          style={{ aspectRatio: '16/7', maxHeight: '520px' }}
          onClick={() => setLightboxIdx(0)}
        >
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
          >
            <span
              className="px-5 py-2.5 text-white"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              Ver galería
            </span>
          </div>
        </div>
        {/* Thumbnails */}
        {gallery.length > 0 && (
          <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: `repeat(${Math.min(gallery.length, 4)}, 1fr)` }}>
            {gallery.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer group relative"
                style={{ aspectRatio: '4/3' }}
                onClick={() => setLightboxIdx(i + 1)}
              >
                <img
                  src={img}
                  alt={`${title} - foto ${i + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {i === 3 && gallery.length > 4 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <span className="text-white" style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 600 }}>
                      +{gallery.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}
    >
      <span style={{ color: 'var(--primary)' }}>{icon}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--foreground)' }}>{label}</span>
    </div>
  );
}

function EnergyBadge({ cert }: { cert: string }) {
  const colors: Record<string, string> = {
    A: '#2E7D32', B: '#558B2F', C: '#F9A825', D: '#EF6C00', E: '#C62828', F: '#B71C1C', G: '#880E4F',
  };
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex items-center justify-center"
        style={{
          width: '28px',
          height: '28px',
          backgroundColor: colors[cert] ?? '#767676',
          color: '#fff',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 700,
        }}
      >
        {cert}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--foreground)' }}>
        Certificado energético
      </span>
    </div>
  );
}

// ─── Favorite Modal ───────────────────────────────────────────────────────────
function FavoriteModal({
  propertyId, propertyTitle, propertyPrice, onClose,
}: {
  propertyId: number; propertyTitle: string; propertyPrice: number; onClose: () => void;
}) {
  const { addFavorite, isFavorited } = useFavorites();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Introduce un email válido'); return; }
    addFavorite({ propertyId, email, priceAtTime: propertyPrice, title: propertyTitle, savedAt: new Date().toISOString() });
    setStep('done');
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={onClose}>
      <div
        className="w-full max-w-sm mx-4 bg-white rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'var(--primary)' }}>
          <div className="flex items-center gap-2">
            <Heart size={16} fill="#fff" color="#fff" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Guardar propiedad</span>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.6)' }}><X size={18} /></button>
        </div>
        {step === 'done' ? (
          <div className="p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF0F0' }}>
              <Heart size={22} fill="#e11d48" color="#e11d48" />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>¡Guardado!</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '6px', lineHeight: 1.6 }}>
                Te avisaremos en <strong style={{ color: 'var(--foreground)' }}>{email}</strong> si el precio de esta propiedad baja.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '6px' }}
            >
              Entendido
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
              Introduce tu email y te notificaremos automáticamente si el precio de <strong style={{ color: 'var(--foreground)' }}>{propertyTitle}</strong> baja.
            </p>
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Tu email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="tu@email.com"
                style={{ padding: '11px 14px', border: `1px solid ${error ? '#e11d48' : 'var(--border)'}`, borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none', width: '100%' }}
              />
              {error && <span style={{ fontSize: '12px', color: '#e11d48' }}>{error}</span>}
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, borderRadius: '6px' }}
            >
              <Heart size={14} />
              Guardar y recibir alertas
            </button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)', textAlign: 'center' }}>Sin spam. Solo te escribimos si el precio baja.</p>
          </form>
        )}
      </div>
    </div>
  );
}

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));

  const { isFavorited } = useFavorites();
  const [showFavModal, setShowFavModal] = useState(false);

  if (!property) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-6"
        style={{ paddingTop: '80px', backgroundColor: 'var(--background)' }}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--foreground)' }}>
          Propiedad no encontrada
        </p>
        <button
          onClick={() => navigate('/catalogo')}
          className="px-6 py-3"
          style={{ backgroundColor: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px' }}
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const related = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const whatsappMsg = encodeURIComponent(`Hola Julio, me interesa la propiedad "${property.title}" en ${property.location}. ¿Podría obtener más información?`);
  const favorited = isFavorited(property.id);

  const techSpecs = [
    property.beds && { icon: <Bed size={14} strokeWidth={1.5} />, label: `${property.beds} habitaciones` },
    property.baths && { icon: <Bath size={14} strokeWidth={1.5} />, label: `${property.baths} baños` },
    { icon: <Maximize2 size={14} strokeWidth={1.5} />, label: `${property.sqm} m² construidos` },
    property.año && { icon: <Calendar size={14} strokeWidth={1.5} />, label: `Año ${property.año}` },
    property.planta && { icon: <Layers size={14} strokeWidth={1.5} />, label: property.planta },
    property.orientacion && { icon: <Compass size={14} strokeWidth={1.5} />, label: `Orientación ${property.orientacion}` },
    property.piscina && { icon: <Waves size={14} strokeWidth={1.5} />, label: 'Piscina' },
    property.garaje && { icon: <Car size={14} strokeWidth={1.5} />, label: 'Garaje' },
    property.ascensor && { icon: <Zap size={14} strokeWidth={1.5} />, label: 'Ascensor' },
    property.noHipotecable && { icon: <ShieldCheck size={14} strokeWidth={1.5} />, label: 'No hipotecable' },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <div style={{ paddingTop: '64px', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      {showFavModal && property && (
        <FavoriteModal
          propertyId={property.id}
          propertyTitle={property.title}
          propertyPrice={property.price}
          onClose={() => setShowFavModal(false)}
        />
      )}
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}
          >
            <ArrowLeft size={13} />
            Volver
          </button>
          <span style={{ color: 'var(--border)', fontSize: '14px' }}>/</span>
          <Link
            to="/catalogo"
            className="hover:text-primary transition-colors no-underline"
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}
          >
            Catálogo
          </Link>
          <span style={{ color: 'var(--border)', fontSize: '14px' }}>/</span>
          <span
            className="truncate max-w-[200px] sm:max-w-none"
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--foreground)' }}
          >
            {property.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Gallery */}
        <Gallery mainImage={property.image} gallery={property.gallery} title={property.title} />

        {/* Main layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* ─── Left column ─── */}
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {property.tag && <TagBadge tag={property.tag} />}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  {property.type}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                {property.title}
              </h1>
              <div className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted-foreground)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {property.location}
                </span>
              </div>
              {/* Price — visible on mobile only here, hidden on desktop (shown in sticky panel) */}
              <div className="lg:hidden flex items-center justify-between">
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {formatPrice(property.price)}
                </p>
                <button
                  onClick={() => setShowFavModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 transition-all hover:scale-105"
                  style={{ border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: '#fff' }}
                  title="Guardar propiedad"
                >
                  <Heart size={16} style={{ color: '#e11d48' }} fill={favorited ? '#e11d48' : 'none'} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                    {favorited ? 'Guardada' : 'Guardar'}
                  </span>
                </button>
              </div>
            </div>

            {/* Key stats bar */}
            <div
              className="flex items-center gap-6 flex-wrap py-5 px-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {[
                { icon: <Bed size={16} strokeWidth={1.5} />, value: property.beds, unit: 'hab.' },
                { icon: <Bath size={16} strokeWidth={1.5} />, value: property.baths, unit: 'baños' },
                { icon: <Maximize2 size={16} strokeWidth={1.5} />, value: property.sqm, unit: 'm²' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5" style={{ color: 'var(--foreground)' }}>
                  <span style={{ color: 'var(--primary)' }}>{s.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {s.value}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                    {s.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Descripción
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: 'var(--foreground)',
                }}
              >
                {property.description}
              </p>
            </div>

            {/* Features grid */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Características
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techSpecs.map((spec, i) => (
                  <FeatureChip key={i} icon={spec.icon} label={spec.label} />
                ))}
              </div>
              {property.certificadoEnergetico && (
                <div className="mt-1">
                  <EnergyBadge cert={property.certificadoEnergetico} />
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div
              className="lg:hidden flex flex-col gap-3 p-6"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <a
                href={`https://wa.me/34633717714?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 no-underline transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#25D366', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}
              >
                Consultar por WhatsApp
              </a>
              <a
                href="tel:+34633717714"
                className="flex items-center justify-center gap-2 py-4 no-underline transition-opacity hover:opacity-90"
                style={{ border: '1px solid var(--border)', color: 'var(--foreground)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', backgroundColor: '#fff' }}
              >
                <Phone size={14} className="text-primary" />
                +34 633 717 714
              </a>
              <Link
                to="/nosotros#contacto"
                className="flex items-center justify-center gap-2 py-4 no-underline transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                <Calendar size={14} />
                Agendar visita
              </Link>
            </div>
          </div>

          {/* ─── Right column (sticky panel) ─── */}
          <aside
            className="hidden lg:flex flex-col gap-6 p-8"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              position: 'sticky',
              top: '88px',
            }}
          >
            {/* Price + Favorite */}
            <div className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-foreground)',
                }}
              >
                Precio de venta
              </span>
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {formatPrice(property.price)}
                </span>
                <button
                  onClick={() => setShowFavModal(true)}
                  className="flex flex-col items-center gap-0.5 p-2 transition-all hover:scale-110"
                  title={favorited ? 'Ya guardada' : 'Guardar y recibir alerta de precio'}
                >
                  <Heart size={20} style={{ color: '#e11d48' }} fill={favorited ? '#e11d48' : 'none'} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--muted-foreground)' }}>
                    {favorited ? 'Guardada' : 'Guardar'}
                  </span>
                </button>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

            {/* Agent info */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                JP
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>
                  Julio Puig
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  Agente inmobiliario · Aljarafe
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/34633717714?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#25D366',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Consultar por WhatsApp
              </a>
              <a
                href="tel:+34633717714"
                className="flex items-center justify-center gap-2 py-3 rounded-md text-sm font-semibold tracking-wide border transition-all duration-200"
                style={{
                  borderColor: 'rgba(0,0,0,0.12)',
                  color: 'var(--foreground)',
                  backgroundColor: '#fff',
                }}
              >
                <Phone size={16} className="text-primary" />
                +34 633 717 714
              </a>
              <Link
                to="/nosotros#contacto"
                className="flex items-center justify-center gap-2 py-3.5 no-underline transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Agendar visita
                <ArrowRight size={13} />
              </Link>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--muted-foreground)',
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              Respuesta garantizada en menos de 24h. Sin compromiso.
            </p>
          </aside>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ backgroundColor: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Propiedades similares
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                También te puede interesar
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onClick={() => navigate(`/propiedad/${p.id}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
