// RomeMap — high-detail editorial map of Rome.
// Drawn in the spirit of an antique cartographer's plate (Nolli/Piranesi):
// real Tiber path with island, Aurelian + Leonine walls, the seven hills,
// principal axes (Corso, Fori Imperiali, Conciliazione), parks (Villa Borghese,
// Gianicolo), and all 25 landmarks pinned and colour-coded by epoch.

const RomeMap = ({ active, compact }) => {
  const W = 900;
  const H = 1100;
  // Bounding box covers everything from EUR in the south to Foro Italico in the north
  const lonMin = 12.430;
  const lonMax = 12.530;
  const latMin = 41.815;
  const latMax = 41.948;

  const project = (lat, lon) => [
    ((lon - lonMin) / (lonMax - lonMin)) * W,
    ((latMax - lat) / (latMax - latMin)) * H,
  ];

  const proj = (pts) => pts.map(([la, lo]) => project(la, lo));

  // Smooth catmull-rom-ish path through points
  const smoothPath = (pts) => {
    const p = proj(pts);
    if (p.length < 2) return "";
    let d = `M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;
    for (let i = 1; i < p.length; i++) {
      const [x, y] = p[i];
      const [px, py] = p[i - 1];
      const cx = (px + x) / 2;
      const cy = (py + y) / 2;
      d += ` Q${px.toFixed(1)},${py.toFixed(1)} ${cx.toFixed(1)},${cy.toFixed(1)}`;
      if (i === p.length - 1) d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
    }
    return d;
  };

  const polyPath = (pts) =>
    "M" + pts.map(([la, lo]) => {
      const [x, y] = project(la, lo);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" L") + " Z";

  const linePath = (pts) =>
    "M" + pts.map(([la, lo]) => {
      const [x, y] = project(la, lo);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" L");

  // ─── TIBER ───────────────────────────────────────────────
  // Real S-curve: north bend at Foro Italico, west swing past Castel S.Angelo,
  // east swing through Tiber Island, then south past Testaccio.
  const tiberPts = [
    [41.948, 12.467], [41.942, 12.469], [41.937, 12.473], [41.932, 12.473],
    [41.927, 12.469], [41.924, 12.464], [41.920, 12.466], [41.916, 12.471],
    [41.912, 12.470], [41.908, 12.466], [41.904, 12.465], [41.900, 12.466],
    [41.896, 12.469], [41.892, 12.475], [41.890, 12.479], [41.887, 12.480],
    [41.882, 12.479], [41.878, 12.477], [41.873, 12.477], [41.866, 12.479],
    [41.858, 12.482], [41.848, 12.485], [41.838, 12.486], [41.828, 12.487],
    [41.818, 12.486],
  ];

  // Tiber Island — tiny boat-shaped islet between Trastevere and the centre
  const islandPts = [
    [41.8909, 12.4769], [41.8911, 12.4778], [41.8907, 12.4783],
    [41.8902, 12.4781], [41.8900, 12.4774], [41.8904, 12.4769],
    [41.8909, 12.4769],
  ];

  // ─── AURELIAN WALLS ──────────────────────────────────────
  // Following real gates: Popolo → Pinciana → Salaria → Pia → Maggiore → S.Giovanni
  // → Metronia → S.Sebastiano → Ostiense → (across Tiber) Portese → Aurelia → S.Spirito
  const wallPts = [
    [41.9116, 12.4762],   // Porta del Popolo
    [41.9136, 12.4828],   // Muro Torto bend
    [41.9100, 12.4885],   // Porta Pinciana
    [41.9105, 12.4955],   // Porta Salaria
    [41.9085, 12.5043],   // Castro Pretorio
    [41.9028, 12.5085],   // Porta Tiburtina
    [41.8920, 12.5168],   // Porta Maggiore
    [41.8855, 12.5076],   // Porta S. Giovanni
    [41.8800, 12.5005],   // Porta Metronia
    [41.8717, 12.4998],   // Porta S. Sebastiano
    [41.8763, 12.4818],   // Porta S. Paolo / Pyramid
    [41.8770, 12.4748],   // crosses Tiber
    [41.8810, 12.4690],   // Porta Portese
    [41.8888, 12.4583],   // Porta Aurelia / Gianicolo crest
    [41.8978, 12.4583],   // Bastione del Sangallo
    [41.9024, 12.4634],   // Porta Cavalleggeri (joins Leonine)
  ];

  // ─── LEONINE WALLS (Vatican) ─────────────────────────────
  const vatPts = [
    [41.9080, 12.4525], [41.9082, 12.4587], [41.9070, 12.4622],
    [41.9035, 12.4641], [41.9007, 12.4623], [41.9004, 12.4570],
    [41.9012, 12.4523], [41.9046, 12.4498], [41.9080, 12.4525],
  ];

  // ─── EUR (planned grid south of city) ────────────────────
  const eurPts = [
    [41.840, 12.456], [41.840, 12.484], [41.825, 12.484],
    [41.825, 12.456], [41.840, 12.456],
  ];

  // ─── PARKS ───────────────────────────────────────────────
  const villaBorghese = [
    [41.9180, 12.4860], [41.9180, 12.4945], [41.9100, 12.4945],
    [41.9100, 12.4860], [41.9180, 12.4860],
  ];
  const gianicolo = [
    [41.8970, 12.4575], [41.8970, 12.4660], [41.8865, 12.4660],
    [41.8865, 12.4595], [41.8970, 12.4575],
  ];
  const villaPamphilj = [
    [41.8870, 12.4400], [41.8870, 12.4520], [41.8770, 12.4520],
    [41.8770, 12.4400], [41.8870, 12.4400],
  ];

  // ─── PRINCIPAL AXES (streets) ────────────────────────────
  const viaCorso = [[41.9112, 12.4768], [41.9007, 12.4791], [41.8957, 12.4811]];
  const viaForiImp = [[41.8957, 12.4825], [41.8902, 12.4923]];
  const viaConciliazione = [[41.9024, 12.4666], [41.9020, 12.4595], [41.9020, 12.4565]];
  const viaNazionale = [[41.8957, 12.4825], [41.8995, 12.4925], [41.9018, 12.4985]];
  const viaCavour = [[41.8957, 12.4825], [41.8950, 12.4940], [41.8956, 12.5023]];

  // ─── HILLS (the seven + Pincio + Gianicolo) ──────────────
  const hills = [
    { lat: 41.8930, lon: 12.4830, name: "CAPITOLINO" },
    { lat: 41.8895, lon: 12.4880, name: "PALATINO" },
    { lat: 41.8845, lon: 12.4830, name: "AVENTINO" },
    { lat: 41.8855, lon: 12.4955, name: "CELIO" },
    { lat: 41.8950, lon: 12.4980, name: "ESQUILINO" },
    { lat: 41.8990, lon: 12.4960, name: "VIMINALE" },
    { lat: 41.9005, lon: 12.4880, name: "QUIRINALE" },
    { lat: 41.9120, lon: 12.4830, name: "PINCIO" },
    { lat: 41.8915, lon: 12.4625, name: "GIANICOLO" },
  ];

  // ─── DISTRICT / ORIENTATION LABELS ───────────────────────
  const labels = [
    { lat: 41.940, lon: 12.485, text: "Foro Italico", italic: true },
    { lat: 41.927, lon: 12.495, text: "Parioli" },
    { lat: 41.917, lon: 12.502, text: "Salario" },
    { lat: 41.872, lon: 12.470, text: "Trastevere" },
    { lat: 41.880, lon: 12.490, text: "Testaccio" },
    { lat: 41.866, lon: 12.495, text: "Aventino" },
    { lat: 41.870, lon: 12.510, text: "Appio" },
    { lat: 41.832, lon: 12.470, text: "EUR" },
    { lat: 41.905, lon: 12.453, text: "Vaticano", italic: true },
    { lat: 41.901, lon: 12.502, text: "Termini" },
  ];

  // ─── PIAZZAS (small annotated dots) ──────────────────────
  const piazzas = [
    { lat: 41.9105, lon: 12.4768, name: "P.za del Popolo" },
    { lat: 41.9015, lon: 12.4730, name: "P.za Navona" },
    { lat: 41.9059, lon: 12.4823, name: "P.za di Spagna" },
    { lat: 41.8957, lon: 12.4823, name: "P.za Venezia" },
    { lat: 41.9022, lon: 12.4566, name: "P.za S. Pietro" },
    { lat: 41.8895, lon: 12.4716, name: "Campo de' Fiori" },
  ];

  // ─── LANDMARKS ───────────────────────────────────────────
  const all = [];
  window.EPOCHS.forEach((ep) => {
    ep.landmarks.forEach((l, i) => all.push({ ...l, epoch: ep, orderInEpoch: i + 1 }));
  });
  const activeLM = active ? all.find((l) => l.slug === active) : null;
  const activeCoord = activeLM ? window.LANDMARK_COORDS[activeLM.slug] : null;

  // Pre-compute pin positions and avoid label collisions by alternating sides
  const pins = all.map((l) => {
    const c = window.LANDMARK_COORDS[l.slug];
    if (!c) return null;
    const [x, y] = project(c[0], c[1]);
    return { l, x, y };
  }).filter(Boolean);

  return (
    <div
      className={`lu-map ${compact ? "lu-map--compact" : ""}`}
      style={activeLM ? { "--epoch-color": activeLM.epoch.color } : undefined}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="lu-map__svg">
        <defs>
          {/* Vellum/parchment subtle grain */}
          <pattern id="luGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          </pattern>
          <pattern id="luGridFine" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.04" />
          </pattern>
          {/* Wall hatching */}
          <pattern id="luWalls" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#6b5640" strokeWidth="0.6" opacity="0.3" />
          </pattern>
          {/* Park stipple */}
          <pattern id="luPark" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.6" fill="#5d6a4a" opacity="0.55" />
            <circle cx="6" cy="6" r="0.5" fill="#5d6a4a" opacity="0.4" />
            <circle cx="6" cy="2" r="0.4" fill="#7a8757" opacity="0.35" />
            <circle cx="2" cy="6" r="0.4" fill="#7a8757" opacity="0.3" />
          </pattern>
          {/* Built-up area dotted texture */}
          <pattern id="luBuilt" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.4" fill="currentColor" opacity="0.18" />
            <circle cx="9" cy="6" r="0.4" fill="currentColor" opacity="0.15" />
            <circle cx="5" cy="11" r="0.4" fill="currentColor" opacity="0.13" />
          </pattern>
          {/* Ornate frame corner */}
          <symbol id="luCorner" viewBox="0 0 40 40">
            <path d="M0,0 L40,0 M0,0 L0,40 M0,8 L8,8 L8,0 M14,2 L26,2 M2,14 L2,26" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </symbol>
        </defs>

        {/* parchment background */}
        <rect width={W} height={H} fill="var(--paper-2)" />
        <rect width={W} height={H} fill="url(#luGridFine)" />
        <rect width={W} height={H} fill="url(#luGrid)" />

        {/* Decorative double frame */}
        <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        <rect x="22" y="22" width={W - 44} height={H - 44} fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
        <use href="#luCorner" x="22" y="22" width="40" height="40" opacity="0.35" />
        <use href="#luCorner" x={W - 62} y="22" width="40" height="40" opacity="0.35" transform={`rotate(90, ${W - 42}, 42)`} />
        <use href="#luCorner" x="22" y={H - 62} width="40" height="40" opacity="0.35" transform={`rotate(-90, 42, ${H - 42})`} />
        <use href="#luCorner" x={W - 62} y={H - 62} width="40" height="40" opacity="0.35" transform={`rotate(180, ${W - 42}, ${H - 42})`} />

        {/* built-up wash inside Aurelian */}
        <path d={polyPath(wallPts)} fill="url(#luBuilt)" opacity="0.9" />

        {/* parks first (behind walls/streets) */}
        <g className="lu-map__park">
          <path d={polyPath(villaBorghese)} fill="url(#luPark)" stroke="#5d6a4a" strokeWidth="0.8" strokeDasharray="1 2" opacity="0.85" />
          <path d={polyPath(gianicolo)} fill="url(#luPark)" stroke="#5d6a4a" strokeWidth="0.8" strokeDasharray="1 2" opacity="0.85" />
          <path d={polyPath(villaPamphilj)} fill="url(#luPark)" stroke="#5d6a4a" strokeWidth="0.8" strokeDasharray="1 2" opacity="0.7" />
          <text className="lu-map__park-label" x={project(41.914, 12.4905)[0]} y={project(41.914, 12.4905)[1]} textAnchor="middle">VILLA · BORGHESE</text>
          <text className="lu-map__park-label" x={project(41.892, 12.4628)[0]} y={project(41.892, 12.4628)[1]} textAnchor="middle">GIANICOLO</text>
          <text className="lu-map__park-label" x={project(41.882, 12.446)[0]} y={project(41.882, 12.446)[1]} textAnchor="middle" opacity="0.6">V.PAMPHILJ</text>
        </g>

        {/* Streets — principal axes */}
        <g className="lu-map__streets" fill="none" stroke="#bfa17c" strokeWidth="1.4" opacity="0.7">
          <path d={linePath(viaCorso)} />
          <path d={linePath(viaForiImp)} />
          <path d={linePath(viaConciliazione)} />
          <path d={linePath(viaNazionale)} />
          <path d={linePath(viaCavour)} />
        </g>

        {/* Aurelian walls */}
        <path d={polyPath(wallPts)} fill="none" stroke="#6b5640" strokeWidth="2.2" strokeLinejoin="round" opacity="0.9" />
        <path d={polyPath(wallPts)} fill="none" stroke="#6b5640" strokeWidth="0.8" strokeLinejoin="round" strokeDasharray="3 3" opacity="0.85" transform="translate(2.5,2.5)" />
        {/* Bastion ticks along the wall */}
        {wallPts.map(([la, lo], i) => {
          const [x, y] = project(la, lo);
          return <circle key={i} cx={x} cy={y} r="2" fill="#6b5640" opacity="0.85" />;
        })}

        {/* Leonine walls */}
        <path d={polyPath(vatPts)} fill="url(#luWalls)" stroke="#6b5640" strokeWidth="1.4" strokeLinejoin="round" opacity="0.85" />
        {/* EUR */}
        <path d={polyPath(eurPts)} fill="url(#luBuilt)" stroke="#6b5640" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />

        {/* Tiber — soft glow + body + centerline */}
        <path d={smoothPath(tiberPts)} fill="none" stroke="#9fb3c2" strokeWidth="22" strokeLinecap="round" opacity="0.22" />
        <path d={smoothPath(tiberPts)} fill="none" stroke="#7a8fa1" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
        <path d={smoothPath(tiberPts)} fill="none" stroke="#506a7c" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
        <path id="luTiberPath" d={smoothPath(tiberPts)} fill="none" stroke="none" />
        <text className="lu-map__river-label">
          <textPath href="#luTiberPath" startOffset="32%">F L V M E N · T I B E R I S</textPath>
        </text>
        <text className="lu-map__river-label" opacity="0.5">
          <textPath href="#luTiberPath" startOffset="78%">— mare verso —</textPath>
        </text>

        {/* Tiber island */}
        <path d={polyPath(islandPts)} fill="#d8c8a8" stroke="#6b5640" strokeWidth="0.8" opacity="0.95" />

        {/* The Seven Hills */}
        <g className="lu-map__hills">
          {hills.map((h, i) => {
            const [x, y] = project(h.lat, h.lon);
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <path d="M -7,3 L 0,-5 L 7,3 Z" fill="none" stroke="#6b5640" strokeWidth="0.7" opacity="0.7" />
                <text y="14" textAnchor="middle" className="lu-map__hill-label">{h.name}</text>
              </g>
            );
          })}
        </g>

        {/* District / orientation labels */}
        {labels.map((lb, i) => {
          const [x, y] = project(lb.lat, lb.lon);
          return (
            <text
              key={i}
              x={x}
              y={y}
              className={`lu-map__district ${lb.italic ? "is-italic" : ""}`}
              textAnchor="middle"
            >
              {lb.text}
            </text>
          );
        })}

        {/* Piazza dots */}
        <g className="lu-map__piazzas">
          {piazzas.map((p, i) => {
            const [x, y] = project(p.lat, p.lon);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="2.2" fill="none" stroke="#6b5640" strokeWidth="0.9" opacity="0.7" />
                <circle cx={x} cy={y} r="0.8" fill="#6b5640" opacity="0.8" />
                <text x={x + 5} y={y + 3} className="lu-map__piazza-label">{p.name}</text>
              </g>
            );
          })}
        </g>

        {/* Compass rose */}
        <g transform={`translate(${W - 78}, 88)`} className="lu-map__compass">
          <circle r="32" fill="var(--paper-2)" stroke="currentColor" strokeWidth="0.6" opacity="0.85" />
          <circle r="28" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <circle r="22" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
          {/* eight-point star */}
          <polygon points="0,-30 3,-3 30,0 3,3 0,30 -3,3 -30,0 -3,-3" fill="currentColor" opacity="0.18" />
          <polygon points="0,-30 2,-2 0,0" fill="currentColor" opacity="0.85" />
          <polygon points="0,30 -2,2 0,0" fill="currentColor" opacity="0.45" />
          <line x1="-30" y1="0" x2="30" y2="0" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
          <line x1="0" y1="-30" x2="0" y2="30" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
          <text y="-36" textAnchor="middle" className="lu-map__rose-letter">N</text>
          <text y="44" textAnchor="middle" className="lu-map__rose-letter" opacity="0.55">S</text>
          <text x="38" y="3" className="lu-map__rose-letter" opacity="0.55">E</text>
          <text x="-38" y="3" textAnchor="end" className="lu-map__rose-letter" opacity="0.55">O</text>
        </g>

        {/* Scale bar */}
        <g transform={`translate(60, ${H - 70})`} className="lu-map__scale">
          <text y="-10" fontFamily="var(--mono)" fontSize="9" letterSpacing="2" fill="currentColor" opacity="0.65">SCALA · 1 : 26 000</text>
          <rect x="0" y="0" width="50" height="6" fill="currentColor" opacity="0.85" />
          <rect x="50" y="0" width="50" height="6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.85" />
          <rect x="100" y="0" width="50" height="6" fill="currentColor" opacity="0.85" />
          <rect x="150" y="0" width="50" height="6" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.85" />
          <text x="0" y="20" fontFamily="var(--mono)" fontSize="9" letterSpacing="1.5" fill="currentColor" opacity="0.65">0</text>
          <text x="100" y="20" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" letterSpacing="1.5" fill="currentColor" opacity="0.65">1 km</text>
          <text x="200" y="20" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" letterSpacing="1.5" fill="currentColor" opacity="0.65">2 km</text>
        </g>

        {/* Title cartouche (bottom right) */}
        <g transform={`translate(${W - 250}, ${H - 110})`} className="lu-map__cartouche">
          <rect x="0" y="0" width="220" height="80" fill="var(--paper-2)" stroke="currentColor" strokeWidth="0.6" opacity="0.92" />
          <rect x="6" y="6" width="208" height="68" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
          <text x="110" y="28" textAnchor="middle" fontFamily="var(--serif)" fontSize="16" fontStyle="italic" fill="currentColor">Pianta di Roma</text>
          <text x="110" y="46" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" letterSpacing="3" fill="currentColor" opacity="0.7">XXV · MONVMENTA</text>
          <text x="110" y="62" textAnchor="middle" fontFamily="var(--mono)" fontSize="8" letterSpacing="2" fill="currentColor" opacity="0.55">DELINEAVIT · LAPIS · VRBIS</text>
        </g>

        {/* Coordinate ticks on frame */}
        <g className="lu-map__ticks">
          {[12.44, 12.46, 12.48, 12.50, 12.52].map((lo, i) => {
            const [x] = project(latMax, lo);
            return (
              <g key={i}>
                <line x1={x} y1="14" x2={x} y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <line x1={x} y1={H - 22} x2={x} y2={H - 14} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <text x={x} y="10" textAnchor="middle" className="lu-map__tick">{lo.toFixed(2)}°E</text>
              </g>
            );
          })}
          {[41.83, 41.85, 41.87, 41.89, 41.91, 41.93, 41.94].map((la, i) => {
            const [, y] = project(la, lonMin);
            return (
              <g key={i}>
                <line x1="14" y1={y} x2="22" y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <line x1={W - 22} y1={y} x2={W - 14} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                <text x="10" y={y + 3} textAnchor="end" className="lu-map__tick" transform={`rotate(-90, 10, ${y + 3})`}>{la.toFixed(2)}°N</text>
              </g>
            );
          })}
        </g>

        {/* Landmarks */}
        {pins.map(({ l, x, y }, i) => {
          const isActive = l.slug === active;
          const dimmed = active && !isActive;
          // Stagger label sides to avoid overlap clusters
          const labelLeft = i % 2 === 1 && !isActive;
          return (
            <a
              key={l.slug}
              href={`#landmark/${l.epoch.slug}/${l.slug}`}
              className={`lu-map__pin ${isActive ? "is-active" : ""} ${dimmed ? "is-dim" : ""}`}
              style={{ "--pin-color": l.epoch.color }}
            >
              <circle cx={x} cy={y} r="15" className="lu-map__pin-halo" />
              <circle cx={x} cy={y} r="8.5" className="lu-map__pin-ring" />
              <circle cx={x} cy={y} r="5" className="lu-map__pin-dot" />
              <text x={x} y={y + 3} className="lu-map__pin-num" textAnchor="middle">
                {l.orderInEpoch}
              </text>
              <text
                x={labelLeft ? x - 14 : x + 14}
                y={y + 3.5}
                className="lu-map__pin-label"
                textAnchor={labelLeft ? "end" : "start"}
              >
                {l.name}
              </text>
            </a>
          );
        })}

        {/* Active crosshair */}
        {activeCoord && (() => {
          const [x, y] = project(activeCoord[0], activeCoord[1]);
          return (
            <g className="lu-map__crosshair">
              <circle cx={x} cy={y} r="38" fill="none" stroke="var(--epoch-color)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
              <circle cx={x} cy={y} r="62" fill="none" stroke="var(--epoch-color)" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.45" />
              <line x1={x - 80} y1={y} x2={x - 22} y2={y} stroke="var(--epoch-color)" strokeWidth="0.6" opacity="0.5" />
              <line x1={x + 22} y1={y} x2={x + 80} y2={y} stroke="var(--epoch-color)" strokeWidth="0.6" opacity="0.5" />
              <line x1={x} y1={y - 80} x2={x} y2={y - 22} stroke="var(--epoch-color)" strokeWidth="0.6" opacity="0.5" />
              <line x1={x} y1={y + 22} x2={x} y2={y + 80} stroke="var(--epoch-color)" strokeWidth="0.6" opacity="0.5" />
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

window.RomeMap = RomeMap;

// Section wrapper for the homepage
const RomeMapSection = () => {
  return (
    <section className="lu-mapsec" id="map" data-screen-label="04 Map">
      <div className="lu-mapsec__head">
        <div className="lu-tag lu-tag--dark">§ Carta · Карта</div>
        <h2 className="lu-mapsec__title">
          Карта <em>центра</em> с двадцатью пятью адресами
        </h2>
        <p className="lu-mapsec__sub">
          Памятники из путеводителя на одной карте. Цвет точки соответствует
          эпохе, номер — порядку внутри неё. Нажмите на точку, чтобы перейти
          к статье.
        </p>
        <div className="lu-mapsec__legend">
          {window.EPOCHS.map((e) => (
            <div key={e.slug} className="lu-mapsec__leg" style={{ "--epoch-color": e.color }}>
              <span className="lu-mapsec__leg-dot" />
              <span className="lu-mapsec__leg-num">{e.number}</span>
              <span className="lu-mapsec__leg-name">{e.period}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="lu-mapsec__body">
        <RomeMap />
      </div>
    </section>
  );
};

window.RomeMapSection = RomeMapSection;
