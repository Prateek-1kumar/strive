// Static flat-editorial professional (feet at the origin, ~117 units tall, facing the viewer).
export function Professional({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="-12" cy="1" rx="30" ry="4" fill="#06254a" fillOpacity=".4" />
      {/* trousers + shoes */}
      <path d="M-9,-50 L-0.5,-50 L-1.5,-4 L-8,-4Z" fill="#CFC3AA" />
      <path d="M0.5,-50 L9,-50 L8,-4 L2,-4Z" fill="#B9AD96" />
      <path d="M-9,-4 H-0.5 Q2,-3 2,0 H-9Z M2,-4 H8 Q11,-3 11,0 H2Z" fill="#0b1a30" />
      {/* far arm, jacket, shirt, tie */}
      <rect x="9" y="-92" width="6" height="42" rx="3" fill="#D8D1C1" />
      <path d="M-12,-88 Q-12,-95 -5,-95 H5 Q12,-95 12,-88 L11,-46 H-11Z" fill="#F8F6F1" />
      <path d="M-4,-95 L0,-74 L4,-95Z" fill="#D8CBB5" />
      <path d="M-4,-95 L-1,-72 M4,-95 L1,-72" stroke="#B9AD96" strokeWidth="1" fill="none" />
      <path d="M-1.8,-92 H1.8 L2.3,-72 L0,-66 L-2.3,-72Z" fill="#C9A24A" />
      <line x1="0" y1="-64" x2="0" y2="-46" stroke="#B9AD96" strokeWidth="1" />
      {/* near arm + briefcase */}
      <rect x="-16" y="-92" width="6" height="42" rx="3" fill="#EAE5D8" />
      <circle cx="-13" cy="-48" r="3.4" fill="#D8CBB5" />
      <rect x="-26" y="-34" width="26" height="18" rx="2" fill="#A9822F" />
      <rect x="-26" y="-34" width="26" height="4" rx="2" fill="#C9A24A" />
      <path d="M-17,-34 V-38 H-9 V-34" stroke="#7a5d22" strokeWidth="1.6" fill="none" />
      {/* head */}
      <rect x="-2.5" y="-99" width="5" height="6" fill="#CDB89C" />
      <ellipse cx="0" cy="-106" rx="8" ry="9.5" fill="#D8CBB5" />
      <path d="M-8.2,-106 Q-9,-117 0,-117 Q9,-117 8.2,-106 Q4,-111 -2,-110 Q-6,-109 -8.2,-106Z" fill="#3a2f27" />
    </g>
  );
}
