/* eslint-disable */
import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  { id: 1, tag: "TRAINING", week: "WEEK 24", title: "Why Muscle Ups Break Most People (And How To Fix It)", excerpt: "The muscle up isn't a strength problem. It's a timing problem. Here's the exact transition drill that changed everything.", read: "4 MIN READ" },
  { id: 2, tag: "MINDSET", week: "WEEK 23", title: "The Compound Effect Of Showing Up Every Single Day", excerpt: "Consistency beats intensity every time. One year of boring daily practice will outperform six months of heroic effort.", read: "3 MIN READ" },
  { id: 3, tag: "NUTRITION", week: "WEEK 22", title: "Eating For Calisthenics: Keep It Simple, Keep It Real", excerpt: "You don't need a meal plan. You need to stop overthinking and start fuelling movement. The basics, done properly.", read: "5 MIN READ" },
  { id: 4, tag: "TRAINING", week: "WEEK 21", title: "The Beginner's Guide To Building Your First Bar Routine", excerpt: "No gym. No excuses. Just you and a bar. Here's how to go from zero pull-ups to a full routine in 8 weeks.", read: "6 MIN READ" },
];

const WORKOUTS = [
  { week: "WK 24", title: "Pull Focused", level: "INTERMEDIATE", moves: ["10× Pull Ups", "8× Archer Rows", "5× Muscle Up Neg.", "3× L-Sit Hold 20s"], tag: "UPPER", latest: true },
  { week: "WK 23", title: "Core & Push", level: "BEGINNER", moves: ["15× Push Ups", "10× Dips", "20s Plank", "8× Pike Push Ups"], tag: "FULL BODY", latest: false },
  { week: "WK 22", title: "Ring Strength", level: "ADVANCED", moves: ["5× Ring Dips", "3× Ring MU", "10× Ring Rows", "30s Ring Support"], tag: "RINGS", latest: false },
];

const GALLERY_ITEMS = [
  { id: 1, label: "Pull Day", tag: "TRAINING", cat: "Training" },
  { id: 2, label: "Ring Work", tag: "CALISTHENICS", cat: "Skills" },
  { id: 3, label: "Morning Flow", tag: "ROUTINE", cat: "Training" },
  { id: 4, label: "Muscle Up", tag: "SKILL", cat: "Skills" },
  { id: 5, label: "Core Series", tag: "STRENGTH", cat: "Training" },
  { id: 6, label: "Planche Prog.", tag: "PROGRESS", cat: "Progress" },
  { id: 7, label: "Bar Circuit", tag: "TRAINING", cat: "Training" },
  { id: 8, label: "Handstand Work", tag: "SKILL", cat: "Skills" },
  { id: 9, label: "Weekly Check In", tag: "PROGRESS", cat: "Progress" },
];

const NAV_PAGES = ["Home", "About", "Blog", "Gallery", "Shop", "Enquire"];

// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a08; }
  ::-webkit-scrollbar { width: 3px; background: #0a0a08; }
  ::-webkit-scrollbar-thumb { background: #d4ff00; }

  .nav-link {
    color: #f0ede6; text-decoration: none; font-size: 12px;
    font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    opacity: 0.5; transition: opacity 0.2s, color 0.2s;
    cursor: pointer; background: none; border: none; font-family: 'Barlow Condensed', sans-serif;
  }
  .nav-link:hover { opacity: 1; }
  .nav-link.active { opacity: 1; color: #d4ff00; }

  .btn-primary {
    background: #d4ff00; color: #0a0a08;
    border: none; padding: 15px 36px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 800;
    letter-spacing: 0.22em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .btn-primary:hover { background: #f0ede6; transform: scale(1.03); }

  .btn-outline {
    background: transparent; color: #f0ede6;
    border: 1px solid rgba(240,237,230,0.25);
    padding: 13px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: #d4ff00; color: #d4ff00; }

  .tag-pill {
    font-size: 9px; font-weight: 800; letter-spacing: 0.18em;
    color: #d4ff00; background: rgba(212,255,0,0.08);
    padding: 4px 10px; border: 1px solid rgba(212,255,0,0.22);
    text-transform: uppercase; display: inline-block;
  }

  .section-label {
    font-size: 10px; letter-spacing: 0.35em; color: #d4ff00;
    font-weight: 800; text-transform: uppercase; margin-bottom: 10px; display: block;
  }
  .section-heading {
    font-size: clamp(36px, 6vw, 72px); font-weight: 900;
    text-transform: uppercase; line-height: 0.92; letter-spacing: -0.01em;
  }

  .card-hover {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .card-hover:hover { transform: translateY(-5px); border-color: #d4ff00 !important; }

  .noise-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .ticker-track {
    display: flex; gap: 60px; animation: ticker 18s linear infinite;
    white-space: nowrap;
  }
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .quick-nav-card {
    border: 1px solid #1e1e18; background: #0e0e0b;
    padding: 28px 24px; cursor: pointer;
    transition: border-color 0.3s, transform 0.3s, background 0.3s;
    display: flex; flex-direction: column; gap: 12px;
  }
  .quick-nav-card:hover {
    border-color: #d4ff00; transform: translateY(-6px);
    background: rgba(212,255,0,0.03);
  }

  .blog-card {
    border: 1px solid #1e1e18; background: #0e0e0b;
    padding: 28px; cursor: pointer;
    transition: border-color 0.3s, transform 0.3s;
    position: relative; overflow: hidden;
  }
  .blog-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: #d4ff00; transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s ease;
  }
  .blog-card:hover { border-color: #d4ff00; transform: translateY(-4px); }
  .blog-card:hover::before { transform: scaleX(1); }

  .gallery-card {
    background: #111109; border: 1px solid #1a1a14;
    position: relative; overflow: hidden; cursor: pointer;
    transition: transform 0.3s, border-color 0.3s;
    aspect-ratio: 4/5;
  }
  .gallery-card:hover { transform: translateY(-5px); border-color: #d4ff00; }
  .gallery-card:hover .g-overlay { opacity: 1; }
  .g-overlay {
    position: absolute; inset: 0; background: rgba(212,255,0,0.06);
    opacity: 0; transition: opacity 0.3s;
  }

  .workout-card {
    border: 1px solid #1e1e18; background: #0e0e0b; overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
  }
  .workout-card:hover { border-color: #d4ff00; transform: translateY(-4px); }

  .dl-btn {
    background: transparent; color: #d4ff00; border: 1px solid #d4ff00;
    padding: 11px 20px; font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 800; letter-spacing: 0.2em;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s; width: 100%;
  }
  .dl-btn:hover { background: #d4ff00; color: #0a0a08; }
  .dl-btn.done { background: rgba(212,255,0,0.08); color: rgba(212,255,0,0.6); border-color: rgba(212,255,0,0.2); cursor: default; }

  .email-input {
    background: #111109; border: 1px solid #2a2a22; border-right: none;
    color: #f0ede6; padding: 14px 20px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 14px;
    outline: none; flex: 1; transition: border-color 0.2s;
  }
  .email-input:focus { border-color: #d4ff00; }
  .email-input::placeholder { opacity: 0.3; letter-spacing: 0.1em; font-size: 12px; }

  .stat-block { text-align: center; }
  .stat-num { font-size: clamp(40px, 7vw, 80px); font-weight: 900; line-height: 1; }
  .stat-lbl { font-size: 10px; letter-spacing: 0.3em; opacity: 0.4; font-weight: 700; margin-top: 4px; }

  .pillar-row {
    border-top: 1px solid #222; padding: 28px 0;
    display: flex; align-items: center; gap: 32px; flex-wrap: wrap;
    transition: border-color 0.3s;
  }
  .pillar-row:hover { border-top-color: #d4ff00; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mob-menu-btn { display: flex !important; }
    .quick-nav-grid { grid-template-columns: 1fr 1fr !important; }
    .blog-grid { grid-template-columns: 1fr !important; }
    .gallery-grid-3 { grid-template-columns: 1fr 1fr !important; }
    .workout-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── NAVBAR ────────────────────────────────────────────────────────────────────
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
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, padding: "0 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,8,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid #1a1a14" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      {/* Logo */}
      <div onClick={() => go("Home")} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 9, letterSpacing: "0.04em", fontFamily: "'Barlow Condensed', sans-serif" }}>TYYB</span>
        </div>
        <span style={{ fontSize: 10, letterSpacing: "0.28em", fontWeight: 700, opacity: 0.4, fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
          The Youngest You'll Be
        </span>
      </div>

      {/* Desktop links */}
      <div className="desktop-nav" style={{ display: "flex", gap: 28 }}>
        {NAV_PAGES.map(p => (
          <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => go(p)}>{p}</button>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 11 }} onClick={() => go("Shop")}>Shop</button>
        {/* Hamburger */}
        <button className="mob-menu-btn" onClick={() => setMob(!mob)} style={{
          display: "none", flexDirection: "column", gap: 5,
          background: "none", border: "none", cursor: "pointer", padding: 4,
        }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2, background: "#f0ede6" }} />)}
        </button>
      </div>

      {/* Mobile menu */}
      {mob && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: "rgba(10,10,8,0.98)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid #1a1a14",
          padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_PAGES.map(p => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`}
              style={{ fontSize: 20, textAlign: "left" }} onClick={() => go(p)}>{p}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────
function Ticker() {
  const words = ["THE YOUNGEST YOU'LL BE", "CALISTHENICS", "MOVE FREELY", "BODY WEIGHT", "AUTHENTIC GEAR", "TRAIN DAILY", "NO EXCUSES"];
  const repeated = [...words, ...words];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid #1a1a14", borderBottom: "1px solid #1a1a14", padding: "12px 0", background: "#080806" }}>
      <div className="ticker-track">
        {repeated.map((w, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.3em", color: i % 2 === 0 ? "#f0ede6" : "#d4ff00", opacity: i % 2 === 0 ? 0.4 : 1 }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── PAGE: HOME ────────────────────────────────────────────────────────────────
function PageHome({ setPage }) {
  const QUICK_NAV = [
    { label: "About", icon: "◎", sub: "The story behind TYYB" },
    { label: "Blog", icon: "≡", sub: "Weekly knowledge drops" },
    { label: "Gallery", icon: "⊞", sub: "Movement captured" },
    { label: "Shop", icon: "◈", sub: "Wear the movement" },
    { label: "Enquire", icon: "→", sub: "Work with us" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 32px 72px",
        background: `
          radial-gradient(ellipse 55% 45% at 75% 35%, rgba(212,255,0,0.05) 0%, transparent 65%),
          radial-gradient(ellipse 35% 55% at 15% 75%, rgba(255,255,255,0.02) 0%, transparent 55%),
          #0a0a08
        `,
        position: "relative",
      }}>
        {/* Vertical label */}
        <div style={{
          position: "absolute", right: 32, top: "50%",
          transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center",
          fontSize: 9, letterSpacing: "0.4em", fontWeight: 700, opacity: 0.25, textTransform: "uppercase",
        }}>CALISTHENICS — AUTHENTIC — EST. 2024</div>

        <div>
          <span className="tag-pill" style={{ marginBottom: 20, display: "inline-block" }}>New Collection 2025</span>
          <h1 style={{
            fontSize: "clamp(72px, 17vw, 170px)", fontWeight: 900,
            textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.025em",
            marginBottom: 28,
          }}>
            <span style={{ display: "block", animation: "slideUp 0.5s 0.1s both" }}>THE</span>
            <span style={{ display: "block", color: "#d4ff00", animation: "slideUp 0.5s 0.2s both" }}>YOUNGEST</span>
            <span style={{ display: "block", animation: "slideUp 0.5s 0.3s both" }}>YOU'LL BE</span>
          </h1>
          {/* Welcome statement */}
          <p style={{
            fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300,
            opacity: 0.55, maxWidth: 480, lineHeight: 1.75, marginBottom: 36,
            animation: "slideUp 0.5s 0.4s both",
          }}>
            A calisthenics brand built on body weight, simplicity, and authenticity. 
            You're at the youngest you'll ever be — the moment to move is right now.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "slideUp 0.5s 0.5s both" }}>
            <button className="btn-primary" onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Shop The Drop</button>
            <button className="btn-outline" onClick={() => { setPage("About"); window.scrollTo(0,0); }}>Our Story</button>
          </div>
        </div>
        <style>{`@keyframes slideUp { from { transform:translateY(50px); opacity:0; } to { transform:translateY(0); opacity:1; } }`}</style>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* WELCOME / INTRO */}
      <section style={{ padding: "80px 32px", borderBottom: "1px solid #1a1a14" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="section-label">Welcome To TYYB</span>
            <h2 className="section-heading" style={{ marginBottom: 24 }}>
              MOVEMENT<br />IS THE<br />MESSAGE
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.6, lineHeight: 1.85, marginBottom: 20 }}>
              TYYB was built on one idea: that the body you have right now is enough to start. No gym membership. No excuses. Just movement, consistency, and gear that keeps up with you.
            </p>
            <p style={{ fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.6, lineHeight: 1.85 }}>
              Every week we drop new content, new programmes, and new kit — all rooted in calisthenics and the belief that progress is a daily practice.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section style={{ padding: "80px 32px", background: "#080806" }}>
        <span className="section-label">Explore</span>
        <h2 className="section-heading" style={{ marginBottom: 40 }}>WHERE TO<br />GO NEXT</h2>
        <div className="quick-nav-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {QUICK_NAV.map(n => (
            <div key={n.label} className="quick-nav-card" onClick={() => { setPage(n.label); window.scrollTo(0,0); }}>
              <span style={{ fontSize: 22, opacity: 0.5 }}>{n.icon}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{n.label}</div>
                <div style={{ fontSize: 12, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300, marginTop: 4 }}>{n.sub}</div>
              </div>
              <div style={{ width: 20, height: 2, background: "#d4ff00" }} />
            </div>
          ))}
        </div>
      </section>

      {/* LATEST BLOG PREVIEW */}
      <section style={{ padding: "80px 32px", borderTop: "1px solid #1a1a14" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">TYYB Journal</span>
            <h2 className="section-heading">LATEST<br />KNOWLEDGE</h2>
          </div>
          <button className="btn-outline" onClick={() => { setPage("Blog"); window.scrollTo(0,0); }}>All Posts →</button>
        </div>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {BLOG_POSTS.slice(0, 2).map(post => (
            <div key={post.id} className="blog-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span className="tag-pill">{post.tag}</span>
                <span style={{ fontSize: 9, opacity: 0.35, letterSpacing: "0.2em", fontWeight: 700 }}>{post.week}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12 }}>{post.title}</h3>
              <p style={{ fontSize: 13, opacity: 0.5, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7, marginBottom: 20 }}>{post.excerpt}</p>
              <span style={{ fontSize: 11, color: "#d4ff00", fontWeight: 800, letterSpacing: "0.15em" }}>READ →</span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP TEASER */}
      <section style={{ padding: "80px 32px", background: "#080806", borderTop: "1px solid #1a1a14" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">TYYB Store</span>
            <h2 className="section-heading">WEAR THE<br />MOVEMENT</h2>
          </div>
          <button className="btn-primary" onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Full Store →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {["Training Tee", "Calis Shorts", "TYYB Hoodie", "Grip Socks"].map((name, i) => (
            <div key={i} className="card-hover" style={{ border: "1px solid #1e1e18", background: "#0e0e0b", overflow: "hidden" }}>
              <div style={{
                aspectRatio: "3/4", background: `linear-gradient(${150 + i * 28}deg, #111109, #1c1c13)`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(212,255,0,0.07)", border: "1px solid rgba(212,255,0,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, color: "#d4ff00", fontWeight: 900, letterSpacing: "0.1em",
                }}>TYYB</div>
                <span className="tag-pill" style={{ position: "absolute", top: 10, right: 10, fontSize: 8 }}>NEW</span>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>{name}</div>
                <div style={{ fontSize: 13, color: "#d4ff00", fontWeight: 700, marginTop: 4 }}>£35.00</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ padding: "100px 32px", textAlign: "center", borderTop: "1px solid #1a1a14" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", margin: "0 auto 28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>TYYB</span>
        </div>
        <h2 style={{ fontSize: "clamp(42px, 9vw, 100px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 20 }}>
          START TODAY.<br /><span style={{ color: "#d4ff00" }}>THIS IS IT.</span>
        </h2>
        <p style={{ fontSize: 15, opacity: 0.45, maxWidth: 440, margin: "0 auto 36px", fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
          You're at the youngest you'll ever be. The moment to move, to train, to build — it's right now.
        </p>
        <button className="btn-primary" style={{ fontSize: 14, padding: "17px 48px" }} onClick={() => { setPage("Shop"); window.scrollTo(0,0); }}>Shop The Collection</button>
      </section>
    </div>
  );
}

// ── PAGE: ABOUT ───────────────────────────────────────────────────────────────
function PageAbout() {
  const PILLARS = [
    { n: "01", title: "BODY WEIGHT", sub: "Master your own weight. No machines, no excuses. Your body is the gym." },
    { n: "02", title: "SIMPLICITY", sub: "Strip everything back. The basics done brilliantly, every single day." },
    { n: "03", title: "AUTHENTIC", sub: "Real progress, real people, real gear. No filters on the work." },
  ];
  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{
        padding: "80px 32px 64px",
        background: "linear-gradient(180deg, #0d0d0a 0%, #0a0a08 100%)",
        borderBottom: "1px solid #1a1a14",
      }}>
        <span className="section-label">Our Story</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 120px)", marginBottom: 40 }}>
          WHO IS<br /><span style={{ color: "#d4ff00" }}>TYYB</span>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            {/* Bio image placeholder */}
            <div style={{
              aspectRatio: "3/4", background: "linear-gradient(145deg, #141410, #1e1e14)",
              border: "1px solid #2a2a1e", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ textAlign: "center", opacity: 0.2 }}>
                <div style={{ fontSize: 32 }}>◎</div>
                <div style={{ fontSize: 10, letterSpacing: "0.3em", marginTop: 8, fontWeight: 700 }}>BIO PHOTO</div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 8 }}>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 24 }}>
              TYYB started with a single idea and a pull-up bar. No gym, no team, no budget — just the belief that body weight training is one of the purest forms of movement there is.
            </p>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 24 }}>
              The brand grew out of the content — documenting real sessions, real progress, real failure. No highlight reel. Just the grind, filmed and shared with people who get it.
            </p>
            <p style={{ fontSize: 17, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.65, lineHeight: 1.85, marginBottom: 36 }}>
              The name says everything. Right now, in this moment — you are the youngest you will ever be. That's not a motivational quote. That's a reason to start today.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <span className="tag-pill">CALISTHENICS</span>
              <span className="tag-pill">STREET TRAINING</span>
              <span className="tag-pill">BODY WEIGHT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: "80px 32px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">What We Stand For</span>
        <h2 className="section-heading" style={{ marginBottom: 48 }}>THREE<br />PRINCIPLES</h2>
        {PILLARS.map((p, i) => (
          <div key={i} className="pillar-row">
            <span style={{ fontSize: 12, fontWeight: 800, color: "#d4ff00", opacity: 0.5, minWidth: 28 }}>{p.n}</span>
            <h3 style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, textTransform: "uppercase", flex: 1, letterSpacing: "-0.01em" }}>{p.title}</h3>
            <p style={{ fontSize: 14, opacity: 0.5, maxWidth: 320, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>{p.sub}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section style={{ padding: "80px 32px", background: "#080806" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {[["3+", "YEARS TRAINING"], ["100+", "VIDEOS POSTED"], ["FREE", "WEEKLY WORKOUTS"], ["1", "CORE PHILOSOPHY"]].map(([n, l]) => (
            <div key={l} className="stat-block" style={{ borderTop: "1px solid #2a2a22", paddingTop: 28 }}>
              <div className="stat-num">{n}</div>
              <div className="stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── PAGE: BLOG ────────────────────────────────────────────────────────────────
function PageBlog() {
  const [expanded, setExpanded] = useState(null);
  const [dlWeek, setDlWeek] = useState(null);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Header */}
      <section style={{ padding: "80px 32px 64px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">TYYB Journal</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          WEEKLY<br /><span style={{ color: "#d4ff00" }}>KNOWLEDGE</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Training insights, mindset pieces, and nutrition basics — dropped every week. No fluff, no filler. Just what actually works.
        </p>
      </section>

      {/* Blog grid */}
      <section style={{ padding: "64px 32px", borderBottom: "1px solid #1a1a14" }}>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="blog-card" onClick={() => setExpanded(expanded === post.id ? null : post.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span className="tag-pill">{post.tag}</span>
                <span style={{ fontSize: 9, opacity: 0.35, letterSpacing: "0.2em", fontWeight: 700 }}>{post.week}</span>
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: 14 }}>{post.title}</h3>
              <p style={{ fontSize: 14, opacity: 0.5, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.75, marginBottom: 20 }}>{post.excerpt}</p>
              {expanded === post.id && (
                <div style={{ borderTop: "1px solid #2a2a22", paddingTop: 18, marginBottom: 18 }}>
                  <p style={{ fontSize: 14, opacity: 0.6, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.85 }}>
                    Full article content loads here. In the live build this connects to a CMS — your mate writes and publishes posts himself, no code needed.
                  </p>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 10, opacity: 0.3, letterSpacing: "0.2em", fontWeight: 700 }}>{post.read}</span>
                <span style={{ fontSize: 11, color: "#d4ff00", fontWeight: 800, letterSpacing: "0.15em" }}>{expanded === post.id ? "CLOSE ↑" : "READ →"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workout Downloads */}
      <section style={{ padding: "80px 32px", background: "#080806", borderBottom: "1px solid #1a1a14" }}>
        <div style={{ marginBottom: 40 }}>
          <span className="section-label">Free Every Monday</span>
          <h2 className="section-heading" style={{ marginBottom: 14 }}>WORKOUT<br />DOWNLOADS</h2>
          <p style={{ fontSize: 14, opacity: 0.45, fontFamily: "'Barlow', sans-serif", fontWeight: 300, maxWidth: 440, lineHeight: 1.75 }}>
            A new calisthenics programme every week. Download as a PDF — screenshot it, share it, just move.
          </p>
        </div>
        <div className="workout-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
          {WORKOUTS.map((w, i) => (
            <div key={i} className="workout-card">
              <div style={{
                padding: "18px 20px 14px",
                borderBottom: "1px solid #1a1a14",
                background: w.latest ? "rgba(212,255,0,0.04)" : "transparent",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#d4ff00", fontWeight: 800, marginBottom: 6 }}>
                    {w.week}{w.latest ? " — LATEST" : ""}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase" }}>{w.title}</div>
                </div>
                <span className="tag-pill">{w.tag}</span>
              </div>
              <div style={{ padding: "14px 20px 18px" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.25em", opacity: 0.35, fontWeight: 700, marginBottom: 14 }}>{w.level}</div>
                {w.moves.map((m, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "7px 0", borderBottom: j < w.moves.length - 1 ? "1px solid #1a1a14" : "none",
                  }}>
                    <div style={{ width: 4, height: 4, background: "#d4ff00", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontFamily: "'Barlow', sans-serif", fontWeight: 400, opacity: 0.65 }}>{m}</span>
                  </div>
                ))}
                <div style={{ marginTop: 18 }}>
                  <button className={`dl-btn ${dlWeek === i ? "done" : ""}`} onClick={() => setDlWeek(i)}>
                    {dlWeek === i ? "✓ SAVED" : "↓ DOWNLOAD PDF"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div style={{ padding: "36px 40px", border: "1px solid #2a2a22", background: "rgba(212,255,0,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, textTransform: "uppercase", marginBottom: 6 }}>Never Miss A Drop</div>
            <p style={{ fontSize: 13, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>New workout PDF every Monday. Free forever.</p>
          </div>
          {subbed ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#d4ff00" }} />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", color: "#d4ff00" }}>YOU'RE IN — SEE YOU MONDAY</span>
            </div>
          ) : (
            <div style={{ display: "flex", flex: 1, minWidth: 260, maxWidth: 400 }}>
              <input className="email-input" type="email" placeholder="YOUR EMAIL" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="btn-primary" style={{ clipPath: "none", padding: "14px 22px", fontSize: 12, flexShrink: 0 }} onClick={() => { if (email.includes("@")) setSubbed(true); }}>JOIN</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ── PAGE: GALLERY ─────────────────────────────────────────────────────────────
function PageGallery() {
  const CATS = ["All", "Training", "Skills", "Progress"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === cat);

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Header */}
      <section style={{ padding: "80px 32px 48px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">Content Gallery</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          THE<br /><span style={{ color: "#d4ff00" }}>MOVEMENT</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Real sessions, real progress. Everything documented from bar work to ring strength — unfiltered, unedited.
        </p>
      </section>

      {/* Filter */}
      <section style={{ padding: "32px 32px 0", borderBottom: "1px solid #1a1a14", display: "flex", gap: 4 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12,
            fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: cat === c ? "#d4ff00" : "#f0ede6",
            opacity: cat === c ? 1 : 0.4,
            padding: "10px 20px",
            borderBottom: cat === c ? "2px solid #d4ff00" : "2px solid transparent",
            transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </section>

      {/* Grid */}
      <section style={{ padding: "40px 32px 80px" }}>
        <div className="gallery-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((item, i) => (
            <div key={item.id} className="gallery-card">
              <div className="g-overlay" />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(${130 + i * 22}deg, #111109, #191914)`,
              }} />
              <div style={{
                position: "absolute", inset: 0, padding: 18,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <span className="tag-pill">{item.tag}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item.label}</div>
                  <div style={{ width: 20, height: 2, background: "#d4ff00", marginTop: 8 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.3 }}>
            <div style={{ fontSize: 14, letterSpacing: "0.3em", fontWeight: 700 }}>NO CONTENT YET</div>
          </div>
        )}
      </section>
    </div>
  );
}

// ── PAGE: SHOP ────────────────────────────────────────────────────────────────
function PageShop() {
  const PRODUCTS = [
    { name: "Training Tee", price: "£35", tag: "BESTSELLER" },
    { name: "Calis Shorts", price: "£45", tag: "NEW" },
    { name: "TYYB Hoodie", price: "£65", tag: "NEW" },
    { name: "Grip Socks", price: "£12", tag: null },
    { name: "Bar Bag", price: "£28", tag: null },
    { name: "Logo Cap", price: "£22", tag: null },
  ];
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: "80px 32px 48px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">TYYB Store</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          WEAR THE<br /><span style={{ color: "#d4ff00" }}>MOVEMENT</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Kit built for movement. Every piece designed around how you actually train — functional, minimal, built to last.
        </p>
      </section>
      <section style={{ padding: "48px 32px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PRODUCTS.map((p, i) => (
            <div key={i} className="card-hover" style={{ border: "1px solid #1e1e18", background: "#0e0e0b", overflow: "hidden" }}>
              <div style={{
                aspectRatio: "3/4", background: `linear-gradient(${148 + i * 25}deg, #111109, #1c1c13)`,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(212,255,0,0.07)", border: "1px solid rgba(212,255,0,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "#d4ff00", fontWeight: 900, letterSpacing: "0.1em",
                }}>TYYB</div>
                {p.tag && <span className="tag-pill" style={{ position: "absolute", top: 12, left: 12, fontSize: 8 }}>{p.tag}</span>}
              </div>
              <div style={{ padding: "18px" }}>
                <div style={{ fontSize: 16, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 15, color: "#d4ff00", fontWeight: 800 }}>{p.price}</div>
                  <button className="btn-outline" style={{ padding: "7px 16px", fontSize: 10 }}>Add →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: "24px 28px", border: "1px solid #1e1e18", background: "rgba(212,255,0,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", opacity: 0.4, fontWeight: 700, marginBottom: 4 }}>POWERED BY</div>
            <div style={{ fontSize: 18, fontWeight: 900 }}>SHOPIFY</div>
          </div>
          <p style={{ fontSize: 13, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300, maxWidth: 380, lineHeight: 1.65 }}>
            Full inventory, payments, and fulfilment handled through Shopify. Your store, your control.
          </p>
          <button className="btn-outline">Open Full Store</button>
        </div>
      </section>
    </div>
  );
}

// ── PAGE: ENQUIRE ─────────────────────────────────────────────────────────────
function PageEnquire() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ padding: "80px 32px 48px", borderBottom: "1px solid #1a1a14" }}>
        <span className="section-label">Get In Touch</span>
        <h1 className="section-heading" style={{ fontSize: "clamp(52px, 10vw, 110px)", marginBottom: 20 }}>
          WORK WITH<br /><span style={{ color: "#d4ff00" }}>TYYB</span>
        </h1>
        <p style={{ fontSize: 15, fontFamily: "'Barlow', sans-serif", fontWeight: 300, opacity: 0.5, maxWidth: 480, lineHeight: 1.8 }}>
          Collaborations, press, wholesale, or just a conversation — drop a message and we'll get back to you within 48 hours.
        </p>
      </section>
      <section style={{ padding: "64px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        {sent ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, textTransform: "uppercase", marginBottom: 12 }}>Message Sent</h2>
            <p style={{ fontSize: 14, opacity: 0.5, fontFamily: "'Barlow', sans-serif" }}>We'll be in touch within 48 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[["Name", "name", "text", "YOUR NAME"], ["Email", "email", "email", "YOUR EMAIL"], ["Subject", "subject", "text", "WHAT'S THIS ABOUT"]].map(([label, key, type, ph]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, letterSpacing: "0.25em", fontWeight: 800, opacity: 0.5, marginBottom: 8 }}>{label.toUpperCase()}</div>
                  <input type={type} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)}
                    style={{
                      width: "100%", background: "#0e0e0b", border: "1px solid #2a2a22",
                      color: "#f0ede6", padding: "14px 18px", fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 14, outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#d4ff00"}
                    onBlur={e => e.target.style.borderColor = "#2a2a22"}
                  />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.25em", fontWeight: 800, opacity: 0.5, marginBottom: 8 }}>MESSAGE</div>
                <textarea placeholder="YOUR MESSAGE" rows={6} value={form.message} onChange={e => set("message", e.target.value)}
                  style={{
                    width: "100%", background: "#0e0e0b", border: "1px solid #2a2a22",
                    color: "#f0ede6", padding: "14px 18px", fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 14, outline: "none", resize: "vertical", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#d4ff00"}
                  onBlur={e => e.target.style.borderColor = "#2a2a22"}
                />
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start", fontSize: 13, padding: "15px 40px" }}
                onClick={() => { if (form.name && form.email && form.message) setSent(true); }}>
                Send Message →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[["Collabs & Partnerships", "Brands, creators, and athletes — let's build something together."], ["Press & Media", "Coverage, features, and interviews welcome."], ["Wholesale", "Interested in stocking TYYB? Get in touch."]].map(([t, s]) => (
                <div key={t} style={{ borderTop: "1px solid #1e1e18", paddingTop: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>{t}</div>
                  <div style={{ fontSize: 13, opacity: 0.45, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>{s}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid #1a1a14", background: "#080806" }}>
      <Ticker />
      <div style={{ padding: "48px 32px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#0a0a08", fontWeight: 900, fontSize: 8, fontFamily: "'Barlow Condensed', sans-serif" }}>TYYB</span>
            </div>
            <span style={{ fontSize: 9, letterSpacing: "0.3em", opacity: 0.4, fontWeight: 700, textTransform: "uppercase" }}>The Youngest You'll Be</span>
          </div>
          <p style={{ fontSize: 13, opacity: 0.4, fontFamily: "'Barlow', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>Calisthenics. Simplicity. Authentic movement.</p>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", fontWeight: 800, opacity: 0.4, marginBottom: 16 }}>NAVIGATE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_PAGES.map(p => (
              <button key={p} onClick={() => { setPage(p); window.scrollTo(0,0); }} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", color: "#f0ede6", opacity: 0.45, textTransform: "uppercase", transition: "opacity 0.2s" }}
                onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.45}>{p}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", fontWeight: 800, opacity: 0.4, marginBottom: 16 }}>SOCIALS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Instagram", "TikTok", "YouTube"].map(s => (
              <span key={s} style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.45, cursor: "pointer", textTransform: "uppercase" }}>@TYYB — {s}</span>
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

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function TYYBSite() {
  const [page, setPage] = useState("Home");

  const pages = {
    Home: <PageHome setPage={setPage} />,
    About: <PageAbout />,
    Blog: <PageBlog />,
    Gallery: <PageGallery />,
    Shop: <PageShop />,
    Enquire: <PageEnquire />,
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