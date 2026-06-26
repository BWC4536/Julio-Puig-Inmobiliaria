import { Link } from 'react-router';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div>
            <img src="/logo.png" alt="Julio Puig Real Estate" className="h-16 object-contain" />
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.7, opacity: 0.6, maxWidth: '260px' }}>
            Agencia boutique especializada en el Aljarafe sevillano. Más de 12 años poniendo familias en su hogar.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/juliopuig_agenteinmobiliario/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ opacity: 0.5 }} className="hover:opacity-100 transition-opacity">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/p/Julio-Puig-Colchero-Agente-Inmobiliario-100085542709383/?locale=es_ES" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ opacity: 0.5 }} className="hover:opacity-100 transition-opacity">
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
              href="tel:+34633717714"
              className="flex items-center gap-3 no-underline hover:opacity-100 transition-opacity"
              style={{ fontSize: '13px', opacity: 0.6 }}
            >
              <Phone size={13} strokeWidth={1.5} />
              +34 633 717 714
            </a>
            <a
              href="mailto:juliopuig.inmobiliaria@gmail.com"
              className="flex items-center gap-3 no-underline hover:opacity-100 transition-opacity"
              style={{ fontSize: '13px', opacity: 0.6 }}
            >
              <Mail size={13} strokeWidth={1.5} />
              juliopuig.inmobiliaria@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/HYSv5ExywRBpZfgr9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:opacity-100 transition-opacity no-underline"
              style={{ fontSize: '13px', opacity: 0.6 }}
            >
              <MapPin size={13} strokeWidth={1.5} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>Calle Cervantes, 70<br />41100 Coria del Río, Spain</span>
            </a>
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
