import { Star } from "lucide-react";

export const Rating = ({ value, count, size = 16 }: { value: number; count?: number; size?: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(value) ? "fill-gold text-gold" : "fill-none text-gold/30"}
        />
      ))}
    </div>
    {count !== undefined && <span className="text-xs text-charcoal/60">({count})</span>}
  </div>
);
