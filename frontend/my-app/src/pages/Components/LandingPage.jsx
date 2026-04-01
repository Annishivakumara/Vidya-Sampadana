import { useState, useEffect } from "react";

// ── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
// Place all images inside: src/assets/images/
// Then import like this:
import logoImg       from "../../assets/images/logo.png";
import campaignImg   from "../../assets/images/2026-campaigns.jpeg";
import chethanImg    from "../../assets/images/chethan-2026.jpeg";
import rakeshaImg    from "../../assets/images/rakesha.jpeg";
import shivuImg      from "../../assets/images/shivu.jpeg";

const NAV_LINKS = ["Home", "About", "Features", "Admissions", "Contact"];

const FEATURES = [
    { icon: "🎓", title: "Student Management",   desc: "Complete student lifecycle from admission to graduation with smart tracking." },
    { icon: "📊", title: "Academic Analytics",   desc: "Real-time performance dashboards and exam score analysis for every student." },
    { icon: "👨‍👩‍👧", title: "Parent Connect",      desc: "Keep parents informed with instant updates on attendance and progress." },
    { icon: "📍", title: "Address & Profile",    desc: "Manage complete student profiles including addresses and contact details." },
    { icon: "📝", title: "Exam Scoring",         desc: "Auto-calculate percentages and ranks across subjects and exam types." },
    { icon: "🔒", title: "Secure & Scalable",    desc: "Enterprise-grade security with role-based access across your institution." },
];

const STATS = [
    { value: "10K+", label: "Students Enrolled" },
    { value: "98%",  label: "Satisfaction Rate"  },
    { value: "500+", label: "Institutions"       },
    { value: "24/7", label: "Support"            },
];

// Testimonials using your real classroom images
const TESTIMONIALS = [
    {
        img: chethanImg,
        quote: "Vidya Sampadana transformed how we handle student admissions — from weeks of paperwork to minutes of digital flow.",
        name: "Chethan K.",
        role: "Academic Coordinator",
    },
    {
        img: rakeshaImg,
        quote: "Our teachers spend less time on admin and more time teaching. The platform pays for itself in productivity alone.",
        name: "Rakesha M.",
        role: "Principal, Govt. PU College",
    },
    {
        img: shivuImg,
        quote: "KCET counselling sessions are now backed by real data. Students get the right guidance at the right time.",
        name: "Shivu R.",
        role: "Counselling Head",
    },
];

