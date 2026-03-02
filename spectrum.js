const { useState } = React;

const COLUMNS = [
  {
    label: "Prohibited",
    subtitle: "No access permitted",
    mechanism: "Law / technical enforcement",
    color: "#dc2626",
    colorLight: "#dc262620",
    examples: [
      "Verbatim reproduction of protected works",
      "Reproducing identifiable creative styles",
      "Surveillance-based extraction of personal data",
      "DRM-like tracking of content downstream",
    ],
  },
  {
    label: "Licensed",
    subtitle: "Paid, negotiated access",
    mechanism: "Bilateral or collective contracts",
    color: "#f97316",
    colorLight: "#f9731620",
    examples: [
      "RAG / retrieval from news publishers",
      "Commercial API access (Wikimedia Enterprise model)",
      "Proprietary commercial datasets",
      "Inference outputs using copyrighted content",
    ],
  },
  {
    label: "Collectively\ngoverned",
    subtitle: "Terms set by groups, not individuals",
    mechanism: "CMOs, data cooperatives, unions, government-facilitated settlements",
    color: "#a855f7",
    colorLight: "#a855f720",
    examples: [
      "Sovereign news datasets (NDP Nieuwsmedia model)",
      "Music rights via adapted CMOs (DACS, GEMA)",
      "Worker data coalitions (Worker Info Exchange)",
      "Data cooperatives pooling personal data",
      "Government-mediated long-tail creator settlements",
    ],
  },
  {
    label: "Conditionally\nopen",
    subtitle: "Open by default, with proportionate conditions",
    mechanism: "Machine-readable opt-outs, throttling, attribution, bot separation",
    color: "#eab308",
    colorLight: "#eab30820",
    examples: [
      "Commercial AI training (with rightsholder opt-out via IETF AI PREF)",
      "Consumer data portability (Open Banking model)",
      "Agentic browsing (throttled, not blocked)",
      "Specialist research datasets with sustainability conditions",
      "Search indexing (separate from AI training crawlers)",
      "Co-generated sensor data (EU Free Flow model)",
    ],
  },
  {
    label: "Open",
    subtitle: "Free, unrestricted access for all",
    mechanism: "Open licence / no restrictions",
    color: "#22c55e",
    colorLight: "#22c55e20",
    examples: [
      "Publicly funded research data",
      "Government open data (census, transport, environment)",
      "Non-commercial TDM for research & education",
      "Human browsing of any content",
      "Archival & preservation (Common Crawl, Internet Archive)",
      "Commons-based knowledge (Wikipedia for non-commercial use)",
      "Open scientific corpora & multilingual resources",
    ],
  },
];

const Crystal = ({ color, height, width, x, opacity = 0.6 }) => (
  <polygon
    points={`${x},${300} ${x + width / 2},${300 - height} ${x + width},${300}`}
    fill={color}
    opacity={opacity}
  />
);

const SpectrumViz = () => {
  const w = 1000;
  const crystalGroups = [
    { colors: ["#dc2626", "#b91c1c", "#991b1b"], baseX: 10, count: 3 },
    { colors: ["#f97316", "#ea580c", "#c2410c"], baseX: 200, count: 4 },
    { colors: ["#a855f7", "#9333ea", "#7c3aed"], baseX: 390, count: 5 },
    { colors: ["#eab308", "#ca8a04", "#a16207"], baseX: 590, count: 5 },
    { colors: ["#22c55e", "#16a34a", "#15803d"], baseX: 790, count: 4 },
  ];

  return (
    <svg viewBox="0 0 1000 300" style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc262615" />
          <stop offset="25%" stopColor="#f9731610" />
          <stop offset="50%" stopColor="#a855f710" />
          <stop offset="75%" stopColor="#eab30810" />
          <stop offset="100%" stopColor="#22c55e15" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height="300" fill="url(#bgGrad)" />

      {crystalGroups.map((group, gi) =>
        Array.from({ length: group.count }).map((_, i) => {
          const spacing = 180 / group.count;
          const x = group.baseX + i * spacing;
          const h = 60 + Math.sin(gi * 2.3 + i * 1.7) * 40 + Math.cos(i * 3.1) * 30;
          const wid = 30 + Math.sin(i * 2.1 + gi) * 15;
          const color = group.colors[i % group.colors.length];
          const op = 0.25 + (i % 3) * 0.1;
          return <Crystal key={`${gi}-${i}`} color={color} height={h} width={wid} x={x} opacity={op} />;
        })
      )}

      {[200, 400, 600, 800].map((x, i) => (
        <line key={i} x1={x} y1={40} x2={x} y2={300} stroke="#ffffff10" strokeWidth="1" strokeDasharray="4 4" />
      ))}
    </svg>
  );
};

