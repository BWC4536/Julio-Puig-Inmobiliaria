import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Eye, X, Check,
  Bed, Bath, Maximize2, ChevronDown,
} from 'lucide-react';
import { properties as initialProperties, formatPrice, type Property } from '../data';

const NAVY = '#1A365D';
const ACCENT = '#C9A84C';

type Status = 'activo' | 'vendido' | 'reservado' | 'oculto';

interface AdminProperty extends Property {
  status: Status;
  createdAt: string;
  views: number;
}

const STATUS_LABELS: Record<Status, string> = {
  activo: 'Activo', vendido: 'Vendido', reservado: 'Reservado', oculto: 'Oculto',
};
const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  activo: { bg: '#E8F5E9', text: '#2E7D32' },
  vendido: { bg: '#FFEBEE', text: '#C62828' },
  reservado: { bg: '#FFF3E0', text: '#E65100' },
  oculto: { bg: '#F3F4F6', text: '#6B7280' },
};

const defaultStatuses: Status[] = [
  'activo', 'activo', 'activo', 'vendido', 'reservado',
  'activo', 'activo', 'activo', 'activo',
];
const mockViews = [312, 198, 287, 89, 156, 134, 241, 102, 178];
const mockDates = [
  '2024-10-12', '2024-11-03', '2024-09-28', '2024-08-15', '2025-01-20',
  '2024-12-05', '2024-07-30', '2025-02-14', '2025-03-01',
];

const initial: AdminProperty[] = initialProperties.map((p, i) => ({
  ...p,
  status: defaultStatuses[i],
  createdAt: mockDates[i],
  views: mockViews[i],
}));

const EMPTY: Omit<AdminProperty, 'id'> = {
  title: '', location: '', price: 0, beds: 1, baths: 1, sqm: 0,
  type: 'piso', tag: null, image: '', gallery: [],
  piscina: false, garaje: false, ascensor: false, noHipotecable: false,
  description: '', status: 'activo', createdAt: '', views: 0,
};

