/* eslint-disable */
import { useState, useEffect } from "react";

const NAV_PAGES = ["Home", "About", "Gallery", "Shop"];

const GALLERY_ITEMS = [
  { id: 1, label: "Morning Run", tag: "RUNNING", cat: "Running" },
  { id: 2, label: "Pull Day", tag: "CALISTHENICS", cat: "Training" },
  { id: 3, label: "5K PB", tag: "MILESTONE", cat: "Running" },
  { id: 4, label: "Bar Work", tag: "STRENGTH", cat: "Training" },
  { id: 5, label: "Track Session", tag: "RUNNING", cat: "Running" },
  { id: 6, label: "Core & Push", tag: "TRAINING", cat: "Training" },
  { id: 7, label: "Road Miles", tag: "ENDURANCE", cat: "Running" },
  { id: 8, label: "Muscle Up", tag: "SKILL", cat: "Training" },
  { id: 9, label: "Weekly Check In", tag: "PROGRESS", cat: "Progress" },
];

const PRODUCTS = [
  { name: "Performance Tee", price: "£35", tag: "BESTSELLER" },
  { name: "Run Shorts", price: "£40", tag: "NEW" },
  { name: "TYYB Hoodie", price: "£65", tag: "NEW" },
  { name: "Training Socks", price: "£12", tag: null },
];