function DataSpectrum() {
  const [hoveredCol, setHoveredCol] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c14",
      fontFamily: "'IBM Plex Sans', sans-serif",
      color: "#e2e8f0",
      padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header area */}
      <div style={{
        background: "linear-gradient(180deg, #0f1729 0%, #080c14 100%)",
        padding: "48px 32px 0",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#64748b",
              fontFamily: "'IBM Plex Mono', monospace",
              background: "#1e293b",
              padding: "6px 12px",
              borderRadius: "4px",
            }}>
              OpenMined
            </div>
            <div style={{
              fontSize: "36px",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
            }}>
              The Data Access Spectrum
            </div>
          </div>

          {/* Spectrum labels */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 4px",
            marginBottom: "0",
          }}>
            <span style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#dc2626",
            }}>Closed</span>
            <div style={{
              flex: 1,
              height: "2px",
              margin: "0 20px",
              background: "linear-gradient(90deg, #dc2626, #f97316, #a855f7, #eab308, #22c55e)",
              borderRadius: "2px",
              opacity: 0.5,
            }} />
            <span style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#22c55e",
            }}>Open</span>
          </div>

          {/* Crystal visualization */}
          <div style={{ margin: "0 -8px", overflow: "hidden", borderRadius: "0" }}>
            <SpectrumViz />
          </div>
        </div>
      </div>

      {/* Columns */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 32px 48px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "2px",
          background: "#1a2235",
          borderRadius: "0 0 12px 12px",
          overflow: "hidden",
        }}>
          {COLUMNS.map((col, i) => {
            const isHovered = hoveredCol === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
                style={{
                  background: isHovered ? "#131b2e" : "#0e1422",
                  padding: "24px 18px 28px",
                  transition: "background 0.2s",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Column header */}
                <div style={{
                  borderBottom: `2px solid ${col.color}`,
                  paddingBottom: "14px",
                  marginBottom: "14px",
                }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: col.color,
                    lineHeight: 1.2,
                    whiteSpace: "pre-line",
                    marginBottom: "4px",
                  }}>
                    {col.label}
                  </div>
                  <div style={{
                    fontSize: "11.5px",
                    color: "#94a3b8",
                    lineHeight: 1.4,
                  }}>
                    {col.subtitle}
                  </div>
                </div>

                {/* Mechanism */}
                <div style={{
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "12px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1.4,
                }}>
                  {col.mechanism}
                </div>

                {/* Examples */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  {col.examples.map((ex, j) => (
                    <div key={j} style={{
                      fontSize: "12.5px",
                      lineHeight: 1.45,
                      color: "#cbd5e1",
                      padding: "8px 10px",
                      background: col.colorLight,
                      borderRadius: "6px",
                      borderLeft: `2px solid ${col.color}40`,
                    }}>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Annotations bar */}
        <div style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}>
          {[
            {
              icon: "↔",
              title: "Not binary",
              text: "Access regimes vary by content type, actor, and purpose. What's right for music may not be for medical research.",
            },
            {
              icon: "⚖",
              title: "Conditional openness",
              text: "Accessibility is the default. Proportionate conditions layer on for fairness and sustainability — not artificial scarcity.",
            },
            {
              icon: "🤝",
              title: "Collective by design",
              text: "Individual data transactions yield trivial returns. Collective bargaining gives creators real leverage against concentrated AI firms.",
            },
          ].map((note, i) => (
            <div key={i} style={{
              padding: "16px 18px",
              background: "#0e1422",
              borderRadius: "10px",
              border: "1px solid #1e293b",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}>
                <span style={{ fontSize: "16px" }}>{note.icon}</span>
                <span style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#f8fafc",
                }}>{note.title}</span>
              </div>
              <div style={{
                fontSize: "12px",
                color: "#94a3b8",
                lineHeight: 1.5,
              }}>
                {note.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
