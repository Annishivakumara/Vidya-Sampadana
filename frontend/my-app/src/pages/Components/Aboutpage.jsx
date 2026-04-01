import { useState, useEffect } from "react";

// ── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
// Same images from your assets folder
import logoImg     from "../../assets/images/logo.png";
import campaignImg from "../../assets/images/2026-campaigns.jpeg";
import chethanImg  from "../../assets/images/chethan-2026.jpeg";
import rakeshaImg  from "../../assets/images/rakesha.jpeg";
import shivuImg    from "../../assets/images/shivu.jpeg";

const NAV_LINKS = ["Home", "About", "Features", "Admissions", "Contact"];

const TIMELINE = [
    {
        year: "2021",
        title: "The Problem We Saw",
        desc: "Government colleges across Karnataka were still managing thousands of students through paper registers, Excel sheets, and manual phone calls to parents. Data was lost. Time was wasted.",
        icon: "🔍",
    },
    {
        year: "2022",
        title: "First Prototype Built",
        desc: "A small team of developers and educators built the first version of Vidya Sampadana — a simple student admission form that auto-generated reports.",
        icon: "🛠️",
    },
    {
        year: "2023",
        title: "Pilot in 10 Colleges",
        desc: "We launched with 10 PU colleges in Davanagere district. 4,200 students digitised. Principals saved 6+ hours per week on admin work.",
        icon: "🚀",
    },
    {
        year: "2024",
        title: "KCET Counselling Integration",
        desc: "Added KCET verification, exam score tracking, and counselling session management. Real classroom sessions conducted across 50+ institutions.",
        icon: "🎓",
    },
    {
        year: "2025",
        title: "500+ Institutions Onboarded",
        desc: "Vidya Sampadana grew to serve 500+ schools and colleges. AI-powered analytics module launched. Parent Connect feature went live.",
        icon: "📈",
    },
    {
        year: "2026",
        title: "Building the Future",
        desc: "Today we're expanding to every district of Karnataka — building the most trusted student management platform for Indian education.",
        icon: "🌟",
    },
];

const VALUES = [
    {
        icon: "🤝",
        color: "#f59e0b",
        title: "Trust First",
        desc: "Every feature we build is designed to earn and maintain the trust of students, parents, and institutions.",
    },
    {
        icon: "🇮🇳",
        color: "#34d399",
        title: "Built for India",
        desc: "We understand the unique challenges of Indian education — government processes, regional languages, limited connectivity.",
    },
    {
        icon: "📖",
        color: "#60a5fa",
        title: "Education Above All",
        desc: "We exist to free educators from admin burden so they can focus on what matters — teaching.",
    },
    {
        icon: "🔒",
        color: "#a78bfa",
        title: "Data Dignity",
        desc: "Student data is sacred. We never sell, share, or misuse any personal information stored on our platform.",
    },
];

const TEAM = [
    {
        img: chethanImg,
        name: "Chethan K.",
        role: "Co-Founder & Product Lead",
        bio: "Former teacher turned technologist. 8 years in Karnataka's PU education system before building Vidya Sampadana.",
    },
    {
        img: rakeshaImg,
        name: "Rakesha M.",
        role: "Head of Partnerships",
        bio: "Connects colleges and government bodies across Karnataka. Fluent in Kannada, Telugu, and the language of institutional trust.",
    },
    {
        img: shivuImg,
        name: "Shivu R.",
        role: "Lead Engineer",
        bio: "Built the core platform from scratch. Passionate about making complex systems feel simple for non-technical users.",
    },
];

const IMPACT = [
    { value: "10K+",  label: "Students Managed",    icon: "👨‍🎓" },
    { value: "500+",  label: "Institutions",         icon: "🏫" },
    { value: "98%",   label: "Satisfaction Rate",    icon: "⭐" },
    { value: "6hrs",  label: "Saved Per Week/Admin", icon: "⏱️" },
];

