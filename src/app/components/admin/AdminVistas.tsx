import { useState } from 'react';
import { Eye, TrendingUp, TrendingDown, Users, Clock, Smartphone, Monitor, Tablet } from 'lucide-react';
import { properties, formatPrice } from '../data';

const NAVY = '#1A365D';
const ACCENT = '#C9A84C';

/* ── Mock data ── */
const dailyVisits = [
  { day: 'Lun', visits: 48, leads: 2 },
  { day: 'Mar', visits: 63, leads: 4 },
  { day: 'Mié', visits: 55, leads: 3 },
  { day: 'Jue', visits: 81, leads: 6 },
  { day: 'Vie', visits: 97, leads: 8 },
  { day: 'Sáb', visits: 124, leads: 11 },
  { day: 'Dom', visits: 89, leads: 5 },
];

const propertyStats = [
  { id: 1, visits: 312, avgTime: '2m 34s', bounce: 32, leads: 14 },
  { id: 3, visits: 287, avgTime: '3m 10s', bounce: 28, leads: 19 },
  { id: 7, visits: 241, avgTime: '2m 58s', bounce: 35, leads: 10 },
  { id: 2, visits: 198, avgTime: '1m 55s', bounce: 44, leads: 8 },
  { id: 5, visits: 156, avgTime: '2m 12s', bounce: 39, leads: 5 },
  { id: 6, visits: 134, avgTime: '1m 48s', bounce: 48, leads: 4 },
  { id: 9, visits: 178, avgTime: '2m 05s', bounce: 41, leads: 7 },
  { id: 8, visits: 102, avgTime: '1m 33s', bounce: 52, leads: 3 },
  { id: 4, visits: 89, avgTime: '1m 20s', bounce: 61, leads: 1 },
];

const pageStats = [
  { page: 'Inicio', visits: 1204, change: '+12%', up: true },
  { page: 'Catálogo', visits: 843, change: '+8%', up: true },
  { page: 'Nosotros', visits: 312, change: '-3%', up: false },
  { page: 'Página de propiedades', visits: 1847, change: '+23%', up: true },
];

const devices = [
  { label: 'Móvil', pct: 62, icon: Smartphone, color: NAVY },
  { label: 'Escritorio', pct: 31, icon: Monitor, color: ACCENT },
  { label: 'Tablet', pct: 7, icon: Tablet, color: '#9C27B0' },
];

const sources = [
  { label: 'Búsqueda orgánica', pct: 44, color: NAVY },
  { label: 'Directo', pct: 28, color: ACCENT },
  { label: 'Redes sociales', pct: 18, color: '#25D366' },
  { label: 'Referidos', pct: 10, color: '#9C27B0' },
];

type Range = '7d' | '30d' | '90d';

const RANGE_MULTIPLIER: Record<Range, number> = { '7d': 1, '30d': 4.2, '90d': 12.5 };

