import { Home, Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Star, Phone, MessageCircle } from 'lucide-react';
import { properties, formatPrice } from '../data';

const ACCENT = '#C9A84C';
const NAVY = '#1A365D';

function KpiCard({
  label, value, sub, icon: Icon, trend, trendUp,
}: {
  label: string; value: string; sub: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-4 p-6"
      style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px' }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex items-center justify-center"
          style={{ width: '44px', height: '44px', backgroundColor: `${NAVY}12`, borderRadius: '8px' }}
        >
          <Icon size={20} style={{ color: NAVY }} strokeWidth={1.5} />
        </div>
        {trend && (
          <div
            className="flex items-center gap-1 px-2 py-1"
            style={{
              backgroundColor: trendUp ? '#E8F5E9' : '#FFEBEE',
              borderRadius: '100px',
            }}
          >
            {trendUp ? <ArrowUpRight size={12} style={{ color: '#2E7D32' }} /> : <ArrowDownRight size={12} style={{ color: '#C62828' }} />}
            <span style={{ fontSize: '11px', fontWeight: 600, color: trendUp ? '#2E7D32' : '#C62828' }}>{trend}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span style={{ fontSize: '28px', fontWeight: 700, color: NAVY, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{label}</span>
        <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>{sub}</span>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, text, time, color }: { icon: React.ElementType; text: string; time: string; color: string }) {
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', backgroundColor: `${color}15`, borderRadius: '50%', marginTop: '1px' }}>
        <Icon size={14} style={{ color }} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: '13px', color: 'var(--foreground)', lineHeight: 1.5 }}>{text}</p>
        <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '2px' }}>{time}</p>
      </div>
    </div>
  );
}

const recentActivity = [
  { icon: Phone, text: 'Nueva consulta de Ana García sobre "Villa de Lujo con Parcela Privada"', time: 'Hace 12 min', color: NAVY },
  { icon: MessageCircle, text: 'WhatsApp recibido: interés en Ático Mairena del Aljarafe', time: 'Hace 45 min', color: '#25D366' },
  { icon: Eye, text: '23 visitas nuevas a "Chalet Independiente con Piscina" hoy', time: 'Hace 1 h', color: ACCENT },
  { icon: Star, text: 'Reseña 5 estrellas de María & José Romero publicada', time: 'Hace 3 h', color: ACCENT },
  { icon: Home, text: '"Casa Adosada con Jardín" marcada como RESERVADA', time: 'Hace 5 h', color: '#2E7D32' },
  { icon: Users, text: 'Nuevo lead: Carlos Fernández, presupuesto 400.000€', time: 'Ayer 18:32', color: '#9C27B0' },
];

const topProperties = [
  { id: 1, visits: 312, calls: 8, waps: 14 },
  { id: 3, visits: 287, calls: 11, waps: 19 },
  { id: 7, visits: 241, calls: 6, waps: 10 },
  { id: 2, visits: 198, calls: 4, waps: 8 },
  { id: 5, visits: 156, calls: 3, waps: 5 },
];

export function AdminDashboard() {
  const now = new Date();
  const greeting = now.getHours() < 14 ? 'Buenos días' : now.getHours() < 21 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div style={{ padding: '32px 32px 48px', maxWidth: '1400px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: NAVY, letterSpacing: '-0.02em' }}>
          {greeting}, Julio 👋
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
          {now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard label="Propiedades activas" value="8" sub="1 vendida, 1 reservada" icon={Home} trend="+2 este mes" trendUp />
        <KpiCard label="Contactos / Leads" value="34" sub="12 nuevos esta semana" icon={Users} trend="+18%" trendUp />
        <KpiCard label="Visitas totales" value="1.847" sub="Últimos 30 días" icon={Eye} trend="+9%" trendUp />
        <KpiCard label="Precio medio" value="432K€" sub="Portafolio actual" icon={TrendingUp} trend="-3%" trendUp={false} />
      </div>

      {/* 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Top properties */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>Propiedades más vistas</h2>
            <a href="/admin/vistas" style={{ fontSize: '12px', color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>Ver todo →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8F9FB' }}>
                  {['Propiedad', 'Precio', 'Visitas', 'Llamadas', 'WhatsApp'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProperties.map(({ id, visits, calls, waps }) => {
                  const p = properties.find(pr => pr.id === id)!;
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover:bg-gray-50 transition-colors">
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.title} style={{ width: '44px', height: '34px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.3 }}>{p.title}</p>
                            <p style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{p.location}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: NAVY, whiteSpace: 'nowrap' }}>{formatPrice(p.price)}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex items-center gap-2">
                          <div style={{ width: `${Math.round((visits / 312) * 60)}px`, height: '4px', backgroundColor: NAVY, borderRadius: '2px', minWidth: '8px' }} />
                          <span style={{ fontSize: '13px', color: 'var(--foreground)', whiteSpace: 'nowrap' }}>{visits}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--foreground)' }}>{calls}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#25D366', fontWeight: 600 }}>{waps}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: NAVY }}>Actividad reciente</h2>
            <div className="flex items-center gap-1.5">
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#2E7D32' }} />
              <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>En vivo</span>
            </div>
          </div>
          <div className="px-6">
            {recentActivity.map((a, i) => (
              <ActivityItem key={i} {...a} />
            ))}
          </div>
          <div className="px-6 pb-4 pt-2">
            <a href="/admin/contactos" style={{ fontSize: '12px', color: ACCENT, textDecoration: 'none', fontWeight: 600 }}>
              Ver todos los contactos →
            </a>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Nuevo anuncio', href: '/admin/anuncios', color: NAVY, text: '#fff' },
          { label: 'Ver contactos', href: '/admin/contactos', color: '#fff', text: NAVY, border: true },
          { label: 'Analíticas', href: '/admin/vistas', color: '#fff', text: NAVY, border: true },
          { label: 'Ir al sitio web', href: '/inicio', color: ACCENT, text: '#fff' },
        ].map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px', backgroundColor: btn.color,
              border: btn.border ? `1px solid rgba(0,0,0,0.12)` : 'none',
              borderRadius: '6px', textDecoration: 'none',
              fontSize: '13px', fontWeight: 600, color: btn.text,
              letterSpacing: '0.04em', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
}
