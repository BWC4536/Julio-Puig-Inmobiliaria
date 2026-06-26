import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Search, ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { properties } from '../data';
import { PropertyCard } from '../PropertyCard';

function HeroSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalogo');
  };

  return (
    <section
      className="min-h-screen flex items-center"
      style={{ paddingTop: '96px', paddingBottom: '80px', backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left: Text + search */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Inmobiliaria Boutique · Sevilla
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                Encuentra tu hogar<br />
                <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>
                  en el Aljarafe
                </span>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--muted-foreground)',
                  maxWidth: '440px',
                }}
              >
                Acceso exclusivo a las mejores propiedades del Aljarafe sevillano. Asesoramiento personalizado, sin presión, con resultados.
              </p>
            </div>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-0 overflow-hidden"
              style={{ border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
            >
              <input
                type="text"
                placeholder="Localidad o zona (ej. Tomares)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-5 py-3.5 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', borderRight: '1px solid var(--border)' }}
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-5 py-3.5 outline-none bg-transparent text-foreground cursor-pointer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: type ? 'var(--foreground)' : 'var(--muted-foreground)',
                  borderRight: '1px solid var(--border)',
                  minWidth: '160px',
                }}
              >
                <option value="">Tipo de inmueble</option>
                <option value="piso">Piso / Ático</option>
                <option value="chalet">Chalet</option>
                <option value="villa">Villa</option>
                <option value="adosado">Adosado</option>
                <option value="duplex">Dúplex</option>
              </select>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 transition-opacity hover:opacity-90"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Search size={13} />
                Buscar
              </button>
            </form>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { number: '18', label: 'Casas vendidas\neste mes' },
                { number: '347', label: 'Familias\nsatisfechas' },
                { number: '12', label: 'Años de\nexperiencia' },
              ].map((stat) => (
                <div key={stat.number} className="flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 600,
                      lineHeight: 1,
                      color: 'var(--foreground)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      lineHeight: 1.4,
                      color: 'var(--muted-foreground)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating framed hero photo */}
          <div className="hidden lg:block">
            <div className="relative" style={{ padding: '20px 0 0 20px' }}>
              {/* Gold decorative frame offset behind */}
              <div
                className="absolute top-0 left-0"
                style={{
                  width: 'calc(100% - 20px)',
                  height: 'calc(100% - 20px)',
                  border: '1.5px solid var(--accent)',
                  zIndex: 0,
                }}
              />
              {/* Hero image */}
              <img
                src="https://images.unsplash.com/photo-1757439402359-aed14d39fc1b?w=900&h=700&fit=crop&auto=format"
                alt="Villa de lujo en el Aljarafe sevillano con piscina privada"
                className="relative block w-full object-cover"
                style={{
                  zIndex: 1,
                  boxShadow: '32px 32px 80px rgba(26, 54, 93, 0.18), 0 8px 30px rgba(0, 0, 0, 0.1)',
                  aspectRatio: '4/3',
                }}
              />
              {/* Floating badge */}
              <div
                className="absolute z-10 flex flex-col gap-1"
                style={{
                  bottom: '-16px',
                  left: '-16px',
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  padding: '14px 20px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  750.000 €
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--muted-foreground)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Villa · Tomares · 420 m²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SellerLeadMagnet() {
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) setSubmitted(true);
  };

  return (
    <section style={{ backgroundColor: 'var(--primary)', padding: '72px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div className="flex flex-col gap-5">
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: 'var(--accent)' }} />
              Propietarios
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              Te valoramos tu casa<br />
              <span style={{ fontStyle: 'italic' }}>gratis y sin compromiso</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>
              Conoce el valor real de tu propiedad en el mercado actual del Aljarafe. Análisis personalizado, sin presión y sin coste.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                'Valoración en menos de 48 horas',
                'Sin compromiso de venta',
                'Basada en datos reales del mercado',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center gap-4 text-center"
                style={{ padding: '40px', backgroundColor: 'rgba(255,255,255,0.08)', minHeight: '200px' }}
              >
                <CheckCircle size={36} style={{ color: 'var(--accent)' }} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FFFFFF', fontWeight: 500 }}>
                  ¡Solicitud recibida!
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Julio se pondrá en contacto contigo<br />en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="address"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}
                  >
                    Dirección de tu propiedad
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Ej. C/ Mayor 14, Tomares, Sevilla"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                    className="placeholder:text-white/30 focus:border-white/40 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nombre"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                    className="placeholder:text-white/30"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                    className="placeholder:text-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-4 transition-opacity hover:opacity-90 mt-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                  }}
                >
                  Valorar ahora
                  <ArrowRight size={14} />
                </button>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
                  Al enviar, aceptas que Julio Puig Real Estate te contacte para ofrecerte la valoración solicitada.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const navigate = useNavigate();

  return (
    <section style={{ padding: '96px 0', backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-3">
            <div
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
              Nuevas Entradas
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: 'var(--foreground)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Novedades y Oportunidades
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-2.5 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="p-2.5 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {properties.map((property) => (
              <div key={property.id} className="flex-none w-[300px] sm:w-[340px]">
                <PropertyCard
                  property={property}
                  onClick={() => navigate(`/propiedad/${property.id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2 px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Ver todas las propiedades
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustStats() {
  return (
    <section style={{ backgroundColor: 'var(--card)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border">
          {[
            { value: '18', unit: '', label: 'Casas vendidas este mes', sub: 'Datos actualizados en tiempo real' },
            { value: '347', unit: '', label: 'Familias satisfechas', sub: 'Desde 2012' },
            { value: '98', unit: '%', label: 'Tasa de satisfacción', sub: 'Según encuestas post-venta' },
            { value: '42', unit: ' días', label: 'Tiempo medio de venta', sub: 'Vs. 90 días del mercado' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 lg:px-10 first:pl-0 last:pr-0"
            >
              <div className="flex items-baseline gap-0.5">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: 'var(--foreground)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                    }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.4 }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Julio nos encontró el chalet que llevábamos años buscando. Conoce el Aljarafe como nadie y su asesoramiento fue clave.",
      author: "María & José Romero",
      role: "Compradores, Tomares",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    },
    {
      quote: "Vendimos nuestro piso en solo 28 días, por encima del precio que esperábamos. Profesionalidad y trato humano en cada paso.",
      author: "Alejandro García",
      role: "Vendedor, Mairena del Aljarafe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    },
    {
      quote: "La asesoría hipotecaria fue imprescindible. Nos consiguieron unas condiciones que ningún banco nos había ofrecido directamente.",
      author: "Carmen & Luis Vega",
      role: "Compradores, Bormujos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    },
  ];

  return (
    <section style={{ padding: '96px 0', backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-3 mb-14">
          <div
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
            Testimonios
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 600,
              color: 'var(--foreground)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Lo que dicen nuestras familias
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-6 p-8"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--accent)', lineHeight: 1 }}>"</div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'var(--foreground)',
                  fontStyle: 'italic',
                }}
              >
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="rounded-full object-cover"
                  style={{ width: '40px', height: '40px' }}
                />
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{t.author}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStats />
      <PropertyCarousel />
      <SellerLeadMagnet />
      <TestimonialsSection />
    </>
  );
}
