import { useNavigate } from 'react-router';
import { Bed, Bath, Maximize2, MessageCircle } from 'lucide-react';
import type { Property } from './data';
import { formatPrice } from './data';

function TagBadge({ tag }: { tag: string }) {
  const isVendido = tag === 'VENDIDO';
  const isRebajado = tag.startsWith('REBAJADO');
  const isExclusiva = tag === 'EXCLUSIVA';

  let cls = 'absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase ';
  if (isVendido) cls += 'bg-foreground text-background';
  else if (isRebajado) cls += 'bg-destructive text-destructive-foreground';
  else if (isExclusiva) cls += 'bg-accent text-accent-foreground';
  else cls += 'bg-primary text-primary-foreground';

  return <span className={cls}>{tag}</span>;
}

interface Props {
  property: Property;
  onClick?: () => void;
}

export function PropertyCard({ property, onClick }: Props) {
  const navigate = useNavigate();
  const handleClick = onClick ?? (() => navigate(`/propiedad/${property.id}`));
  return (
    <div
      className="bg-card group cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {property.tag && <TagBadge tag={property.tag} />}
        <a
          href={`https://wa.me/34633717714?text=Hola%20Julio%2C%20me%20interesa%20${encodeURIComponent(property.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
          style={{ backgroundColor: '#25D366', color: '#fff' }}
          title="Consultar por WhatsApp"
        >
          <MessageCircle size={15} />
        </a>
      </div>

      <div className="p-5">
        <p className="text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {property.location}
        </p>
        <h3
          className="text-foreground mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500 }}
        >
          {property.title}
        </h3>
        <p
          className="text-primary mb-4"
          style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em' }}
        >
          {formatPrice(property.price)}
        </p>
        <div className="flex items-center gap-5 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>
            <Bed size={13} strokeWidth={1.5} />
            <span>{property.beds} hab.</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>
            <Bath size={13} strokeWidth={1.5} />
            <span>{property.baths} baños</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: '12px' }}>
            <Maximize2 size={13} strokeWidth={1.5} />
            <span>{property.sqm} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