function MiniBarChart({ data, maxVal }: { data: typeof dailyVisits; maxVal: number }) {
  return (
    <div className="flex items-end gap-2" style={{ height: '80px' }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <div
            style={{
              width: '100%', backgroundColor: NAVY,
              height: `${Math.round((d.visits / maxVal) * 72)}px`,
              borderRadius: '3px 3px 0 0', minHeight: '4px',
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{ fontSize: '10px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function HorizBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <span style={{ fontSize: '12px', color: 'var(--foreground)' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 600, color }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export function AdminVistas() {
  const [range, setRange] = useState<Range>('7d');
  const mult = RANGE_MULTIPLIER[range];
  const totalVisits = Math.round(557 * mult);
  const totalLeads = Math.round(39 * mult);
  const avgTime = '2m 18s';

  return (
    <div style={{ padding: '32px 32px 48px' }}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: NAVY }}>Analíticas de Vistas</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '3px' }}>Rendimiento del sitio web y las propiedades</p>
        </div>
        <div className="flex gap-1 p-1" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }}>
          {(['7d', '30d', '90d'] as Range[]).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                backgroundColor: range === r ? NAVY : 'transparent',
                color: range === r ? '#fff' : 'var(--muted-foreground)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {r === '7d' ? 'Última semana' : r === '30d' ? 'Último mes' : 'Últimos 3 meses'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Visitas totales', value: totalVisits.toLocaleString('es-ES'), icon: Eye, change: '+9%', up: true },
          { label: 'Leads generados', value: totalLeads.toString(), icon: Users, change: '+18%', up: true },
          { label: 'Tasa de conversión', value: `${((totalLeads / totalVisits) * 100).toFixed(1)}%`, icon: TrendingUp, change: '+0.4%', up: true },
          { label: 'Tiempo medio', value: avgTime, icon: Clock, change: '+22s', up: true },
        ].map(k => (
          <div key={k.label} style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '20px' }}>
            <div className="flex items-center justify-between mb-3">
              <div style={{ width: '38px', height: '38px', backgroundColor: `${NAVY}12`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={18} style={{ color: NAVY }} strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5" style={{ backgroundColor: k.up ? '#E8F5E9' : '#FFEBEE', borderRadius: '100px' }}>
                {k.up ? <TrendingUp size={11} style={{ color: '#2E7D32' }} /> : <TrendingDown size={11} style={{ color: '#C62828' }} />}
                <span style={{ fontSize: '10px', fontWeight: 600, color: k.up ? '#2E7D32' : '#C62828' }}>{k.change}</span>
              </div>
            </div>
            <p style={{ fontSize: '24px', fontWeight: 700, color: NAVY, fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: 1 }}>{k.value}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-5">
        {/* Weekly bar chart */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '24px' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>Visitas por día (última semana)</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div style={{ width: '10px', height: '10px', backgroundColor: NAVY, borderRadius: '2px' }} />
                <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>Visitas</span>
              </div>
            </div>
          </div>
          <MiniBarChart data={dailyVisits} maxVal={124} />
          <div className="mt-4 pt-4 grid grid-cols-3 gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            {[
              { label: 'Pico máximo', value: 'Sábado — 124' },
              { label: 'Pico mínimo', value: 'Lunes — 48' },
              { label: 'Media diaria', value: Math.round(dailyVisits.reduce((a, d) => a + d.visits, 0) / 7).toString() },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginBottom: '2px' }}>{s.label}</p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Device + Source */}
        <div className="flex flex-col gap-5">
          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: NAVY, marginBottom: '16px' }}>Dispositivos</h2>
            <div className="flex flex-col gap-3">
              {devices.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                  <d.icon size={16} strokeWidth={1.5} style={{ color: d.color, flexShrink: 0 }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: '12px', color: 'var(--foreground)' }}>{d.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: d.color }}>{d.pct}%</span>
                    </div>
                    <div style={{ height: '5px', backgroundColor: 'rgba(0,0,0,0.07)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${d.pct}%`, backgroundColor: d.color, borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: NAVY, marginBottom: '16px' }}>Fuentes de tráfico</h2>
            <div className="flex flex-col gap-3">
              {sources.map(s => <HorizBar key={s.label} label={s.label} pct={s.pct} color={s.color} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Pages table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pages */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>Páginas del sitio</h2>
          </div>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F9FB' }}>
                {['Página', 'Visitas', 'Cambio'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageStats.map(p => (
                <tr key={p.page} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover:bg-gray-50 transition-colors">
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--foreground)', fontWeight: 500 }}>{p.page}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--foreground)', fontWeight: 600 }}>{Math.round(p.visits * mult).toLocaleString('es-ES')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: p.up ? '#2E7D32' : '#C62828', backgroundColor: p.up ? '#E8F5E9' : '#FFEBEE', padding: '2px 8px', borderRadius: '100px' }}>
                      {p.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Property ranking */}
        <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: NAVY }}>Ranking de propiedades</h2>
          </div>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F9FB' }}>
                {['#', 'Propiedad', 'Visitas', 'T. Rebote', 'Leads'].map(h => (
                  <th key={h} style={{ padding: '10px 10px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {propertyStats.map((ps, idx) => {
                const p = properties.find(pr => pr.id === ps.id)!;
                return (
                  <tr key={ps.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover:bg-gray-50 transition-colors">
                    <td style={{ padding: '10px 10px', fontSize: '13px', fontWeight: 700, color: idx < 3 ? ACCENT : 'var(--muted-foreground)' }}>#{idx + 1}</td>
                    <td style={{ padding: '10px 10px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.3 }}>{p.title}</p>
                      <p style={{ fontSize: '10px', color: 'var(--muted-foreground)' }}>{formatPrice(p.price)}</p>
                    </td>
                    <td style={{ padding: '10px 10px', fontSize: '13px', fontWeight: 600, color: NAVY }}>{Math.round(ps.visits * mult).toLocaleString('es-ES')}</td>
                    <td style={{ padding: '10px 10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: ps.bounce > 50 ? '#C62828' : '#2E7D32' }}>{ps.bounce}%</span>
                    </td>
                    <td style={{ padding: '10px 10px', fontSize: '13px', fontWeight: 600, color: '#25D366' }}>{Math.round(ps.leads * mult)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
