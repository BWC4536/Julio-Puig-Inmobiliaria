import { useState } from 'react';
import { Search, Phone, MessageCircle, Mail, X, Star, ChevronDown, Check, Eye, Trash2, Heart, Clock, Bell } from 'lucide-react';
import { properties } from '../data';
import { useFavorites } from '../../hooks/useFavorites';

const NAVY = '#1A365D';
const ACCENT = '#C9A84C';

type LeadStatus = 'nuevo' | 'en_contacto' | 'visita_programada' | 'negociando' | 'cerrado' | 'descartado';

const LEAD_STATUS: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  nuevo: { label: 'Nuevo', bg: '#E3F2FD', text: '#1565C0' },
  en_contacto: { label: 'En contacto', bg: '#E8F5E9', text: '#2E7D32' },
  visita_programada: { label: 'Visita programada', bg: '#FFF3E0', text: '#E65100' },
  negociando: { label: 'Negociando', bg: '#F3E5F5', text: '#6A1B9A' },
  cerrado: { label: 'Cerrado ✓', bg: '#E8F5E9', text: '#1B5E20' },
  descartado: { label: 'Descartado', bg: '#F3F4F6', text: '#6B7280' },
};

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: 'whatsapp' | 'llamada' | 'web' | 'referido';
  propertyId: number | null;
  budget: number;
  notes: string;
  status: LeadStatus;
  date: string;
  rating: number;
}

const SOURCE_ICONS: Record<Lead['source'], React.ElementType> = {
  whatsapp: MessageCircle, llamada: Phone, web: Eye, referido: Star,
};
const SOURCE_COLORS: Record<Lead['source'], string> = {
  whatsapp: '#25D366', llamada: NAVY, web: ACCENT, referido: '#9C27B0',
};
const SOURCE_LABELS: Record<Lead['source'], string> = {
  whatsapp: 'WhatsApp', llamada: 'Llamada', web: 'Web', referido: 'Referido',
};

const mockLeads: Lead[] = [
  { id: 1, name: 'Ana García Molina', phone: '+34 612 345 678', email: 'ana.garcia@email.com', source: 'whatsapp', propertyId: 3, budget: 800000, notes: 'Muy interesada en la villa de Tomares. Ha preguntado por posibilidad de hipoteca.', status: 'visita_programada', date: '2025-06-25', rating: 5 },
  { id: 2, name: 'Carlos Fernández Ruiz', phone: '+34 678 901 234', email: 'carlos.f@gmail.com', source: 'web', propertyId: 1, budget: 400000, notes: 'Busca chalet con piscina para familia de 4. Puede cerrar en 2 meses.', status: 'en_contacto', date: '2025-06-24', rating: 4 },
  { id: 3, name: 'María & José Romero', phone: '+34 698 765 432', email: 'romero.familia@hotmail.com', source: 'referido', propertyId: null, budget: 350000, notes: 'Referidos por cliente anterior. Buscan adosado o dúplex en el Aljarafe.', status: 'nuevo', date: '2025-06-23', rating: 3 },
  { id: 4, name: 'Alejandro Martínez', phone: '+34 655 444 333', email: 'alex.martinez@empresa.es', source: 'llamada', propertyId: 7, budget: 900000, notes: 'Inversor. Interesado en villa mediterránea Valencina. Paga al contado.', status: 'negociando', date: '2025-06-20', rating: 5 },
  { id: 5, name: 'Laura Sánchez Torres', phone: '+34 622 111 999', email: 'laura.s@outlook.com', source: 'web', propertyId: 2, budget: 280000, notes: 'Primera vivienda. Necesita asesoramiento hipotecario.', status: 'en_contacto', date: '2025-06-19', rating: 3 },
  { id: 6, name: 'Roberto López Castro', phone: '+34 611 222 333', email: 'roberto.lc@gmail.com', source: 'whatsapp', propertyId: 5, budget: 420000, notes: 'Ha visitado la casa adosada en Bormujos. Le gustó mucho. Pendiente de decisión familiar.', status: 'visita_programada', date: '2025-06-17', rating: 4 },
  { id: 7, name: 'Patricia Vega Moreno', phone: '+34 677 888 555', email: 'p.vega@empresa.com', source: 'referido', propertyId: 9, budget: 450000, rating: 2, notes: 'Presupuesto ajustado. Interesada en Gines. Posible que no se ajuste a la oferta actual.', status: 'descartado', date: '2025-06-10' },
  { id: 8, name: 'Francisco Díaz Herrera', phone: '+34 633 777 444', email: 'fdiaz@correo.es', source: 'llamada', propertyId: 3, budget: 750000, notes: 'Compra cerrada. Villa Tomares. Escritura firmada el 15/06.', status: 'cerrado', date: '2025-06-01', rating: 5 },
];