const PILLARS = [
  { n: "01", title: "MOVE EVERY DAY", sub: "Run, train, repeat. Every discipline counts — no single path to fitness." },
  { n: "02", title: "SIMPLICITY", sub: "Strip everything back. The basics done brilliantly, every single day." },
  { n: "03", title: "AUTHENTIC", sub: "Real progress, real people, real gear. No filters on the work." },
];

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a08; }
  ::-webkit-scrollbar { width: 3px; background: #0a0a08; }
  ::-webkit-scrollbar-thumb { background: #8a9e7a; }

  .camo-accent {
    background-image: repeating-linear-gradient(45deg, rgba(90,100,80,0.08) 0px, rgba(90,100,80,0.08) 4px, transparent 4px, transparent 12px), repeating-linear-gradient(-45deg, rgba(70,80,65,0.06) 0px, rgba(70,80,65,0.06) 3px, transparent 3px, transparent 10px);
  }

  .nav-link {
    color: #f0ede6; font-size: 12px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; opacity: 0.5; transition: opacity 0.2s, color 0.2s;
    cursor: pointer; background: none; border: none; font-family: 'Barlow Condensed', sans-serif;
  }
  .nav-link:hover { opacity: 1; }
  .nav-link.active { opacity: 1; color: #8a9e7a; }

  .btn-primary {
    background: #8a9e7a; color: #0a0a08; border: none; padding: 15px 36px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 800;
    letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .btn-primary:hover { background: #f0ede6; transform: scale(1.03); }

  .btn-outline {
    background: transparent; color: #f0ede6; border: 1px solid rgba(240,237,230,0.25);
    padding: 13px 32px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: #8a9e7a; color: #8a9e7a; }

  .tag-pill {
    font-size: 9px; font-weight: 800; letter-spacing: 0.18em; color: #8a9e7a;
    background: rgba(110,124,95,0.15); padding: 4px 10px;
    border: 1px solid rgba(110,124,95,0.30); text-transform: uppercase; display: inline-block;
  }

  .section-label { font-size: 10px; letter-spacing: 0.35em; color: #8a9e7a; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; display: block; }
  .section-heading { font-size: clamp(36px, 6vw, 72px); font-weight: 900; text-transform: uppercase; line-height: 0.92; letter-spacing: -0.01em; }

  .noise-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .ticker-track { display: flex; gap: 60px; animation: ticker 18s linear infinite; white-space: nowrap; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .gallery-card {
    background: #111109; border: 1px solid #1a1a14; position: relative; overflow: hidden;
    cursor: pointer; transition: transform 0.3s, border-color 0.3s; aspect-ratio: 4/5;
  }
  .gallery-card:hover { transform: translateY(-5px); border-color: #8a9e7a; }
  .gallery-card:hover .g-overlay { opacity: 1; }
  .g-overlay { position: absolute; inset: 0; background: rgba(110,124,95,0.10); opacity: 0; transition: opacity 0.3s; }

  .product-card {
    border: 1px solid #1e1e18; background: #0e0e0b; overflow: hidden;
    transition: transform 0.3s, border-color 0.3s;
  }
  .product-card:hover { transform: translateY(-5px); border-color: #8a9e7a; }

  .pillar-row {
    border-top: 1px solid #222; padding: 28px 0;
    display: flex; align-items: center; gap: 32px; flex-wrap: wrap; transition: border-color 0.3s;
  }
  .pillar-row:hover { border-top-color: #8a9e7a; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mob-menu-btn { display: flex !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr 1fr !important; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .gallery-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;

// ── TICKER ─────────────────────────────────────────────────────────────────
function Ticker() {
  const words = ["THE YOUNGEST YOU'LL BE", "RUN FURTHER", "TRAIN HARDER", "MOVE FREELY", "CALISTHENICS", "AUTHENTIC GEAR", "NO EXCUSES"];
  const repeated = [...words, ...words];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #1a1a14", borderBottom: "1px solid #1a1a14", padding: "12px 0", background: "#080806" }}>
      <div className="ticker-track">
        {repeated.map((w, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.3em", color: i % 2 === 0 ? "#f0ede6" : "#8a9e7a", opacity: i % 2 === 0 ? 0.4 : 1 }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (p) => { setPage(p); setMob(false); window.scrollTo(0, 0); };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, padding: "0 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,8,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid #1a1a14" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      {/* Logo */}
      <div onClick={() => go("Home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 9, letterSpacing: "0.04em", fontFamily: "'Barlow Condensed', sans-serif" }}>TYYB</span>
        </div>
        <span style={{ fontSize: 10, letterSpacing: "0.28em", fontWeight: 700, opacity: 0.4, fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>The Youngest You'll Be</span>
      </div>

      {/* Desktop links */}
      <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
        {NAV_PAGES.map(p => (
          <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => go(p)}>{p}</button>
        ))}
      </div>

      {/* Shop CTA + hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 11 }} onClick={() => go("Shop")}>Shop</button>
        <button className="mob-menu-btn" onClick={() => setMob(!mob)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2, background: "#f0ede6" }} />)}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mob && (
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, background: "rgba(10,10,8,0.98)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1a1a14", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {NAV_PAGES.map(p => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} style={{ fontSize: 22, textAlign: "left" }} onClick={() => go(p)}>{p}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── PAGE: HOME ─────────────────────────────────────────────────────────────
function PageHome({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 32px 72px",
        background: `radial-gradient(ellipse 55% 45% at 75% 35%, rgba(110,124,95,0.09) 0%, transparent 65%), radial-gradient(ellipse 35% 55% at 15% 75%, rgba(255,255,255,0.02) 0%, transparent 55%), #0a0a08`,
        position: "relative",
      }}>
        <div style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center", fontSize: 9, letterSpacing: "0.4em", fontWeight: 700, opacity: 0.2, textTransform: "uppercase" }}>
          CALISTHENICS — AUTHENTIC — EST. 2024
        </div>
        <div>
          <span className="tag-pill" style={{ marginBottom: 20, display: "inline-block" }}>New Collection 2025</span>
          <h1 style={{ fontSize: "clamp(72px, 17vw, 170px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.025em", marginBottom: 28 }}>
            <span style={{ display: "block", animation: "slideUp 0.5s 0.1s both" }}>THE</span>
            <span style={{ display: "block", color: "#8a9e7a", animation: "slideUp 0.5s 0.2s both" }}>YOUNGEST</span>
            <span style={{ display: "block", animation: "slideUp 0.5s 0.3s both" }}>YOU'LL BE</span>
          </h1>
          <p style={{ fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.55, maxWidth: 480, lineHeight: 1.75, marginBottom: 36, animation: "slideUp 0.5s 0.4s both" }}>
            A fitness and activewear brand built for people who move. Whether you run the streets or train the bars — TYYB gear keeps up. You're at the youngest you'll ever be. Start now.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "slideUp 0.5s 0.5s both" }}>
            <button className="btn-primary" onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Shop The Drop</button>
            <button className="btn-outline" onClick={() => { setPage("About"); window.scrollTo(0,0); }}>Our Story</button>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* Welcome intro */}
      <section style={{ padding: "80px 32px", borderBottom: "1px solid #1a1a14" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="section-label">Welcome To TYYB</span>
            <h2 className="section-heading">MOVEMENT<br />IS THE<br />MESSAGE</h2>
          </div>
          <div>
            <p style={{ fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.6, lineHeight: 1.85, marginBottom: 20 }}>
              TYYB was built for people who move. Runners, calisthenics athletes, anyone who shows up and puts in the work — this brand is for you.
            </p>
            <p style={{ fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.6, lineHeight: 1.85 }}>
              Every piece of kit is designed around real training — whether that's clocking road miles at 6am or hitting the bar park after work. Functional, minimal, built to last.
            </p>
          </div>
        </div>
      </section>

      {/* Shop teaser */}
      <section style={{ padding: "80px 32px", background: "#080806", borderBottom: "1px solid #1a1a14" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">TYYB Store</span>
            <h2 className="section-heading">WEAR THE<br />MOVEMENT</h2>
          </div>
          <button className="btn-primary" onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Full Store →</button>
        </div>
        <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} className="product-card">
              <div style={{ aspectRatio: "3/4", background: `linear-gradient(${150 + i * 28}deg, #111109, #1c1c13)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(110,124,95,0.12)", border: "1px solid rgba(110,124,95,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#8a9e7a", fontWeight: 900, letterSpacing: "0.1em" }}>TYYB</div>
                {p.tag && <span className="tag-pill" style={{ position: "absolute", top: 10, right: 10, fontSize: 8 }}>{p.tag}</span>}
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#8a9e7a", fontWeight: 700, marginTop: 4 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section style={{ padding: "80px 32px", borderBottom: "1px solid #1a1a14" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">Content Gallery</span>
            <h2 className="section-heading">THE<br />MOVEMENT</h2>
          </div>
          <button className="btn-outline" onClick={() => { setPage("Gallery"); window.scrollTo(0,0); }}>View All →</button>
        </div>
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {GALLERY_ITEMS.slice(0, 3).map((item, i) => (
            <div key={item.id} className="gallery-card">
              <div className="g-overlay" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${130 + i * 22}deg, #111109, #191914)` }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span className="tag-pill">{item.tag}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                  <div style={{ width: 20, height: 2, background: "#8a9e7a", marginTop: 8 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: "100px 32px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>TYYB</span>
        </div>
        <h2 style={{ fontSize: "clamp(42px, 9vw, 100px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 20 }}>
          START TODAY.<br /><span style={{ color: "#8a9e7a" }}>THIS IS IT.</span>
        </h2>
        <p style={{ fontSize: 15, opacity: 0.45, maxWidth: 440, margin: "0 auto 36px", fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
          You're at the youngest you'll ever be. The moment to move, to train, to build — it's right now.
        </p>
        <button className="btn-primary" style={{ fontSize: 14, padding: "17px 48px" }} onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Shop The Collection</button>
      </section>
    </div>
  );
}

// ── PAGE: ABOUT ────────────────────────────────────────────────────────────
function PageAbout() {
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: "80px 32px 64px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">Our Story</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 120px)", marginBottom: 48 }}>
          WHO IS<br /><span style={{ color: "#8a9e7a" }}>TYYB</span>
        </h1>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          {/* Bio photo placeholder */}
          <div style={{ aspectRatio: "3/4", background: "linear-gradient(145deg, #141410, #1e1e14)", border: "1px solid #2a2a1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", opacity: 0.2 }}>
              <div style={{ fontSize: 32 }}>◎</div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", marginTop: 8, fontWeight: 700 }}>BIO PHOTO</div>
            </div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 24 }}>
              TYYB started with a pull-up bar and a pair of running shoes. No gym, no team, no budget — just the belief that movement in any form is the foundation of everything.
            </p>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 24 }}>
              Whether it's clocking miles on the road or working the bars in the park — the brand documents real training, real progress, real failure. No highlight reel.
            </p>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 36 }}>
              The name says everything. Right now, in this moment — you are the youngest you will ever be. That's not a motivational quote. That's a reason to move today.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="tag-pill">CALISTHENICS</span>
              <span className="tag-pill">RUNNING</span>
              <span className="tag-pill">ACTIVEWEAR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars only — no stats */}
      <section style={{ padding: "80px 32px" }}>
        <span className="section-label">What We Stand For</span>
        <h2 className="section-heading" style={{ marginBottom: 48 }}>THREE<br />PRINCIPLES</h2>
        {PILLARS.map((p, i) => (
          <div key={i} className="pillar-row">
            <span style={{ fontSize: 12, fontWeight: 800, color: "#8a9e7a", opacity: 0.5, minWidth: 28 }}>{p.n}</span>
            <h3 style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, textTransform: "uppercase", flex: 1, letterSpacing: "-0.01em" }}>{p.title}</h3>
            <p style={{ fontSize: 14, opacity: 0.5, maxWidth: 320, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>{p.sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// ── PAGE: GALLERY ──────────────────────────────────────────────────────────
function PageGallery() {
  const CATS = ["All", "Running", "Training", "Progress"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === cat);
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: "80px 32px 48px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">Content Gallery</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          THE<br /><span style={{ color: "#8a9e7a" }}>MOVEMENT</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Road miles, bar sessions, track work and progress checks — all documented, all real. No filters on the grind.
        </p>
      </section>

      {/* Filter tabs */}
      <section style={{ padding: "0 32px", borderBottom: "1px solid #1a1a14", display: "flex", gap: 4 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 800,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: cat === c ? "#8a9e7a" : "#f0ede6", opacity: cat === c ? 1 : 0.4,
            padding: "14px 20px", borderBottom: cat === c ? "2px solid #8a9e7a" : "2px solid transparent",
            transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </section>

      <section style={{ padding: "40px 32px 80px" }}>
        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((item, i) => (
            <div key={item.id} className="gallery-card">
              <div className="g-overlay" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${130 + i * 22}deg, #111109, #191914)` }} />
              <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span className="tag-pill">{item.tag}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                  <div style={{ width: 20, height: 2, background: "#8a9e7a", marginTop: 8 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── PAGE: SHOP ─────────────────────────────────────────────────────────────
function PageShop() {
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: "80px 32px 48px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">TYYB Store</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          WEAR THE<br /><span style={{ color: "#8a9e7a" }}>MOVEMENT</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Kit built for every discipline. Whether you're running roads or training bars — functional, minimal, built to last.
        </p>
      </section>
      <section style={{ padding: "48px 32px 80px" }}>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} className="product-card">
              <div style={{ aspectRatio: "3/2", background: `linear-gradient(${148 + i * 25}deg, #111109, #1c1c13)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(110,124,95,0.12)", border: "1px solid rgba(110,124,95,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#8a9e7a", fontWeight: 900, letterSpacing: "0.1em" }}>TYYB</div>
                {p.tag && <span className="tag-pill" style={{ position: "absolute", top: 14, left: 14, fontSize: 8 }}>{p.tag}</span>}
              </div>
              <div style={{ padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 15, color: "#8a9e7a", fontWeight: 800 }}>{p.price}</div>
                </div>
                <button className="btn-outline" style={{ padding: "9px 20px", fontSize: 11 }}>Add →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Shopify link — no banner */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontSize: 13, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300, marginBottom: 20 }}>
            View the full catalogue including bundles and limited drops
          </p>
          <button className="btn-primary" style={{ fontSize: 13, padding: "15px 44px" }}>
            Open Full Store →
          </button>
        </div>
      </section>
    </div>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid #1a1a14", background: "#080806" }}>
      <Ticker />
      <div className="three-col" style={{ padding: "48px 32px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 8, fontFamily: "'Barlow Condensed', sans-serif" }}>TYYB</span>
            </div>
            <span style={{ fontSize: 9, letterSpacing: "0.3em", opacity: 0.4, fontWeight: 700, textTransform: "uppercase" }}>The Youngest You'll Be</span>
          </div>
          <p style={{ fontSize: 13, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>Run. Train. Move. Repeat.</p>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", fontWeight: 800, opacity: 0.4, marginBottom: 16 }}>NAVIGATE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_PAGES.map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo(0,0); }}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", color: "#f0ede6", opacity: 0.45, textTransform: "uppercase", transition: "opacity 0.2s" }}
                onMouseOver={e => e.target.style.opacity = 1}
                onMouseOut={e => e.target.style.opacity = 0.45}>{p}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", fontWeight: 800, opacity: 0.4, marginBottom: 16 }}>SOCIALS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Instagram", "TikTok", "YouTube"].map(s => (
              <span key={s} style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.45, cursor: "pointer", textTransform: "uppercase" }}>@TYYB — {s}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 32px", borderTop: "1px solid #1a1a14", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.25em", opacity: 0.25, fontWeight: 600 }}>© 2025 TYYB — THE YOUNGEST YOU'LL BE</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Shipping"].map(l => (
            <span key={l} style={{ fontSize: 10, letterSpacing: "0.2em", opacity: 0.25, cursor: "pointer", fontWeight: 600 }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function TYYBSite() {
  const [page, setPage] = useState("Home");
  const pages = {
    Home: <PageHome setPage={setPage} />,
    About: <PageAbout />,
    Gallery: <PageGallery />,
    Shop: <PageShop />,
  };
  return (
    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#0a0a08", color: "#f0ede6", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <div className="noise-overlay" />
      <Navbar page={page} setPage={setPage} />
      <main>{pages[page]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
