import training from '@/data/training.json';

export type LayerKey = 'contours' | 'water' | 'trail';

const eastings = ['31', '32', '33', '34', '35', '36', '37'];
const northings = ['54', '53', '52', '51', '50', '49', '48'];

export function TopoMap({
  layers,
  target,
}: {
  layers: Record<LayerKey, boolean>;
  target: (typeof training.gridExercises)[number];
}) {
  return (
    <div className="trainer-map-wrap">
      <svg className="trainer-map" viewBox="0 0 720 640" aria-labelledby="map-title map-desc">
        <title id="map-title">Synthetic topographic grid practice map</title>
        <desc id="map-desc">A six by six one-kilometre training grid with contour lines, a stream, a trail, and a red target marking the current feature.</desc>
        <rect className="map-paper" x="70" y="40" width="540" height="540" />

        {layers.contours && (
          <g className="map-contours" aria-label="Contour lines">
            <path d="M88 156 C92 80 148 48 214 54 C270 54 306 82 333 116 C364 78 421 51 490 60 C566 69 607 121 600 192 C593 258 537 296 467 289 C404 283 366 250 334 224 C302 255 263 280 205 274 C135 266 84 226 88 156Z" />
            <ellipse cx="215" cy="135" rx="88" ry="60" />
            <ellipse cx="215" cy="135" rx="54" ry="36" />
            <path d="M87 486 C160 420 236 434 287 475 S401 545 482 498 S574 392 598 335" />
            <path d="M86 526 C177 463 240 485 302 521 S420 574 508 526 S586 426 602 390" />
            <path d="M373 113 C432 86 512 103 548 150 S571 225 528 249 S431 245 399 207 S339 132 373 113Z" />
          </g>
        )}

        {layers.water && (
          <g className="map-water" aria-label="Watercourse">
            <path d="M505 42 C470 116 528 154 492 224 S515 344 461 405 S428 522 386 578" />
            <path d="M468 283 C430 291 414 315 399 348" />
          </g>
        )}

        {layers.trail && <g className="map-trail" aria-label="Trail"><path d="M82 427 C179 394 246 374 318 326 S420 226 493 196 S566 172 604 148" /></g>}

        <g className="map-grid" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => <line key={`v-${index}`} x1={70 + index * 90} y1="40" x2={70 + index * 90} y2="580" />)}
          {Array.from({ length: 7 }, (_, index) => <line key={`h-${index}`} x1="70" y1={40 + index * 90} x2="610" y2={40 + index * 90} />)}
        </g>

        <g className="map-labels" aria-hidden="true">
          {eastings.map((value, index) => <text key={value} x={70 + index * 90} y="610">{value}</text>)}
          {northings.map((value, index) => <text key={value} x="42" y={45 + index * 90}>{value}</text>)}
          <text className="map-axis-label" x="640" y="610">E →</text>
          <text className="map-axis-label" x="20" y="24">N ↑</text>
        </g>

        <g className="map-target" transform={`translate(${target.mapX} ${target.mapY})`} aria-label={`${target.label} target`}>
          <circle r="21" />
          <path d="M-30 0 H30 M0 -30 V30" />
          <text y="5">{target.symbol}</text>
        </g>
      </svg>
    </div>
  );
}
