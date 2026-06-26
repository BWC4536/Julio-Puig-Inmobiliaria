import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import * as Slider from '@radix-ui/react-slider';
import { ArrowRight, Phone, Mail, MapPin, Home, TrendingUp, FileText, Shield } from 'lucide-react';

function AgentSection() {
  return (
    <section style={{ padding: '96px 0', backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
          {/* Photo side */}
          <div className="relative order-last lg:order-first">
            {/* Background decoration */}
            <div
              className="absolute"
              style={{
                top: '-24px',
                left: '-24px',
                width: '200px',
                height: '200px',
                backgroundColor: 'var(--secondary)',
                zIndex: 0,
              }}
            />
            <div
              className="relative"
              style={{ zIndex: 1, padding: '0 0 20px 20px' }}
            >
              {/* Gold frame offset */}
              <div
                className="absolute"
                style={{
                  bottom: 0,
                  left: 0,
                  width: 'calc(100% - 20px)',
                  height: 'calc(100% - 20px)',
                  border: '1.5px solid var(--accent)',
                  zIndex: 0,
                }}
              />
              <img
                src="/profile.png"
                alt="Julio Puig — Agente Inmobiliario en Sevilla"
                className="relative block w-full object-cover object-top"
                style={{
                  zIndex: 1,
                  maxHeight: '560px',
                  boxShadow: '24px 24px 60px rgba(26, 54, 93, 0.16), 0 8px 24px rgba(0,0,0,0.08)',
                }}
              />
            </div>
            {/* Credential badge */}
            <div
              className="absolute right-0 flex flex-col gap-1"
              style={{
                bottom: '40px',
                right: '-16px',
                backgroundColor: 'var(--primary)',
                padding: '16px 22px',
                zIndex: 10,
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                Licencia API
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>
                Nº 4127
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                COAPI Sevilla
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
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
                Sobre nosotros
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.02em',
                }}
              >
                Julio Puig,<br />
                <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>tu agente de confianza</span><br />
                en el Aljarafe
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--muted-foreground)',
                  maxWidth: '500px',
                }}
              >
                Más de 12 años acompañando a familias en uno de los procesos más importantes de sus vidas. Mi compromiso no termina en la firma — empieza ahí.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--muted-foreground)',
                  maxWidth: '500px',
                }}
              >
                Nacido y criado en el Aljarafe, conozco cada calle, cada barrio, cada tendencia del mercado local. No soy un portal. Soy la persona que te coge el teléfono.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-0"
              style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}
            >
              {[
                { value: '+347', label: 'Familias ayudadas' },
                { value: '12', label: 'Años de experiencia' },
                { value: '98%', label: 'Satisfacción del cliente' },
                { value: '€2.1M', label: 'Volumen vendido en 2024' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 py-5"
                  style={{
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    paddingLeft: i % 2 === 1 ? '24px' : '0',
                    paddingRight: i % 2 === 0 ? '24px' : '0',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: 'var(--primary)',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {s.value}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: Home,
      title: 'Compraventa Residencial',
      desc: 'Acompañamiento completo en la compra o venta de tu propiedad. Negociación experta, gestión documental y seguimiento hasta la firma en notaría.',
    },
    {
      icon: TrendingUp,
      title: 'Inversión Inmobiliaria',
      desc: 'Análisis de rentabilidad, selección de activos con alto potencial y asesoramiento en la gestión del patrimonio inmobiliario.',
    },
    {
      icon: FileText,
      title: 'Gestión de Alquileres',
      desc: 'Búsqueda de inquilinos solventes, redacción de contratos, gestión de incidencias y optimización de la rentabilidad del alquiler.',
    },
    {
      icon: Shield,
      title: 'Asesoría Jurídica',
      desc: 'Revisión de contratos, análisis de cargas, gestión de herencias y divorcios. Coordinación con nuestra red de abogados especializados.',
    },
  ];

  return (
    <section id="servicios" style={{ padding: '96px 0', backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">
          <div className="flex flex-col gap-5">
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
              Nuestros Servicios
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: 'var(--foreground)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Un servicio<br />
              <span style={{ fontStyle: 'italic' }}>completo,</span><br />
              sin intermediarios
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--muted-foreground)', maxWidth: '260px' }}>
              Gestionamos todos los aspectos de tu operación inmobiliaria desde un único punto de contacto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-8 transition-all duration-200 hover:bg-background group"
                  style={{
                    borderTop: i < 2 ? 'none' : '1px solid var(--border)',
                    borderLeft: i % 2 === 1 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                    borderRight: i % 2 === 0 ? 'none' : 'none',
                  }}
                >
                  <div
                    className="flex items-center justify-center transition-colors group-hover:bg-primary"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'var(--secondary)',
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="transition-colors group-hover:text-primary-foreground"
                      style={{ color: 'var(--primary)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        lineHeight: 1.3,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.7, color: 'var(--muted-foreground)' }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(3.5);

  const capital = propertyPrice * (1 - downPaymentPct / 100);
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const monthlyPayment =
    monthlyRate === 0
      ? capital / n
      : (capital * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  const formatEuro = (v: number) =>
    v.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const SliderField = ({
    label,
    value,
    min,
    max,
    step,
    display,
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    display: string;
    onChange: (v: number) => void;
  }) => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--foreground)' }}>
          {display}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center w-full"
        style={{ height: '20px' }}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="relative grow rounded-full" style={{ height: '2px', backgroundColor: 'var(--border)' }}>
          <Slider.Range className="absolute h-full rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
        </Slider.Track>
        <Slider.Thumb
          className="block rounded-full focus:outline-none cursor-pointer"
          style={{ width: '16px', height: '16px', backgroundColor: 'var(--primary)', boxShadow: '0 1px 6px rgba(26,54,93,0.3)' }}
        />
      </Slider.Root>
      <div className="flex justify-between" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--muted-foreground)' }}>
        <span>{min.toLocaleString('es-ES')}</span>
        <span>{max.toLocaleString('es-ES')}</span>
      </div>
    </div>
  );

  return (
    <section style={{ padding: '96px 0', backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
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
                Asesoría Financiera
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Calcula tu<br />
                <span style={{ fontStyle: 'italic' }}>cuota hipotecaria</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
                Nuestro equipo financiero tiene acceso a más de 15 entidades bancarias y puede negociar condiciones que no están disponibles al público general.
              </p>
            </div>

            {/* Benefits */}
            <div
              className="flex flex-col gap-4 p-7"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            >
              {[
                { label: 'Comparativa de +15 bancos', sub: 'Accedemos a condiciones exclusivas de canal' },
                { label: 'Sin coste para el comprador', sub: 'Nuestra comisión la paga el banco' },
                { label: 'Gestión completa', sub: 'Desde la pre-aprobación hasta la firma' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-0.5"
                  style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none', paddingTop: i > 0 ? '16px' : '0' }}
                >
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted-foreground)' }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div
            className="flex flex-col gap-8 p-8 lg:p-10"
            style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-col gap-1">
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                Calculadora Hipotecaria
              </span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {formatEuro(monthlyPayment).replace('€', '')}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--muted-foreground)', fontWeight: 400 }}>
                  €/mes
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
                Capital a financiar: <strong style={{ color: 'var(--foreground)' }}>{formatEuro(capital)}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-7">
              <SliderField
                label="Precio de la vivienda"
                value={propertyPrice}
                min={80000}
                max={1500000}
                step={5000}
                display={formatEuro(propertyPrice)}
                onChange={setPropertyPrice}
              />
              <SliderField
                label={`Entrada (${downPaymentPct}%)`}
                value={downPaymentPct}
                min={5}
                max={60}
                step={1}
                display={formatEuro(propertyPrice * downPaymentPct / 100)}
                onChange={setDownPaymentPct}
              />
              <SliderField
                label="Plazo"
                value={years}
                min={5}
                max={35}
                step={1}
                display={`${years} años`}
                onChange={setYears}
              />
              <SliderField
                label="Tipo de interés anual"
                value={rate}
                min={1}
                max={8}
                step={0.1}
                display={`${rate.toFixed(1)}%`}
                onChange={setRate}
              />
            </div>

            <div
              className="pt-6 flex flex-col gap-4"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                * Cálculo orientativo. No incluye seguros ni comisiones bancarias.
              </p>
              <a
                href="https://wa.me/34633717714?text=Hola%20Julio%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20financiaci%C3%B3n%20hipotecaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 no-underline transition-opacity hover:opacity-90"
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
                Solicitar estudio hipotecario gratuito
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '13px 16px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    width: '100%',
    outline: 'none',
  };

  return (
    <section id="contacto" style={{ padding: '96px 0', backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
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
                Contacto
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Hablemos<br />
                <span style={{ fontStyle: 'italic' }}>sin compromiso</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.75, color: 'var(--muted-foreground)' }}>
                Disponible de lunes a sábado, de 9:00 a 20:00. Respondo personalmente en menos de 2 horas.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { icon: Phone, label: '+34 633 717 714', href: 'tel:+34633717714' },
                { icon: Mail, label: 'juliopuig.inmobiliaria@gmail.com', href: 'mailto:juliopuig.inmobiliaria@gmail.com' },
                { icon: MapPin, label: 'Calle Cervantes, 70, Coria del Río, 41100', href: 'https://maps.app.goo.gl/HYSv5ExywRBpZfgr9' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 no-underline hover:text-primary transition-colors group"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--foreground)' }}
                >
                  <div
                    className="flex items-center justify-center group-hover:bg-primary transition-colors"
                    style={{ width: '36px', height: '36px', backgroundColor: 'var(--secondary)', flexShrink: 0 }}
                  >
                    <Icon size={15} strokeWidth={1.5} className="group-hover:text-white transition-colors" style={{ color: 'var(--primary)' }} />
                  </div>
                  {label}
                </a>
              ))}
            </div>

            {/* Office map */}
            <div className="overflow-hidden rounded-lg shadow-sm" style={{ marginTop: '16px', height: '240px' }}>
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=es&q=Calle%20Cervantes,%2070,%20Coria%20del%20R%C3%ADo,%20Spain+(Julio%20Puig%20Real%20Estate)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: 'auto' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oficina Julio Puig Inmobiliaria"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="flex flex-col" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', padding: '40px' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-5 h-full text-center" style={{ minHeight: '380px' }}>
                <div
                  className="flex items-center justify-center"
                  style={{ width: '56px', height: '56px', backgroundColor: 'var(--secondary)' }}
                >
                  <Phone size={24} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '8px' }}>
                    ¡Mensaje recibido!
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                    Julio te contactará personalmente<br />en menos de 2 horas.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      className="focus:border-primary transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle}
                      className="focus:border-primary transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    className="focus:border-primary transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Cuéntame qué estás buscando o en qué puedo ayudarte..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    className="focus:border-primary transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-4 transition-opacity hover:opacity-90 mt-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  Enviar mensaje
                  <ArrowRight size={13} />
                </button>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--muted-foreground)', lineHeight: 1.5, textAlign: 'center' }}>
                  Tus datos están protegidos y no serán cedidos a terceros.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NosotrosPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      <AgentSection />
      <ServicesSection />
      <MortgageCalculator />
      <ContactSection />
    </>
  );
}