export default function AboutPage() {
    const [scrolled,      setScrolled]      = useState(false);
    const [menuOpen,      setMenuOpen]      = useState(false);
    const [activeVal,     setActiveVal]     = useState(null);
    const [activeTeam,    setActiveTeam]    = useState(null);
    const [visibleItems,  setVisibleItems]  = useState(new Set());

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Staggered timeline reveal on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set([...prev, entry.target.dataset.index]));
                    }
                });
            },
            { threshold: 0.2 }
        );
        document.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={styles.root}>
            {/* ── BACKGROUND ── */}
            <div style={styles.bgGrid} />
            <div style={styles.bgGlow1} />
            <div style={styles.bgGlow2} />
            <div style={styles.bgGlow3} />

            {/* ── NAV ── */}
            <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
                <div style={styles.navInner}>
                    <img
                        src={logoImg}
                        alt="VidyaSampadana"
                        style={styles.logoImg}
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div style={styles.logoFallback}>
                        <span style={styles.logoAccent}>V</span>idya
                        <span style={styles.logoAccent}>S</span>ampadana
                    </div>
                    <div style={styles.navLinks}>
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l}
                                href="#"
                                style={{ ...styles.navLink, ...(l === "About" ? styles.navLinkActive : {}) }}
                                onClick={(e) => e.preventDefault()}
                            >
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
                            <a key={l} href="#" style={styles.mobileLink}
                               onClick={(e) => e.preventDefault()}>{l}</a>
                        ))}
                        <button style={styles.mobileCta}>Get Started</button>
                    </div>
                )}
            </nav>

            {/* ── HERO ── */}
            <section style={styles.hero}>
                <div style={styles.heroBadge}>
                    <span style={styles.heroBadgeDot} />
                    Our Story
                </div>
                <h1 style={styles.heroTitle}>
                    We believe every student
                    <br />
                    <span style={styles.heroGradient}>deserves a digital future</span>
                </h1>
                <p style={styles.heroSub}>
                    Vidya Sampadana was born out of frustration with paper registers and lost
                    student records. We are a team of educators and technologists who believe
                    Indian government schools deserve world-class management tools.
                </p>

                {/* Hero split image layout */}
                <div style={styles.heroImages}>
                    <div style={styles.heroImgMain}>
                        <img src={campaignImg} alt="Institution team" style={styles.heroImgMainPhoto} />
                        <div style={styles.heroImgMainOverlay}>
                            <div style={styles.heroImgLabel}>Our First Campus Visit · Davanagere, 2023</div>
                        </div>
                    </div>
                    <div style={styles.heroImgStack}>
                        <div style={styles.heroImgSmall}>
                            <img src={chethanImg} alt="Classroom session" style={styles.heroImgSmallPhoto} />
                        </div>
                        <div style={styles.heroImgSmall}>
                            <img src={shivuImg} alt="KPSE session" style={styles.heroImgSmallPhoto} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── IMPACT NUMBERS ── */}
            <section style={styles.impactSection}>
                {IMPACT.map((item) => (
                    <div key={item.label} style={styles.impactItem}>
                        <div style={styles.impactIcon}>{item.icon}</div>
                        <div style={styles.impactValue}>{item.value}</div>
                        <div style={styles.impactLabel}>{item.label}</div>
                    </div>
                ))}
            </section>

            {/* ── MISSION ── */}
            <section style={styles.missionSection}>
                <div style={styles.missionLeft}>
                    <div style={styles.sectionTag}>Our Mission</div>
                    <h2 style={styles.missionTitle}>
                        Digitise every
                        <span style={styles.missionAccent}> government school</span>
                        {" "}in Karnataka
                    </h2>
                    <p style={styles.missionText}>
                        Over 4,000 government pre-university colleges in Karnataka still rely on
                        manual processes. Lost fee receipts. Missed parent notifications. Exam
                        scores buried in registers nobody reads.
                    </p>
                    <p style={styles.missionText}>
                        We are on a mission to give every public school institution the same
                        quality of student management tools that elite private institutions take
                        for granted — at a price that doesn't exclude anyone.
                    </p>
                    <div style={styles.missionQuote}>
                        <div style={styles.missionQuoteMark}>"</div>
                        <div style={styles.missionQuoteText}>
                            When a student's record is lost, more than data is lost — their
                            opportunity is lost too.
                        </div>
                    </div>
                </div>
                <div style={styles.missionRight}>
                    <img src={rakeshaImg} alt="Classroom presentation" style={styles.missionImg} />
                    <div style={styles.missionImgBadge}>
                        <span style={{ fontSize: "20px" }}>🏆</span>
                        <div>
                            <div style={styles.missionImgBadgeTitle}>Recognized by</div>
                            <div style={styles.missionImgBadgeSub}>Dept. of Education, Karnataka</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section style={styles.valuesSection}>
                <div style={styles.sectionTag}>What We Stand For</div>
                <h2 style={styles.sectionTitle}>Our Core Values</h2>
                <p style={styles.sectionSub}>
                    These aren't words on a wall. They're decisions we make every day.
                </p>
                <div style={styles.valuesGrid}>
                    {VALUES.map((v, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.valueCard,
                                ...(activeVal === i ? {
                                    ...styles.valueCardHover,
                                    borderColor: v.color + "44",
                                    background: v.color + "0d",
                                } : {}),
                            }}
                            onMouseEnter={() => setActiveVal(i)}
                            onMouseLeave={() => setActiveVal(null)}
                        >
                            <div style={{ ...styles.valueIconWrap, background: v.color + "18", border: `1px solid ${v.color}33` }}>
                                <span style={styles.valueIcon}>{v.icon}</span>
                            </div>
                            <div style={styles.valueTitle}>{v.title}</div>
                            <div style={styles.valueDesc}>{v.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section style={styles.timelineSection}>
                <div style={styles.sectionTag}>Our Journey</div>
                <h2 style={styles.sectionTitle}>How We Got Here</h2>
                <p style={styles.sectionSub}>
                    From a frustrated teacher's notebook to 500+ institutions — the real story.
                </p>

                <div style={styles.timeline}>
                    {/* Center line */}
                    <div style={styles.timelineLine} />

                    {TIMELINE.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        const isVisible = visibleItems.has(String(i));
                        return (
                            <div
                                key={i}
                                data-index={i}
                                style={{
                                    ...styles.timelineRow,
                                    flexDirection: isLeft ? "row" : "row-reverse",
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? "translateY(0)"
                                        : isLeft ? "translateX(-30px)" : "translateX(30px)",
                                    transition: `all 0.6s ease ${i * 0.1}s`,
                                }}
                            >
                                <div style={styles.timelineContent}>
                                    <div style={styles.timelineYear}>{item.year}</div>
                                    <div style={styles.timelineCard}>
                                        <div style={styles.timelineIcon}>{item.icon}</div>
                                        <div style={styles.timelineTitle}>{item.title}</div>
                                        <div style={styles.timelineDesc}>{item.desc}</div>
                                    </div>
                                </div>
                                <div style={styles.timelineDot}>
                                    <div style={styles.timelineDotInner} />
                                </div>
                                <div style={styles.timelineSpacer} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── TEAM ── */}
            <section style={styles.teamSection}>
                <div style={styles.sectionTag}>The People Behind It</div>
                <h2 style={styles.sectionTitle}>Our Team</h2>
                <p style={styles.sectionSub}>
                    Educators, engineers, and institution-builders who've lived the problem.
                </p>
                <div style={styles.teamGrid}>
                    {TEAM.map((member, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.teamCard,
                                ...(activeTeam === i ? styles.teamCardActive : {}),
                            }}
                            onMouseEnter={() => setActiveTeam(i)}
                            onMouseLeave={() => setActiveTeam(null)}
                        >
                            <div style={styles.teamImgWrap}>
                                <img src={member.img} alt={member.name} style={styles.teamImg} />
                                <div style={styles.teamImgOverlay} />
                            </div>
                            <div style={styles.teamInfo}>
                                <div style={styles.teamName}>{member.name}</div>
                                <div style={styles.teamRole}>{member.role}</div>
                                <div style={styles.teamBio}>{member.bio}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={styles.ctaBanner}>
                <div style={styles.ctaBannerGlow} />
                <div style={styles.ctaEmoji}>🏫</div>
                <h2 style={styles.ctaTitle}>Be part of the change</h2>
                <p style={styles.ctaSub}>
                    Whether you're a school, a teacher, or just someone who believes in
                    better education — we'd love to hear from you.
                </p>
                <div style={styles.ctaButtons}>
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
                        Partner With Us →
                    </button>
                    <button
                        style={styles.btnOutline}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                        Contact the Team
                    </button>
                </div>
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
const styles = {
    root: {
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#0c1520",
        color: "#f0ece4",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
    },

    // ── BACKGROUND ──
    bgGrid: {
        position: "fixed", inset: 0,
        backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none", zIndex: 0,
    },
    bgGlow1: {
        position: "fixed", top: "-20%", left: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
    },
    bgGlow2: {
        position: "fixed", bottom: "-20%", right: "-10%",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
    },
    bgGlow3: {
        position: "fixed", top: "40%", left: "40%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
    },

    // ── NAV ──
    nav: {
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100, padding: "16px 0", transition: "all 0.3s ease",
    },
    navScrolled: {
        background: "rgba(12,21,32,0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(245,158,11,0.15)",
        padding: "12px 0",
    },
    navInner: {
        maxWidth: "1200px", margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", gap: "32px",
    },
    logoImg: {
        height: "44px", width: "auto", objectFit: "contain",
        marginRight: "auto", filter: "brightness(1.1)",
    },
    logoFallback: {
        display: "none", fontSize: "22px", fontWeight: "700",
        letterSpacing: "-0.5px", marginRight: "auto", color: "#f0ece4",
    },
    logoAccent: { color: "#f59e0b" },
    navLinks: { display: "flex", gap: "28px" },
    navLink: {
        color: "rgba(240,236,228,0.65)",
        textDecoration: "none", fontSize: "14px",
        letterSpacing: "0.3px", transition: "color 0.2s",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    navLinkActive: {
        color: "#f59e0b",
        borderBottom: "2px solid #f59e0b",
        paddingBottom: "2px",
    },
    navCta: {
        background: "#f59e0b", color: "#0c1520", border: "none",
        padding: "10px 22px", borderRadius: "6px", fontSize: "13px",
        fontWeight: "700", cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.3px", flexShrink: 0,
    },
    hamburger: {
        display: "none", background: "none", border: "none",
        color: "#f0ece4", fontSize: "20px", cursor: "pointer",
    },
    mobileMenu: {
        display: "flex", flexDirection: "column", padding: "16px 32px", gap: "12px",
        background: "rgba(12,21,32,0.98)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
    },
    mobileLink: {
        color: "rgba(240,236,228,0.7)", textDecoration: "none",
        fontSize: "15px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    mobileCta: {
        background: "#f59e0b", color: "#0c1520", border: "none",
        padding: "12px", borderRadius: "6px", fontSize: "14px",
        fontWeight: "700", cursor: "pointer", marginTop: "8px",
    },

    // ── HERO ──
    hero: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto",
        padding: "140px 32px 80px",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
    },
    heroBadge: {
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
        color: "#f59e0b", padding: "6px 16px", borderRadius: "100px",
        fontSize: "12px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.5px", marginBottom: "28px",
    },
    heroBadgeDot: {
        width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b",
    },
    heroTitle: {
        fontSize: "clamp(38px, 6vw, 68px)", fontWeight: "800",
        lineHeight: "1.08", letterSpacing: "-2px", margin: "0 0 20px", color: "#f0ece4",
    },
    heroGradient: {
        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 40%, #34d399 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    },
    heroSub: {
        fontSize: "17px", lineHeight: "1.75", color: "rgba(240,236,228,0.6)",
        maxWidth: "620px", margin: "0 0 48px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: "400",
    },

    // Hero images grid
    heroImages: {
        display: "flex", gap: "16px", width: "100%", maxWidth: "900px",
        height: "380px",
    },
    heroImgMain: {
        flex: "1.6", position: "relative", borderRadius: "16px", overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.2)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
    },
    heroImgMainPhoto: {
        width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
        display: "block",
    },
    heroImgMainOverlay: {
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(12,21,32,0.85))",
        padding: "32px 20px 16px",
    },
    heroImgLabel: {
        fontSize: "12px", color: "rgba(240,236,228,0.7)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.3px",
    },
    heroImgStack: {
        flex: "1", display: "flex", flexDirection: "column", gap: "16px",
    },
    heroImgSmall: {
        flex: 1, borderRadius: "12px", overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    },
    heroImgSmallPhoto: {
        width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
        display: "block",
    },

    // ── IMPACT NUMBERS ──
    impactSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto 80px", padding: "0 32px",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1px", background: "rgba(245,158,11,0.1)",
        borderRadius: "16px", overflow: "hidden",
        border: "1px solid rgba(245,158,11,0.15)",
    },
    impactItem: {
        background: "#0c1520", padding: "36px 24px", textAlign: "center",
    },
    impactIcon: { fontSize: "28px", marginBottom: "10px" },
    impactValue: {
        fontSize: "38px", fontWeight: "800", color: "#f59e0b",
        letterSpacing: "-1px", lineHeight: 1, marginBottom: "6px",
    },
    impactLabel: {
        fontSize: "12px", color: "rgba(240,236,228,0.45)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        letterSpacing: "0.5px", textTransform: "uppercase",
    },

    // ── MISSION ──
    missionSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto 100px", padding: "0 32px",
        display: "flex", gap: "60px", alignItems: "center",
    },
    missionLeft: { flex: "1 1 55%" },
    missionRight: { flex: "1 1 45%", position: "relative" },
    sectionTag: {
        display: "inline-block", color: "#f59e0b", fontSize: "11px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: "700",
        letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px",
        padding: "6px 16px", border: "1px solid rgba(245,158,11,0.3)",
        borderRadius: "100px", background: "rgba(245,158,11,0.07)",
    },
    missionTitle: {
        fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800",
        letterSpacing: "-1px", margin: "0 0 24px", color: "#f0ece4", lineHeight: "1.2",
    },
    missionAccent: { color: "#34d399" },
    missionText: {
        fontSize: "15px", color: "rgba(240,236,228,0.6)", lineHeight: "1.8",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: "0 0 20px",
    },
    missionQuote: {
        display: "flex", gap: "16px", alignItems: "flex-start",
        marginTop: "32px", padding: "20px 24px",
        background: "rgba(245,158,11,0.06)", borderLeft: "3px solid #f59e0b",
        borderRadius: "0 8px 8px 0",
    },
    missionQuoteMark: {
        fontSize: "48px", color: "#f59e0b", lineHeight: "0.8",
        fontFamily: "Georgia, serif", flexShrink: 0,
    },
    missionQuoteText: {
        fontSize: "15px", color: "rgba(240,236,228,0.8)",
        fontFamily: "Georgia, serif", fontStyle: "italic", lineHeight: "1.65",
    },
    missionImg: {
        width: "100%", borderRadius: "16px", objectFit: "cover",
        height: "360px", objectPosition: "center",
        border: "1px solid rgba(245,158,11,0.2)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        display: "block",
    },
    missionImgBadge: {
        position: "absolute", bottom: "-16px", right: "-16px",
        background: "rgba(12,21,32,0.95)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(52,211,153,0.3)",
        borderRadius: "12px", padding: "14px 18px",
        display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    },
    missionImgBadgeTitle: {
        fontSize: "11px", color: "rgba(240,236,228,0.5)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    missionImgBadgeSub: {
        fontSize: "13px", fontWeight: "700", color: "#34d399",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", marginTop: "2px",
    },

    // ── VALUES ──
    valuesSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto 100px", padding: "0 32px", textAlign: "center",
    },
    sectionTitle: {
        fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "800",
        letterSpacing: "-1.5px", margin: "0 0 16px", color: "#f0ece4",
    },
    sectionSub: {
        fontSize: "16px", color: "rgba(240,236,228,0.5)",
        marginBottom: "56px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    valuesGrid: {
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px",
    },
    valueCard: {
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px", padding: "28px 22px", textAlign: "left",
        cursor: "default", transition: "all 0.25s ease",
    },
    valueCardHover: { transform: "translateY(-4px)", boxShadow: "0 16px 48px rgba(0,0,0,0.3)" },
    valueIconWrap: {
        width: "52px", height: "52px", borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "16px",
    },
    valueIcon:  { fontSize: "24px" },
    valueTitle: {
        fontSize: "16px", fontWeight: "700", color: "#f0ece4",
        marginBottom: "10px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    valueDesc: {
        fontSize: "13px", color: "rgba(240,236,228,0.5)",
        lineHeight: "1.65", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },

    // ── TIMELINE ──
    timelineSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1000px", margin: "0 auto 100px", padding: "0 32px", textAlign: "center",
    },
    timeline: { position: "relative", marginTop: "60px" },
    timelineLine: {
        position: "absolute", left: "50%", top: 0, bottom: 0,
        width: "2px", background: "linear-gradient(to bottom, transparent, rgba(245,158,11,0.4), rgba(52,211,153,0.4), transparent)",
        transform: "translateX(-50%)",
    },
    timelineRow: {
        display: "flex", alignItems: "flex-start", marginBottom: "48px",
        position: "relative",
    },
    timelineContent: { flex: 1, padding: "0 32px" },
    timelineSpacer: { flex: 1 },
    timelineYear: {
        fontSize: "11px", fontWeight: "700", color: "#f59e0b",
        letterSpacing: "2px", textTransform: "uppercase",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        marginBottom: "8px",
    },
    timelineCard: {
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px", padding: "20px 22px", textAlign: "left",
        transition: "all 0.3s ease",
    },
    timelineIcon: { fontSize: "24px", marginBottom: "10px" },
    timelineTitle: {
        fontSize: "16px", fontWeight: "700", color: "#f0ece4",
        marginBottom: "8px", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    timelineDesc: {
        fontSize: "13px", color: "rgba(240,236,228,0.55)",
        lineHeight: "1.65", fontFamily: "'Helvetica Neue', Arial, sans-serif",
    },
    timelineDot: {
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        width: "20px", height: "20px", borderRadius: "50%",
        background: "rgba(245,158,11,0.15)", border: "2px solid #f59e0b",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: "4px", zIndex: 2, flexShrink: 0,
    },
    timelineDotInner: {
        width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b",
    },

    // ── TEAM ──
    teamSection: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto 100px", padding: "0 32px", textAlign: "center",
    },
    teamGrid: {
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
    },
    teamCard: {
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", overflow: "hidden", cursor: "default",
        transition: "all 0.3s ease", textAlign: "left",
    },
    teamCardActive: {
        border: "1px solid rgba(245,158,11,0.3)", transform: "translateY(-6px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
    },
    teamImgWrap: { position: "relative", height: "240px", overflow: "hidden" },
    teamImg: {
        width: "100%", height: "100%", objectFit: "cover",
        objectPosition: "center top", display: "block",
        transition: "transform 0.4s ease",
    },
    teamImgOverlay: {
        position: "absolute", inset: 0,
        background: "linear-gradient(transparent 50%, rgba(12,21,32,0.7))",
    },
    teamInfo: { padding: "20px 22px 24px" },
    teamName: {
        fontSize: "17px", fontWeight: "700", color: "#f0ece4",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", marginBottom: "4px",
    },
    teamRole: {
        fontSize: "12px", color: "#f59e0b",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: "600", letterSpacing: "0.5px",
        textTransform: "uppercase", marginBottom: "12px",
    },
    teamBio: {
        fontSize: "13px", color: "rgba(240,236,228,0.55)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", lineHeight: "1.65",
    },

    // ── CTA ──
    ctaBanner: {
        position: "relative", zIndex: 1,
        maxWidth: "1200px", margin: "0 auto 80px", padding: "80px 32px",
        textAlign: "center", background: "rgba(245,158,11,0.05)",
        border: "1px solid rgba(245,158,11,0.15)", borderRadius: "24px", overflow: "hidden",
    },
    ctaBannerGlow: {
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: "600px", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
    },
    ctaEmoji: { fontSize: "48px", marginBottom: "16px", position: "relative" },
    ctaTitle: {
        fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800",
        letterSpacing: "-1px", margin: "0 0 16px", color: "#f0ece4", position: "relative",
    },
    ctaSub: {
        fontSize: "16px", color: "rgba(240,236,228,0.5)", marginBottom: "40px",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", position: "relative",
        maxWidth: "500px", margin: "0 auto 40px",
    },
    ctaButtons: {
        display: "flex", gap: "16px", justifyContent: "center",
        flexWrap: "wrap", position: "relative",
    },
    btnPrimary: {
        background: "#f59e0b", color: "#0c1520", border: "none",
        padding: "16px 32px", borderRadius: "8px", fontSize: "15px",
        fontWeight: "800", cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "0.3px",
        boxShadow: "0 4px 24px rgba(245,158,11,0.3)", transition: "all 0.2s ease",
    },
    btnOutline: {
        background: "transparent", color: "#f0ece4",
        border: "1px solid rgba(240,236,228,0.25)",
        padding: "16px 32px", borderRadius: "8px", fontSize: "15px",
        fontWeight: "600", cursor: "pointer",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", transition: "all 0.2s ease",
    },

    // ── FOOTER ──
    footer: {
        position: "relative", zIndex: 1, textAlign: "center",
        padding: "40px 32px", borderTop: "1px solid rgba(245,158,11,0.12)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
    },
    footerLogoImg: {
        height: "36px", width: "auto", objectFit: "contain",
        marginBottom: "4px", filter: "brightness(1.1)",
    },
    footerLogo: { fontSize: "18px", fontWeight: "700", color: "#f0ece4" },
    footerText: {
        fontSize: "13px", color: "rgba(240,236,228,0.35)",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: 0,
    },
};