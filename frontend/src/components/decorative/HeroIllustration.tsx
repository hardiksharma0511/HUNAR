// A hand-drawn-style SVG illustration of a potter at the wheel, framed by a
// Madhubani-inspired sun and border — built as line art (no stock photography)
// so the very first thing a visitor sees is unmistakably "handmade craft".
export const HeroIllustration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 480 480" className={className} role="img" aria-label="Illustration of an Indian potter shaping clay on a wheel">
    <defs>
      <radialGradient id="sunGradient" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#D97A2B" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#D97A2B" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Radiating sun / mandala backdrop */}
    <circle cx="240" cy="170" r="150" fill="url(#sunGradient)" />
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 16;
      const x1 = 240 + Math.cos(angle) * 95;
      const y1 = 170 + Math.sin(angle) * 95;
      const x2 = 240 + Math.cos(angle) * 112;
      const y2 = 170 + Math.sin(angle) * 112;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A951" strokeWidth="3" strokeLinecap="round" opacity="0.55" />;
    })}
    <circle cx="240" cy="170" r="70" fill="none" stroke="#A0522D" strokeWidth="2" opacity="0.3" />

    {/* Ground */}
    <ellipse cx="240" cy="430" rx="200" ry="14" fill="#A0522D" opacity="0.1" />

    {/* Potter's wheel */}
    <ellipse cx="200" cy="378" rx="70" ry="16" fill="#6D8B74" opacity="0.25" />
    <ellipse cx="200" cy="368" rx="58" ry="13" fill="#A0522D" opacity="0.55" />

    {/* Pot being shaped */}
    <path
      d="M186 300 C178 320 178 345 192 358 C198 362 210 362 216 358 C230 345 230 320 222 300 Z"
      fill="#D97A2B"
      opacity="0.85"
    />
    <ellipse cx="204" cy="300" rx="18" ry="6" fill="#A0522D" />

    {/* Seated artisan (simplified line figure, Warli-inspired stick style) */}
    <g stroke="#2F2A26" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
      {/* torso */}
      <path d="M300 260 C290 290 288 320 296 350" />
      {/* head */}
      <circle cx="304" cy="235" r="14" fill="#2F2A26" opacity="0.8" stroke="none" />
      {/* arms reaching to the pot */}
      <path d="M296 270 C270 285 240 292 218 305" />
      <path d="M300 280 C270 300 245 310 224 318" />
      {/* legs, cross-seated */}
      <path d="M296 350 C320 360 340 358 356 345" />
      <path d="M296 350 C280 362 260 366 244 360" />
    </g>

    {/* Small painted pots drying nearby */}
    <g opacity="0.7">
      <ellipse cx="120" cy="392" rx="20" ry="7" fill="#A0522D" opacity="0.3" />
      <path d="M104 360 C100 375 100 388 112 394 C118 397 126 397 130 394 C138 388 138 375 132 360 Z" fill="#C8A951" opacity="0.7" />
      <ellipse cx="360" cy="400" rx="16" ry="6" fill="#A0522D" opacity="0.3" />
      <path d="M348 375 C345 386 345 396 355 401 C359 403 365 403 368 401 C374 396 374 386 368 375 Z" fill="#6D8B74" opacity="0.6" />
    </g>

    {/* Warli-style border dots along the base */}
    {Array.from({ length: 18 }).map((_, i) => (
      <circle key={i} cx={40 + i * 24} cy={452} r="2.5" fill="#A0522D" opacity="0.35" />
    ))}
  </svg>
);