function StatusBadge({ status, onChange }: { status: Status; onChange: (s: Status) => void }) {
  const [open, setOpen] = useState(false);
  const { bg, text } = STATUS_COLORS[status];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1 transition-opacity hover:opacity-80"
        style={{ backgroundColor: bg, borderRadius: '100px' }}
      >
        <span style={{ fontSize: '11px', fontWeight: 600, color: text }}>{STATUS_LABELS[status]}</span>
        <ChevronDown size={10} style={{ color: text }} />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-20 flex flex-col overflow-hidden"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', minWidth: '120px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
        >
          {(Object.keys(STATUS_LABELS) as Status[]).map(s => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
            >
              {s === status && <Check size={11} style={{ color: NAVY }} />}
              <span style={{ fontSize: '12px', color: 'var(--foreground)', marginLeft: s === status ? 0 : '15px' }}>
                {STATUS_LABELS[s]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyModal({
  prop, onSave, onClose,
}: {
  prop: Partial<AdminProperty> & { id?: number };
  onSave: (p: AdminProperty) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<AdminProperty, 'id'>>({
    ...EMPTY,
    ...(prop.id ? prop : {}),
  } as Omit<AdminProperty, 'id'>);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title || !form.location || !form.price) return;
    onSave({
      ...form,
      id: prop.id ?? Date.now(),
      createdAt: form.createdAt || new Date().toISOString().split('T')[0],
    } as AdminProperty);
  };

  const field = (label: string, node: React.ReactNode) => (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
        {label}
      </label>
      {node}
    </div>
  );

  const input = (val: string | number, onChange: (v: string) => void, type = 'text', placeholder = '') => (
    <input
      type={type}
      value={val}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px',
        fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box',
      }}
    />
  );

  const chk = (label: string, val: boolean, onChange: (v: boolean) => void) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!val)}
        style={{
          width: '16px', height: '16px', border: `1.5px solid ${val ? NAVY : 'rgba(0,0,0,0.2)'}`,
          backgroundColor: val ? NAVY : 'transparent', borderRadius: '3px', flexShrink: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {val && <Check size={10} color="#fff" />}
      </div>
      <span style={{ fontSize: '13px' }}>{label}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="relative w-full flex flex-col" style={{ maxWidth: '700px', backgroundColor: '#fff', borderRadius: '10px', margin: '0 16px', overflow: 'hidden' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', backgroundColor: NAVY }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}>
            {prop.id ? 'Editar propiedad' : 'Nueva propiedad'}
          </h2>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.6)' }} className="hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          {/* Image */}
          {field('Imagen principal (URL)', input(form.image, v => set('image', v), 'url', 'https://...'))}

          {/* Galería */}
          {field('Imágenes adicionales (URLs, una por línea)',
            <textarea
              rows={3}
              value={form.gallery.join('\n')}
              onChange={e => set('gallery', e.target.value.split('\n').filter(Boolean))}
              placeholder="https://...\nhttps://..."
              style={{ padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', resize: 'vertical', outline: 'none', width: '100%' }}
            />
          )}

          {/* Title + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Título', input(form.title, v => set('title', v), 'text', 'Ej. Chalet con Piscina'))}
            {field('Localidad', input(form.location, v => set('location', v), 'text', 'Ej. Tomares'))}
          </div>

          {/* Price + Type + Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {field('Precio (€)', input(form.price, v => set('price', Number(v)), 'number', '350000'))}
            {field('Tipo',
              <select
                value={form.type}
                onChange={e => set('type', e.target.value as Property['type'])}
                style={{ padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '14px', outline: 'none', width: '100%' }}
              >
                {['piso', 'chalet', 'villa', 'adosado', 'duplex'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
            {field('Etiqueta',
              <select
                value={form.tag ?? ''}
                onChange={e => set('tag', e.target.value || null)}
                style={{ padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '14px', outline: 'none', width: '100%' }}
              >
                <option value="">Sin etiqueta</option>
                <option value="EXCLUSIVA">EXCLUSIVA</option>
                <option value="REBAJADO -5%">REBAJADO -5%</option>
                <option value="REBAJADO -8%">REBAJADO -8%</option>
                <option value="REBAJADO -12%">REBAJADO -12%</option>
                <option value="VENDIDO">VENDIDO</option>
              </select>
            )}
          </div>

          {/* Beds + Baths + sqm */}
          <div className="grid grid-cols-3 gap-4">
            {field('Habitaciones', input(form.beds, v => set('beds', Number(v)), 'number'))}
            {field('Baños', input(form.baths, v => set('baths', Number(v)), 'number'))}
            {field('m² construidos', input(form.sqm, v => set('sqm', Number(v)), 'number'))}
          </div>

          {/* Checkboxes */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '10px' }}>Características</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {chk('Piscina', form.piscina, v => set('piscina', v))}
              {chk('Garaje', form.garaje, v => set('garaje', v))}
              {chk('Ascensor', form.ascensor, v => set('ascensor', v))}
              {chk('No hipotecable', form.noHipotecable, v => set('noHipotecable', v))}
            </div>
          </div>

          {/* Description */}
          {field('Descripción',
            <textarea
              rows={5}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe la propiedad..."
              style={{ padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '14px', resize: 'vertical', outline: 'none', width: '100%', lineHeight: 1.6 }}
            />
          )}

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            {field('Estado',
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as Status)}
                style={{ padding: '10px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '14px', outline: 'none', width: '100%' }}
              >
                {(Object.keys(STATUS_LABELS) as Status[]).map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-7 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 20px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', backgroundColor: '#fff' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '10px 24px', backgroundColor: NAVY, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}
          >
            {prop.id ? 'Guardar cambios' : 'Crear anuncio'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminAnuncios() {
  const [props, setProps] = useState<AdminProperty[]>(initial);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | ''>('');
  const [filterType, setFilterType] = useState('');
  const [modal, setModal] = useState<{ open: boolean; prop: Partial<AdminProperty> }>({ open: false, prop: {} });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = props.filter(p => {
    if (filterStatus && p.status !== filterStatus) return false;
    if (filterType && p.type !== filterType) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSave = (p: AdminProperty) => {
    setProps(prev => prev.some(x => x.id === p.id) ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev]);
    setModal({ open: false, prop: {} });
  };

  const changeStatus = (id: number, s: Status) =>
    setProps(prev => prev.map(p => p.id === id ? { ...p, status: s } : p));

  const handleDelete = (id: number) => {
    setProps(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div style={{ padding: '32px 32px 48px' }}>
      {modal.open && (
        <PropertyModal prop={modal.prop} onSave={handleSave} onClose={() => setModal({ open: false, prop: {} })} />
      )}

      {/* Confirm delete */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '32px', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: NAVY, marginBottom: '12px' }}>¿Eliminar anuncio?</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: '24px' }}>
              Esta acción no se puede deshacer. El anuncio se eliminará permanentemente.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} style={{ padding: '10px 20px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: '10px 20px', backgroundColor: '#C62828', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: NAVY }}>Anuncios</h1>
          <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', marginTop: '3px' }}>{props.length} propiedades en total</p>
        </div>
        <button
          onClick={() => setModal({ open: true, prop: {} })}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          style={{ padding: '11px 20px', backgroundColor: NAVY, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}
        >
          <Plus size={16} />
          Nuevo anuncio
        </button>
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-3 mb-6 p-4"
        style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px' }}
      >
        <div className="flex items-center gap-2 flex-1" style={{ border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', minWidth: '200px', maxWidth: '360px' }}>
          <Search size={14} style={{ color: 'var(--muted-foreground)', marginLeft: '12px', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por título o zona..."
            style={{ padding: '9px 12px 9px 4px', border: 'none', outline: 'none', fontSize: '13px', width: '100%', backgroundColor: 'transparent' }}
          />
        </div>
        {[
          { val: filterStatus, set: setFilterStatus, opts: [['', 'Todos los estados'], ...Object.entries(STATUS_LABELS)] as [string, string][] },
          { val: filterType, set: setFilterType, opts: [['', 'Todos los tipos'], ['piso', 'Piso/Ático'], ['chalet', 'Chalet'], ['villa', 'Villa'], ['adosado', 'Adosado'], ['duplex', 'Dúplex']] as [string, string][] },
        ].map((f, i) => (
          <select
            key={i}
            value={f.val}
            onChange={e => (f.set as (v: string) => void)(e.target.value)}
            style={{ padding: '9px 12px', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '6px', fontSize: '13px', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}
          >
            {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        ))}
        {(search || filterStatus || filterType) && (
          <button onClick={() => { setSearch(''); setFilterStatus(''); setFilterType(''); }} style={{ fontSize: '12px', color: ACCENT, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            Limpiar
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--muted-foreground)' }}>{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '8px', overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8F9FB' }}>
                {['Propiedad', 'Precio', 'Detalles', 'Vistas', 'Estado', 'Publicado', 'Acciones'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--muted-foreground)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '14px' }}>
                    No hay propiedades que coincidan con los filtros
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} className="hover:bg-gray-50 transition-colors">
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} style={{ width: '52px', height: '40px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>{p.title}</p>
                        <p style={{ fontSize: '11px', color: 'var(--muted-foreground)' }}>{p.location}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: NAVY, whiteSpace: 'nowrap' }}>{formatPrice(p.price)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      <span className="flex items-center gap-1"><Bed size={11} />{p.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={11} />{p.baths}</span>
                      <span className="flex items-center gap-1"><Maximize2 size={11} />{p.sqm}m²</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--foreground)', fontWeight: 600 }}>{p.views}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge status={p.status} onChange={s => changeStatus(p.id, s)} />
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                    {new Date(p.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/propiedad/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ padding: '6px', color: 'var(--muted-foreground)', display: 'flex', borderRadius: '4px' }}
                        className="hover:bg-gray-100 transition-colors"
                        title="Ver en el sitio"
                      >
                        <Eye size={15} />
                      </a>
                      <button
                        onClick={() => setModal({ open: true, prop: p })}
                        style={{ padding: '6px', color: NAVY, display: 'flex', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                        className="hover:bg-blue-50 transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        style={{ padding: '6px', color: '#C62828', display: 'flex', borderRadius: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
                        className="hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