export default function LandingPage() {
    const [scrolled,       setScrolled]       = useState(false);
    const [menuOpen,       setMenuOpen]       = useState(false);
    const [activeFeature,  setActiveFeature]  = useState(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={styles.root}>
            {/* ── BACKGROUND ── */}
            <div style={styles.bgGrid} />
            <div style={styles.bgGlow1} />
            <div style={styles.bgGlow2} />

            {/* ── NAV ── */}
            <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
                <div style={styles.navInner}>
                    {/* LOGO IMAGE — replaces text logo */}
                    <img
                        src={logoImg}
                        alt="VidyaSampadana Logo"
                        style={styles.logoImg}
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                    {/* Fallback text logo shown if image fails */}
                    <div style={styles.logo}>
                        <span style={styles.logoAccent}>V</span>idya
                        <span style={styles.logoAccent}>S</span>ampadana
                    </div>

                    <div style={styles.navLinks}>
                        {NAV_LINKS.map((l) => (
                            <a key={l}
                               href={`/${l.toLowerCase()}`}
                               style={styles.navLink}
                               onClick={(e) => e.preventDefault()}>
                                {l}
                            </a>

                        ))}
                    </div>
                    <button style={styles.navCta}>Get Started</button>
                    <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {menuOpen && (
                    <div style={styles.mobileMenu}>
                        {NAV_LINKS.map((l) => (
                            <a key={l}
                               href={`/${l.toLowerCase()}`}
                               style={styles.mobileLink}
                               onClick={(e) => e.preventDefault()}>{l}</a>
                        ))}
                        <button style={styles.mobileCta}>Get Started</button>
                    </div>
                )}
            </nav>

            {/* ── HERO ── */}
            <section style={styles.hero}>
                {/* Left: text content */}
                <div style={styles.heroLeft}>
                    <div style={styles.heroBadge}>
                        <span style={styles.heroBadgeDot} />
                        Trusted by 500+ Karnataka Institutions
                    </div>
                    <h1 style={styles.heroTitle}>
                        Empower Every
                        <br />
                        <span style={styles.heroGradient}>Student's Journey</span>
                    </h1>
                    <p style={styles.heroSub}>
                        Vidya Sampadana is a next-generation student management platform
                        built for modern educational institutions — seamless, smart, and
                        beautifully simple.
                    </p>
                    <div style={styles.heroCtas}>
                        <button
                            style={styles.btnPrimary}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,158,11,0.5)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(245,158,11,0.3)";
                            }}
                        >
                            Register a Student →
                        </button>
                        <button
                            style={styles.btnOutline}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                            View Demo
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div style={styles.trustBadges}>
                        <div style={styles.trustBadge}>✅ Govt. Approved</div>
                        <div style={styles.trustBadge}>🛡️ Data Secure</div>
                        <div style={styles.trustBadge}>🇮🇳 Made for India</div>
                    </div>
                </div>

                {/* Right: REAL institution photo */}
                <div style={styles.heroRight}>
                    <div style={styles.heroImgWrapper}>
                        <img
                            src={campaignImg}
                            alt="Institution staff and students"
                            style={styles.heroImg}
                        />
                        {/* Floating trust card over image */}
                        <div style={styles.heroFloatCard}>
                            <div style={styles.heroFloatIcon}>🏫</div>
                            <div>
                                <div style={styles.heroFloatTitle}>Real Institutions</div>
                                <div style={styles.heroFloatSub}>Karnataka-wide deployment</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section style={styles.statsSection}>
                {STATS.map((s) => (
                    <div key={s.label} style={styles.statItem}>
                        <div style={styles.statValue}>{s.value}</div>
                        <div style={styles.statLabel}>{s.label}</div>
                    </div>
                ))}
            </section>

            {/* ── FEATURES ── */}
            <section style={styles.featuresSection}>
                <div style={styles.sectionTag}>Features</div>
                <h2 style={styles.sectionTitle}>Everything your institution needs</h2>
                <p style={styles.sectionSub}>
                    One platform to manage students, academics, parents, and performance.
                </p>
                <div style={styles.featuresGrid}>
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.featureCard,
                                ...(activeFeature === i ? styles.featureCardActive : {}),
                            }}
                            onMouseEnter={() => setActiveFeature(i)}
                            onMouseLeave={() => setActiveFeature(null)}
                        >
                            <div style={styles.featureIcon}>{f.icon}</div>
                            <div style={styles.featureTitle}>{f.title}</div>
                            <div style={styles.featureDesc}>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TESTIMONIALS (Real classroom photos) ── */}
            <section style={styles.testimonialsSection}>
                <div style={styles.sectionTag}>Trusted By Educators</div>
                <h2 style={styles.sectionTitle}>Hear from the field</h2>
                <p style={styles.sectionSub}>
                    Real educators. Real classrooms. Real results across Karnataka.
                </p>

                <div style={styles.testimonialsGrid}>
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.testimonialCard,
                                ...(activeTestimonial === i ? styles.testimonialCardActive : {}),
                            }}
                            onClick={() => setActiveTestimonial(i)}
                        >
                            <img
                                src={t.img}
                                alt={t.name}
                                style={styles.testimonialImg}
                            />
                            <div style={styles.testimonialQuoteMark}>"</div>
                            <p style={styles.testimonialQuote}>{t.quote}</p>
                            <div style={styles.testimonialAuthor}>
                                <div style={styles.testimonialName}>{t.name}</div>
                                <div style={styles.testimonialRole}>{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div style={styles.testimonialDots}>
                    {TESTIMONIALS.map((_, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.dot,
                                ...(activeTestimonial === i ? styles.dotActive : {}),
                            }}
                            onClick={() => setActiveTestimonial(i)}
                        />
                    ))}
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section style={styles.ctaBanner}>
                <div style={styles.ctaBannerGlow} />
                <h2 style={styles.ctaTitle}>Ready to transform your institution?</h2>
                <p style={styles.ctaSub}>Join 500+ schools already using Vidya Sampadana.</p>
                <button
                    style={styles.btnPrimary}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 12px 40px rgba(245,158,11,0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(245,158,11,0.3)";
                    }}
                >
                    Start Free Today →
                </button>
            </section>

            {/* ── FOOTER ── */}
            <footer style={styles.footer}>
                <img
                    src={logoImg}
                    alt="VidyaSampadana"
                    style={styles.footerLogoImg}
                    onError={(e) => { e.target.style.display = "none"; }}
                />
                <div style={styles.footerLogo}>
                    <span style={styles.logoAccent}>V</span>idya
                    <span style={styles.logoAccent}>S</span>ampadana
                </div>
                <p style={styles.footerText}>
                    © 2026 VidyaSampadana. Built with ❤️ for Indian education.
                </p>
            </footer>
        </div>
    );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
