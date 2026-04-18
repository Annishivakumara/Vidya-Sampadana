import React, { useState, useEffect } from "react";
import "./NeetUpdates.css";

const CATEGORIES = ["ALL", "ADMIT_CARD", "RESULT", "SYLLABUS", "CUTOFF", "COUNSELLING", "EXAM_DATE", "ANSWER_KEY", "GENERAL" ];

const CATEGORY_LABELS = {
  ALL: "All", ADMIT_CARD: "Admit Card", RESULT: "Result",
  SYLLABUS: "Syllabus", CUTOFF: "Cut Off", COUNSELLING: "Counselling",
  EXAM_DATE: "Exam Date", ANSWER_KEY: "Answer Key", GENERAL: "General",
};

const CATEGORY_COLORS = {
  ADMIT_CARD: "#2563eb", RESULT: "#16a34a", SYLLABUS: "#9333ea",
  CUTOFF: "#ea580c", COUNSELLING: "#0891b2", EXAM_DATE: "#dc2626",
  ANSWER_KEY: "#ca8a04", GENERAL: "#6b7280",
};

const MOCK_TOPPERS = [
  { name: "Priya Sharma", score: 715, rank: 3, state: "Rajasthan", img: "https://i.pravatar.cc/150?img=47" },
  { name: "Arjun Mehta", score: 710, rank: 8, state: "Maharashtra", img: "https://i.pravatar.cc/150?img=11" },
  { name: "Sneha Iyer", score: 708, rank: 12, state: "Tamil Nadu", img: "https://i.pravatar.cc/150?img=48" },
  { name: "Rohit Verma", score: 705, rank: 17, state: "Uttar Pradesh", img: "https://i.pravatar.cc/150?img=15" },
];

function timeAgo(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NeetUpdates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    fetch("http://localhost:8084/api/neet-updates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => { setUpdates(data); setLoading(false); })
      .catch((err) => { console.error(err); setError("Unable to load updates."); setLoading(false); });
  }, []);

  const filtered = updates.filter((u) => activeCategory === "ALL" || u.category === activeCategory);
  const pinned = filtered.filter((u) => u.isPinned);
  const regular = filtered.filter((u) => !u.isPinned);

  return (
    <div className="nu-page">
      <section className="nu-hero">
        <div className="nu-hero-badge">Official Updates</div>
        <h1 className="nu-hero-title">NEET Updates <span>2025</span></h1>
        <p className="nu-hero-sub">Stay informed with the latest news from NTA & MCC.</p>
      </section>

      <section className="nu-filter-bar">
        {CATEGORIES.map((cat) => (
          <button key={cat} className={`nu-filter-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </section>

      <section className="nu-content">
        {loading ? (
          <div className="nu-loader">{[1, 2, 3].map((i) => <div key={i} className="nu-skeleton" />)}</div>
        ) : error ? (
          <div className="nu-empty">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="nu-empty">No updates found for this category.</div>
        ) : (
          <>
            {pinned.length > 0 && <div className="nu-section-label">📌 Pinned Updates</div>}
            <div className="nu-grid">
              {[...pinned, ...regular].map((update, i) => (
                <div key={update.id} className={`nu-card ${update.isPinned ? "pinned" : ""}`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="nu-card-top">
                    <span className="nu-category-badge" style={{ background: CATEGORY_COLORS[update.category] + "18", color: CATEGORY_COLORS[update.category], borderColor: CATEGORY_COLORS[update.category] + "40" }} >
                      {CATEGORY_LABELS[update.category]}
                    </span>
                    {update.isPinned && <span className="nu-pin-badge">📌 Pinned</span>}
                    <span className="nu-time">{timeAgo(update.createdAt)}</span>
                  </div>
                  <h3 className="nu-card-title">{update.title}</h3>
                  <p className="nu-card-desc">{update.description}</p>
                  {update.sourceUrl && (
                    <a href={update.sourceUrl} target="_blank" rel="noopener noreferrer" className="nu-source-btn">
                      Visit Official Site →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="nu-toppers">
        <div className="nu-toppers-header">
          <h2>🏆 NEET 2024 Toppers</h2>
          <p>Inspiring students who made it to the top</p>
        </div>
        <div className="nu-toppers-grid">
          {MOCK_TOPPERS.map((t, i) => (
            <div key={i} className="nu-topper-card">
              <div className="nu-topper-rank">#{t.rank}</div>
              <img src={t.img} alt={t.name} className="nu-topper-img" />
              <div className="nu-topper-name">{t.name}</div>
              <div className="nu-topper-score">{t.score} / 720</div>
              <div className="nu-topper-state">{t.state}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="nu-footer">
          <p>© 2024 NEET Updates. All rights reserved.</p>
          <div className="nu-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        </section>
    </div>
  );
}