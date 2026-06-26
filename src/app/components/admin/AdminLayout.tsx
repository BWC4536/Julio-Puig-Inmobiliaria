import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  LayoutDashboard, Home, Users, BarChart2,
  LogOut, Menu, X, ChevronRight, Bell, MessageSquare, Calendar
} from 'lucide-react';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/anuncios', label: 'Anuncios', icon: Home, end: false },
  { to: '/admin/contactos', label: 'Contactos', icon: Users, end: false },
  { to: '/admin/vistas', label: 'Vistas', icon: BarChart2, end: false },
];

const SIDEBAR_BG = '#0F2340';
const SIDEBAR_ACTIVE = '#1A365D';
const ACCENT = '#C9A84C';

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'Nuevo Lead', desc: 'Carlos Fernández - 400.000€', time: 'Hace 10 min', icon: Users, color: '#3b82f6' },
    { id: 2, title: 'Visita Programada', desc: 'Chalet en Palomares', time: 'Mañana 10:30', icon: Calendar, color: '#f59e0b' },
    { id: 3, title: 'Mensaje WhatsApp', desc: 'Interés en Ático Mairena', time: 'Hace 1h', icon: MessageSquare, color: '#10b981' },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F4F6FA', fontFamily: 'var(--font-body)' }}>
      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className="fixed top-0 left-0 z-50 flex flex-col transition-all duration-300"
        style={{
          width: collapsed ? '72px' : '240px',
          height: '100vh',
          backgroundColor: SIDEBAR_BG,
          transform: mobileOpen || window.innerWidth >= 1024 ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)', minHeight: '72px' }}
        >
          <div className="flex-shrink-0 flex items-center justify-center">
            {collapsed ? (
              <img src="/logo.png" alt="JP" className="w-8 h-8 object-contain rounded" />
            ) : (
              <img src="/logo.png" alt="Julio Puig Real Estate" className="h-10 w-auto object-contain rounded" />
            )}
          </div>
          <button
            onClick={() => setCollapsed(v => !v)}
            className="hidden lg:flex ml-auto p-1 transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 transition-all duration-150 no-underline group ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? SIDEBAR_ACTIVE : 'transparent',
                borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                borderRadius: '4px',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} strokeWidth={isActive ? 2 : 1.5} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400, letterSpacing: '0.02em' }}>
                      {label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', paddingTop: '16px' }}>
          <a
            href="/inicio"
            className="flex items-center gap-3 px-3 py-2.5 no-underline transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <LogOut size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Ir al sitio web</span>}
          </a>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: collapsed ? '72px' : '240px' }}
      >
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8"
          style={{
            height: '64px',
            backgroundColor: '#fff',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
              Panel de administración
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <button
                className="relative p-2 transition-colors hover:text-primary"
                style={{ color: showNotifications ? 'var(--primary)' : 'var(--muted-foreground)' }}
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notificaciones"
              >
                <Bell size={18} strokeWidth={1.5} />
                <span
                  className="absolute top-1.5 right-1.5 flex items-center justify-center"
                  style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: ACCENT }}
                />
              </button>

              {/* Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden" style={{ top: '100%' }}>
                    <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                      <span className="font-semibold text-sm text-[#1A365D]">Notificaciones</span>
                      <button className="text-xs text-blue-600 hover:underline" onClick={() => setShowNotifications(false)}>Marcar leídas</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {mockNotifications.map(n => (
                        <div key={n.id} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer">
                          <div className="flex-shrink-0 mt-0.5">
                            <n.icon size={16} color={n.color} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800">{n.title}</span>
                            <span className="text-xs text-gray-500 mt-0.5">{n.desc}</span>
                            <span className="text-[10px] text-gray-400 mt-1">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 text-center border-t border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setShowNotifications(false)}>
                      <span className="text-xs font-medium text-gray-600">Ver todas</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center">
                <img src="/logo.png" alt="JP" className="w-8 h-8 object-contain rounded-full border border-border" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>Julio Puig</span>
                <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>Administrador</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
