// A hand-drawn-feeling section divider inspired by Warli border art:
// a repeating row of small triangular "huts" and dots, echoing the
// geometric tribal motifs used throughout rural Maharashtra.
export const WarliDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full flex items-center justify-center gap-3 select-none ${className}`} aria-hidden="true">
    <span className="h-px flex-1 max-w-24 bg-terracotta/25" />
    <svg width="160" height="20" viewBox="0 0 160 20" fill="none" className="text-terracotta/50">
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <polygon points="6,2 11,14 1,14" fill="currentColor" opacity="0.6" />
          <circle cx="16" cy="10" r="1.4" fill="currentColor" opacity="0.8" />
        </g>
      ))}
    </svg>
    <span className="h-px flex-1 max-w-24 bg-terracotta/25" />
  </div>
);

// A Madhubani-inspired border: repeating fish + double-line motifs,
// commonly found framing traditional Bihar folk paintings.
export const MadhubaniDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full flex items-center justify-center gap-3 select-none ${className}`} aria-hidden="true">
    <span className="h-px flex-1 max-w-16 bg-gold/30" />
    <svg width="200" height="24" viewBox="0 0 200 24" fill="none" className="text-saffron/60">
      <path d="M0 12 Q100 -4 200 12" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M0 12 Q100 28 200 12" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`translate(${18 + i * 32}, 12)`}>
          <ellipse rx="7" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
          <circle cx="4.5" cy="0" r="0.8" fill="currentColor" opacity="0.8" />
          <path d="M-7 0 L-11 -3 M-7 0 L-11 3" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </g>
      ))}
    </svg>
    <span className="h-px flex-1 max-w-16 bg-gold/30" />
  </div>
);

// A mandala-inspired circular separator, used between major homepage sections.
export const MandalaDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center py-2 ${className}`} aria-hidden="true">
    <svg width="56" height="56" viewBox="0 0 56 56" className="text-gold">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="28" cy="28" r="12" opacity="0.4" />
        <circle cx="28" cy="28" r="20" opacity="0.25" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x1 = 28 + Math.cos(angle) * 12;
          const y1 = 28 + Math.sin(angle) * 12;
          const x2 = 28 + Math.cos(angle) * 20;
          const y2 = 28 + Math.sin(angle) * 20;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity="0.3" />;
        })}
      </g>
    </svg>
  </div>
);

// A lotus glyph used as a small accent icon (e.g. beside "Why Choose Hunar" items)
export const LotusIcon = ({ className = "w-6 h-6 text-terracotta" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 21c-4-2-6-5-6-8 2 1 4 2.5 6 5.5 2-3 4-4.5 6-5.5 0 3-2 6-6 8Z"
      fill="currentColor"
      opacity="0.85"
    />
    <path d="M12 13c-3-1.5-4.5-4-4.5-7C10 7 11.3 9 12 12c.7-3 2-5 4.5-6 0 3-1.5 5.5-4.5 7Z" fill="currentColor" opacity="0.55" />
  </svg>
);

// A decorative corner flourish used to frame cards/panels with a folk-art feel.
export const CornerMotif = ({ className = "w-8 h-8 text-gold/40" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path d="M2 2 Q2 16 16 16" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="2" cy="2" r="2" fill="currentColor" />
    <circle cx="9" cy="9" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);