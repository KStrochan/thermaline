/**
 * Live schematic for the hero: the outdoor unit's fan spins, warm water flows to the radiators,
 * cool water returns, heat rises off the radiators and the sun turns over the roof panel.
 * Pure SVG and CSS.
 */
export function HeatFlow({ className = "" }: { className?: string }) {
  return (
    <figure className={`border border-fg bg-surface ${className}`}>
      <svg viewBox="0 0 260 150" className="block h-auto w-full" role="img" aria-label="Diagram: heat pump outside, pipes carrying warm water to radiators inside, solar panel on the roof">
        {/* house */}
        <path d="M120 70 L180 30 L240 70 V138 H120 Z" fill="none" stroke="#1F2326" strokeWidth="2" />
        <rect x="160" y="48" width="44" height="7" transform="rotate(-33.7 160 48)" fill="#1F2326" />
        {/* sun */}
        <g className="hf-sun">
          <circle cx="222" cy="22" r="7" fill="#F2B705" />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="222" y1="9" x2="222" y2="4" stroke="#F2B705" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45} 222 22)`} />
          ))}
        </g>
        <line className="hf-ray" x1="214" y1="30" x2="196" y2="40" stroke="#F2B705" strokeWidth="1.5" strokeDasharray="3 4" />
        {/* outdoor unit */}
        <rect x="14" y="96" width="62" height="42" fill="#FFFFFF" stroke="#1F2326" strokeWidth="2" />
        <circle cx="38" cy="117" r="14" fill="none" stroke="#1F2326" strokeWidth="1.5" />
        <g className="hf-fan">
          {[0, 120, 240].map((a) => (
            <path key={a} d="M38 117 C 38 108, 44 105, 46 108 Z" fill="#1F2326" transform={`rotate(${a} 38 117)`} />
          ))}
        </g>
        <rect x="58" y="104" width="12" height="3" fill="#1F2326" />
        <rect x="58" y="110" width="12" height="3" fill="#1F2326" />
        {/* flow and return */}
        <path d="M76 108 H150 V96" fill="none" stroke="#E7E8E6" strokeWidth="5" />
        <path className="hf-flow" d="M76 108 H150 V96" fill="none" stroke="#F2B705" strokeWidth="5" strokeDasharray="8 8" />
        <path d="M150 126 H76" fill="none" stroke="#E7E8E6" strokeWidth="5" />
        <path className="hf-return" d="M150 126 H76" fill="none" stroke="#8A9196" strokeWidth="5" strokeDasharray="8 8" />
        {/* radiator */}
        <rect x="140" y="96" width="60" height="34" fill="#FFFFFF" stroke="#1F2326" strokeWidth="2" />
        {[150, 160, 170, 180, 190].map((x) => (
          <line key={x} x1={x} x2={x} y1="100" y2="126" stroke="#1F2326" strokeWidth="1.5" />
        ))}
        {[154, 170, 186].map((x, i) => (
          <path key={x} className="hf-heat" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x} 90 c -4 -5 4 -8 0 -13 s 4 -8 0 -13`} fill="none" stroke="#F2B705" strokeWidth="2" strokeLinecap="round" />
        ))}
      </svg>
      <figcaption className="flex justify-between border-t border-fg px-3 py-1.5 text-xs">
        <span>Flow 45 °C</span>
        <span className="text-muted">Return 38 °C</span>
      </figcaption>
    </figure>
  );
}