// Color palette — Trust-worthy Indian Education
// Navy  #0f1b2d  — Authority, trust, depth
// Saffron #f59e0b — Indian identity, warmth, CTA
// Emerald #059669 — Growth, worth, positivity
// Cream  #fefce8  — Clarity, clean, readable

const styles = {
    root: {
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#0c1520",          // deep navy (trust)
        color: "#f0ece4",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
    },

    // ── BACKGROUND ──
    bgGrid: {
        position: "fixed",
        inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0,
    },
    bgGlow1: {
        position: "fixed",
        top: "-20%",
        left: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", // saffron glow
        pointerEvents: "none",
        zIndex: 0,
    },
    bgGlow2: {
        position: "fixed",
        bottom: "-20%",
        right: "-10%",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)",  // emerald glow
        pointerEvents: "none",
        zIndex: 0,
    },

    // ── NAV ──
    nav: {
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "16px 0",
        transition: "all 0.3s ease",
    },
    navScrolled: {
        background: "rgb(14 25 44 / 0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245,158,11,0.15)",
        padding: "12px 0",
    },
    navInner: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        gap: "32px",
    },
    logoImg: {
        height: "44px",
        width: "auto",
        objectFit: "contain",
        marginRight: "auto",
        // If logo.png is dark/invisible on dark background,
        // add: filter: "brightness(0) invert(1)"
        filter: "brightness(1.1)",
    },
    logo: {
        display: "none", // shown only if logoImg fails via onError
        fontSize: "22px",
        fontWeight: "700",
        letterSpacing: "-0.5px",
        marginRight: "auto",
        color: "#f0ece4",
    },
    logoAccent: { color: "#f59e0b" },
    navLinks: { display: "flex", gap: "28px" },
    navLink: {
        color: "rgba(240,236,228,0.65)",
        textDecoration: "none",
        fontSize: "14px",
        letterSpacing: "0.3px",
        transition: "color 0.2s",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    navCta: {
        background: "#f59e0b",          // saffron CTA
        color: "#0c1520",
        border: "none",
        padding: "10px 22px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: "700",
        cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.3px",
        flexShrink: 0,
    },
    hamburger: {
        display: "none",
        background: "none",
        border: "none",
        color: "#f0ece4",
        fontSize: "20px",
        cursor: "pointer",
    },
    mobileMenu: {
        display: "flex",
        flexDirection: "column",
        padding: "16px 32px",
        gap: "12px",
        background: "rgba(12,21,32,0.98)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
    },
    mobileLink: {
        color: "rgba(240,236,228,0.7)",
        textDecoration: "none",
        fontSize: "15px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    mobileCta: {
        background: "#f59e0b",
        color: "#0c1520",
        border: "none",
        padding: "12px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        marginTop: "8px",
    },

    // ── HERO (two-column layout) ──
    hero: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "140px 32px 80px",
        display: "flex",
        alignItems: "center",
        gap: "60px",
    },
    heroLeft: {
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
    },
    heroRight: {
        flex: "1 1 50%",
        display: "flex",
        justifyContent: "center",
    },

    heroBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(5,150,105,0.12)",         // emerald — trust/worth
        border: "1px solid rgba(5,150,105,0.3)",
        color: "#34d399",
        padding: "6px 16px",
        borderRadius: "100px",
        fontSize: "12px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.5px",
        marginBottom: "28px",
    },
    heroBadgeDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#34d399",
    },
    heroTitle: {
        fontSize: "clamp(40px, 6vw, 72px)",
        fontWeight: "800",
        lineHeight: "1.08",
        letterSpacing: "-2px",
        margin: "0 0 20px",
        color: "#f0ece4",
    },
    heroGradient: {
        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #34d399 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroSub: {
        fontSize: "17px",
        lineHeight: "1.7",
        color: "rgba(240,236,228,0.6)",
        maxWidth: "500px",
        margin: "0 0 36px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: "400",
    },
    heroCtas: {
        display: "flex",
        gap: "16px",
        marginBottom: "32px",
        flexWrap: "wrap",
    },
    btnPrimary: {
        background: "#f59e0b",              // saffron — main CTA
        color: "#0c1520",
        border: "none",
        padding: "16px 32px",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "800",
        cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.3px",
        boxShadow: "0 4px 24px rgba(245,158,11,0.3)",
        transition: "all 0.2s ease",
    },
    btnOutline: {
        background: "transparent",
        color: "#f0ece4",
        border: "1px solid rgba(240,236,228,0.25)",
        padding: "16px 32px",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        transition: "all 0.2s ease",
    },

    // Trust badges below CTA buttons
    trustBadges: {
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
    },
    trustBadge: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(240,236,228,0.7)",
        padding: "6px 14px",
        borderRadius: "6px",
        fontSize: "12px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.3px",
    },

    // Hero image (campaign photo)
    heroImgWrapper: {
        position: "relative",
        width: "100%",
        maxWidth: "520px",
    },
    heroImg: {
        width: "100%",
        borderRadius: "20px",
        objectFit: "cover",
        height: "380px",
        border: "1px solid rgba(245,158,11,0.2)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.1)",
    },
    // Floating card overlaid on the institution photo
    heroFloatCard: {
        position: "absolute",
        bottom: "-20px",
        left: "-20px",
        background: "rgba(12,21,32,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(245,158,11,0.25)",
        borderRadius: "12px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    },
    heroFloatIcon: { fontSize: "28px" },
    heroFloatTitle: {
        fontSize: "13px",
        fontWeight: "700",
        color: "#f0ece4",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    heroFloatSub: {
        fontSize: "11px",
        color: "rgba(240,236,228,0.5)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        marginTop: "2px",
    },

    // ── STATS ──
    statsSection: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "60px auto 80px",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1px",
        background: "rgba(245,158,11,0.12)",   // saffron dividers
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.15)",
    },
    statItem: {
        background: "#0c1520",
        padding: "40px 24px",
        textAlign: "center",
    },
    statValue: {
        fontSize: "42px",
        fontWeight: "800",
        color: "#f59e0b",                       // saffron numbers — worth/value
        letterSpacing: "-1px",
        lineHeight: 1,
        marginBottom: "8px",
    },
    statLabel: {
        fontSize: "13px",
        color: "rgba(240,236,228,0.45)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
    },

    // ── FEATURES ──
    featuresSection: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto 100px",
        padding: "0 32px",
        textAlign: "center",
    },
    sectionTag: {
        display: "inline-block",
        color: "#f59e0b",
        fontSize: "11px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "16px",
        padding: "6px 16px",
        border: "1px solid rgba(245,158,11,0.3)",
        borderRadius: "100px",
        background: "rgba(245,158,11,0.07)",
    },
    sectionTitle: {
        fontSize: "clamp(28px, 4.5vw, 48px)",
        fontWeight: "800",
        letterSpacing: "-1.5px",
        margin: "0 0 16px",
        color: "#f0ece4",
    },
    sectionSub: {
        fontSize: "16px",
        color: "rgba(240,236,228,0.5)",
        marginBottom: "56px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
    },
    featureCard: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "32px 28px",
        textAlign: "left",
        cursor: "default",
        transition: "all 0.25s ease",
    },
    featureCardActive: {
        background: "rgba(5,150,105,0.07)",     // emerald on hover — growth/worth
        border: "1px solid rgba(5,150,105,0.25)",
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
    },
    featureIcon:  { fontSize: "32px", marginBottom: "16px" },
    featureTitle: {
        fontSize: "17px",
        fontWeight: "700",
        color: "#f0ece4",
        marginBottom: "10px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    featureDesc: {
        fontSize: "14px",
        color: "rgba(240,236,228,0.5)",
        lineHeight: "1.65",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },

    // ── TESTIMONIALS ──
    testimonialsSection: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto 100px",
        padding: "0 32px",
        textAlign: "center",
    },
    testimonialsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "32px",
    },
    testimonialCard: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "left",
    },
    testimonialCardActive: {
        border: "1px solid rgba(245,158,11,0.35)",
        background: "rgba(245,158,11,0.05)",
        transform: "translateY(-4px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    },
    testimonialImg: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        objectPosition: "center top",
        display: "block",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    testimonialQuoteMark: {
        fontSize: "48px",
        color: "#f59e0b",
        lineHeight: "1",
        padding: "16px 20px 0",
        fontFamily: "Georgia, serif",
    },
    testimonialQuote: {
        fontSize: "14px",
        color: "rgba(240,236,228,0.7)",
        lineHeight: "1.65",
        padding: "0 20px 16px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        margin: 0,
    },
    testimonialAuthor: {
        padding: "12px 20px 20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    testimonialName: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#f59e0b",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    testimonialRole: {
        fontSize: "12px",
        color: "rgba(240,236,228,0.45)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        marginTop: "2px",
    },
    testimonialDots: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
    },
    dot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    dotActive: {
        background: "#f59e0b",
        width: "24px",
        borderRadius: "4px",
    },

    // ── CTA BANNER ──
    ctaBanner: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto 80px",
        padding: "80px 32px",
        textAlign: "center",
        background: "rgba(245,158,11,0.05)",
        border: "1px solid rgba(245,158,11,0.15)",
        borderRadius: "24px",
        overflow: "hidden",
    },
    ctaBannerGlow: {
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
    },
    ctaTitle: {
        fontSize: "clamp(28px, 4vw, 44px)",
        fontWeight: "800",
        letterSpacing: "-1px",
        margin: "0 0 16px",
        color: "#f0ece4",
        position: "relative",
    },
    ctaSub: {
        fontSize: "16px",
        color: "rgba(240,236,228,0.5)",
        marginBottom: "40px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        position: "relative",
    },

    // ── FOOTER ──
    footer: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "40px 32px",
        borderTop: "1px solid rgba(245,158,11,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
    },
    footerLogoImg: {
        height: "36px",
        width: "auto",
        objectFit: "contain",
        marginBottom: "4px",
        filter: "brightness(1.1)",
    },
    footerLogo: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#f0ece4",
    },
    footerText: {
        fontSize: "13px",
        color: "rgba(240,236,228,0.35)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        margin: 0,
    },
};