import { Link } from 'react-router';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.9 }}>
              Julio Puig
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', fontStyle: 'italic', opacity: 0.5, marginTop: '2px' }}>
              Real Estate · Sevilla
            </p>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.7, opacity: 0.6, maxWidth: '260px' }}>
            Agencia boutique especializada en el Aljarafe sevillano. Más de 12 años poniendo familias en su hogar.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" style={{ opacity: 0.5 }} className="hover:opacity-100 transition-opacity">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" style={{ opacity: 0.5 }} className="hover:opacity-100 transition-opacity">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.4 }}>
            Navegación
          </p>
          <nav className="flex flex-col gap-3">
            {[
              { to: '/inicio', label: 'Inicio' },
              { to: '/catalogo', label: 'Catálogo de Propiedades' },
              { to: '/nosotros', label: 'Sobre Nosotros' },
              { to: '/nosotros#servicios', label: 'Asesoría Financiera' },
              { to: '/nosotros#contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="no-underline hover:opacity-100 transition-opacity"
                style={{ fontSize: '13px', opacity: 0.6 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.4 }}>
            Contacto
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+34600123456"
              className="flex items-center gap-3 no-underline hover:opacity-100 transition-opacity"
              style={{ fontSize: '13px', opacity: 0.6 }}
            >
              <Phone size={13} strokeWidth={1.5} />
              +34 600 123 456
            </a>
            <a
              href="mailto:hola@juliopuig.es"
              className="flex items-center gap-3 no-underline hover:opacity-100 transition-opacity"
              style={{ fontSize: '13px', opacity: 0.6 }}
            >
              <Mail size={13} strokeWidth={1.5} />
              hola@juliopuig.es
            </a>
            <div className="flex items-start gap-3" style={{ fontSize: '13px', opacity: 0.6 }}>
              <MapPin size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>Av. de la Borbolla 12, Bajo<br />41004 Sevilla, España</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', opacity: 0.4 }}
      >
        <span>© {new Date().getFullYear()} Julio Puig Real Estate. Todos los derechos reservados.</span>
        <div className="flex gap-4">
          <a href="#" className="no-underline hover:opacity-100 transition-opacity">Privacidad</a>
          <a href="#" className="no-underline hover:opacity-100 transition-opacity">Cookies</a>
          <a href="#" className="no-underline hover:opacity-100 transition-opacity">API Inmobiliaria</a>
        </div>
      </div>
    </footer>
  );
}
