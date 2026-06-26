import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { to: '/inicio', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/inicio" className="flex items-center no-underline">
          <img src="/logo.png" alt="Julio Puig Real Estate" className="h-12 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'no-underline transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary',
                ].join(' ')
              }
              style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.04em' }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/juliopuig_agenteinmobiliario/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="https://www.facebook.com/p/Julio-Puig-Colchero-Agente-Inmobiliario-100085542709383/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
          </div>
          <a
            href="tel:+34633717714"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}
          >
            <Phone size={13} strokeWidth={1.5} />
            <span>+34 633 717 714</span>
          </a>
          <Link
            to="/nosotros#contacto"
            className="px-5 py-2.5 no-underline transition-colors duration-200 hover:opacity-90"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Agendar Visita
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                [
                  'no-underline transition-colors',
                  isActive ? 'text-primary' : 'text-foreground',
                ].join(' ')
              }
              style={{ fontFamily: 'var(--font-body)', fontSize: '15px' }}
            >
              {link.label}
            </NavLink>
          ))}
          <hr className="border-border" />
          
          <div className="flex items-center gap-4 py-2 text-muted-foreground">
            <a href="https://www.instagram.com/juliopuig_agenteinmobiliario/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
            <a href="https://www.facebook.com/p/Julio-Puig-Colchero-Agente-Inmobiliario-100085542709383/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Facebook size={22} strokeWidth={1.5} />
            </a>
          </div>

          <a
            href="tel:+34633717714"
            className="text-muted-foreground no-underline flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}
          >
            <Phone size={14} />
            +34 633 717 714
          </a>
          <Link
            to="/nosotros#contacto"
            onClick={() => setMobileOpen(false)}
            className="px-5 py-3 text-center no-underline mt-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Agendar Visita
          </Link>
        </div>
      )}
    </header>
  );
}