function LeadStatusSelect({ status, onChange }: { status: LeadStatus; onChange: (s: LeadStatus) => void }) {
  const [open, setOpen] = useState(false);
  const { bg, text, label } = LEAD_STATUS[status];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1"
        style={{ backgroundColor: bg, borderRadius: '100px' }}
      >
        <span style={{ fontSize: '11px', fontWeight: 600, color: text, whiteSpace: 'nowrap' }}>{label}</span>
        <ChevronDown size={10} style={{ color: text }} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 flex flex-col overflow-hidden" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', minWidth: '160px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
          {(Object.keys(LEAD_STATUS) as LeadStatus[]).map(s => (
            <button key={s} onClick={() => { onChange(s); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors">
              {s === status && <Check size={11} style={{ color: NAVY }} />}
              <span style={{ fontSize: '12px', color: 'var(--foreground)', marginLeft: s === status ? 0 : '15px' }}>{LEAD_STATUS[s].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LeadModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const prop = lead.propertyId ? properties.find(p => p.id === lead.propertyId) : null;
  const Src = SOURCE_ICONS[lead.source];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', width: '90%', maxWidth: '540px', overflow: 'hidden' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', backgroundColor: NAVY }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{lead.name}</h2>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.6)' }}><X size={20} /></button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Teléfono', value: lead.phone },
              { label: 'Email', value: lead.email },
              { label: 'Canal', value: SOURCE_LABELS[lead.source] },
              { label: 'Presupuesto', value: `${lead.budget.toLocaleString('es-ES')} €` },
              { label: 'Fecha contacto', value: new Date(lead.date).toLocaleDateString('es-ES') },
              { label: 'Estado', value: LEAD_STATUS[lead.status].label },
            ].map(f => (
              <div key={f.label}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '3px' }}>{f.label}</p>
                <p style={{ fontSize: '14px', color: 'var(--foreground)', fontWeight: 500 }}>{f.value}</p>
              </div>
            ))}
          </div>
          {prop && (
            <div style={{ padding: '12px', backgroundColor: '#F8F9FB', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '6px' }}>Propiedad de interés</p>
              <div className="flex items-center gap-3">
                <img src={prop.image} alt={prop.title} style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{prop.title}</p>
                  <p style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{prop.location}</p>
                </div>
              </div>
            </div>
          )}
          {lead.notes && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '6px' }}>Notas</p>
              <p style={{ fontSize: '13px', color: 'var(--foreground)', lineHeight: 1.7 }}>{lead.notes}</p>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <a href={`tel:${lead.phone}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backgroundColor: NAVY, color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              <Phone size={14} /> Llamar
            </a>
            <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hola ${lead.name.split(' ')[0]}, le contacto desde Julio Puig Real Estate.`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', backgroundColor: '#25D366', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href={`mailto:${lead.email}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '1px solid rgba(0,0,0,0.15)', color: 'var(--foreground)', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 600, backgroundColor: '#fff' }}>
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminContactos() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | ''>('');
  const [filterSource, setFilterSource] = useState<Lead['source'] | ''>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [tab, setTab] = useState<'contactos' | 'automatizaciones'>('contactos');
  const { favorites } = useFavorites();

  const filtered = leads.filter(l => {
    if (filterStatus && l.status !== filterStatus) return false;
    if (filterSource && l.source !== filterSource) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const changeStatus = (id: number, s: LeadStatus) =>
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: s } : l));

  const totals = {
    nuevo: leads.filter(l => l.status === 'nuevo').length,
    en_contacto: leads.filter(l => l.status === 'en_contacto').length,
    visita: leads.filter(l => l.status === 'visita_programada').length,
    cerrado: leads.filter(l => l.status === 'cerrado').length,
  };

  return (
    <div style={{ padding: '32px 32px 48px' }}>
      {selectedLead && <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}

      {/* Header & Tabs */}
      <div className="mb-7 flex flex-col gap-5">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: NAVY }}>Gestión de Leads</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '3px' }}>Control de contactos y automatizaciones</p>
        </div>
        <div className="flex gap-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <button
            onClick={() => setTab('contactos')}
            style={{ paddingBottom: '12px', fontSize: '13px', fontWeight: 600, borderBottom: tab === 'contactos' ? `2px solid ${NAVY}` : '2px solid transparent', color: tab === 'contactos' ? NAVY : 'var(--muted-foreground)' }}
          >
            Contactos Directos
          </button>
          <button
            onClick={() => setTab('automatizaciones')}
            className="flex items-center gap-2"
            style={{ paddingBottom: '12px', fontSize: '13px', fontWeight: 600, borderBottom: tab === 'automatizaciones' ? `2px solid ${NAVY}` : '2px solid transparent', color: tab === 'automatizaciones' ? NAVY : 'var(--muted-foreground)' }}
          >
            Automatizaciones <span style={{ backgroundColor: '#e11d48', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{favorites.length + 2}</span>
          </button>
        </div>
      </div>

      {tab === 'contactos' ? (
        <>
          {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Nuevos', value: totals.nuevo, color: '#1565C0', bg: '#E3F2FD' },
          { label: 'En contacto', value: totals.en_contacto, color: '#2E7D32', bg: '#E8F5E9' },
          { label: 'Visitas prog.', value: totals.visita, color: '#E65100', bg: '#FFF3E0' },
          { label: 'Cerrados', value: totals.cerrado, color: '#1B5E20', bg: '#C8E6C9' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: s.bg, borderRadius: '8px', padding: '16px 20px' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: s.color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '12px', color: s.color, fontWeight: 600, marginTop: '4px', opacity: 0.8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5 p-4" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px' }}>
        <div className="flex items-center gap-2 flex-1" style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '180px', maxWidth: '320px' }}>
          <Search size={14} style={{ color: 'var(--muted-foreground)', marginLeft: '12px', flexShrink: 0 }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nombre o email..." style={{ padding: '9px 12px 9px 4px', border: 'none', outline: 'none', fontSize: '13px', width: '100%', backgroundColor: 'transparent' }} />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as LeadStatus | '')} style={{ padding: '9px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          <option value="">Todos los estados</option>
          {(Object.keys(LEAD_STATUS) as LeadStatus[]).map(s => <option key={s} value={s}>{LEAD_STATUS[s].label}</option>)}
        </select>
        <select value={filterSource} onChange={e => setFilterSource(e.target.value as Lead['source'] | '')} style={{ padding: '9px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}>
          <option value="">Todos los canales</option>
          {(Object.keys(SOURCE_LABELS) as Lead['source'][]).map(s => <option key={s} value={s}>{SOURCE_LABELS[s]}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--muted-foreground)' }}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F9FB' }}>
                {['Contacto', 'Canal', 'Propiedad interés', 'Presupuesto', 'Estado', 'Fecha', 'Acciones'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '14px' }}>Sin resultados</td></tr>
              ) : filtered.map(lead => {
                const prop = lead.propertyId ? properties.find(p => p.id === lead.propertyId) : null;
                const Src = SOURCE_ICONS[lead.source];
                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover:bg-gray-50 transition-colors">
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: `${NAVY}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: NAVY }}>{lead.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{lead.name}</p>
                          <p style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{lead.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-1.5">
                        <Src size={13} style={{ color: SOURCE_COLORS[lead.source] }} />
                        <span style={{ fontSize: '12px', color: 'var(--foreground)' }}>{SOURCE_LABELS[lead.source]}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {prop ? (
                        <p style={{ fontSize: '12px', color: 'var(--foreground)', maxWidth: '180px', lineHeight: 1.4 }}>{prop.title}</p>
                      ) : (
                        <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Sin especificar</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: NAVY, whiteSpace: 'nowrap' }}>
                      {lead.budget.toLocaleString('es-ES')} €
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <LeadStatusSelect status={lead.status} onChange={s => changeStatus(lead.id, s)} />
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                      {new Date(lead.date).toLocaleDateString('es-ES')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedLead(lead)} style={{ padding: '6px', color: NAVY, display: 'flex', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:bg-blue-50 transition-colors" title="Ver detalle">
                          <Eye size={15} />
                        </button>
                        <a href={`tel:${lead.phone}`} style={{ padding: '6px', color: '#2E7D32', display: 'flex', borderRadius: '4px' }} className="hover:bg-green-50 transition-colors" title="Llamar">
                          <Phone size={15} />
                        </a>
                        <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px', color: '#25D366', display: 'flex', borderRadius: '4px' }} className="hover:bg-green-50 transition-colors" title="WhatsApp">
                          <MessageCircle size={15} />
                        </a>
                        <button onClick={() => setLeads(prev => prev.filter(l => l.id !== lead.id))} style={{ padding: '6px', color: '#C62828', display: 'flex', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:bg-red-50 transition-colors" title="Eliminar">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '24px' }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ padding: '8px', backgroundColor: '#FFF0F0', borderRadius: '8px' }}><Heart size={18} color="#e11d48" /></div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: NAVY }}>Alertas de Favoritos (Bajada de Precio)</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginBottom: '16px' }}>Usuarios que han guardado una propiedad y esperan notificación si baja el precio.</p>
            {favorites.length === 0 ? (
              <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>No hay favoritos guardados aún. (Prueba a guardar una propiedad en la web)</p>
            ) : (
              <div className="flex flex-col gap-3">
                {favorites.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-4" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '6px', backgroundColor: '#FAFAFA' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>{f.email}</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Esperando por: <strong style={{ color: NAVY }}>{f.title}</strong> (Guardado en {f.priceAtTime.toLocaleString('es-ES')}€)</p>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{new Date(f.savedAt).toLocaleDateString('es-ES')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', padding: '24px' }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ padding: '8px', backgroundColor: '#E3F2FD', borderRadius: '8px' }}><Clock size={18} color="#1565C0" /></div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: NAVY }}>Reenganche automático (A los 7 días)</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginBottom: '16px' }}>Leads que contactaron hace más de 7 días pero no compraron. El sistema les enviará un email con nuevas propiedades similares.</p>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Laura Sánchez Torres', email: 'laura.s@outlook.com', days: 8, target: 'Pisos en Sevilla Este' },
                { name: 'Patricia Vega Moreno', email: 'p.vega@empresa.com', days: 15, target: 'Adosados en Gines' }
              ].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-4" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '6px', backgroundColor: '#FAFAFA' }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>{l.name} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted-foreground)' }}>({l.email})</span></p>
                    <p style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Interés detectado: <strong style={{ color: NAVY }}>{l.target}</strong></p>
                  </div>
                  <button style={{ fontSize: '12px', fontWeight: 600, backgroundColor: NAVY, color: '#fff', padding: '6px 12px', borderRadius: '4px' }}>Ver borrador email</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
