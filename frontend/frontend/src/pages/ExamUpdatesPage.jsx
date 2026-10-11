import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  EXAM_CATEGORIES,
  getKcetUpdates,
  getKcetUpdatesByCategory,
  getNeetUpdates,
  getNeetUpdatesByCategory,
} from "../services/examUpdatesService";
import "./ExamUpdatesPage.css";

const formatUpdateDate = (dateValue) => {
  if (!dateValue) return "Date Unspecified";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return String(dateValue);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsed);
};

const ExamUpdatesPage = ({ initialExamFilter = "ALL" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive exam stream filter from route path or prop
  const routeExamFilter = useMemo(() => {
    if (location.pathname === "/kcet-updates") return "KCET";
    if (location.pathname === "/neet-updates") return "NEET";
    return initialExamFilter;
  }, [location.pathname, initialExamFilter]);

  const [examFilter, setExamFilter] = useState(routeExamFilter);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const [kcetUpdates, setKcetUpdates] = useState([]);
  const [neetUpdates, setNeetUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kcetError, setKcetError] = useState("");
  const [neetError, setNeetError] = useState("");
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(() => {
    setExamFilter(routeExamFilter);
  }, [routeExamFilter]);

  const fetchAllUpdates = useCallback(async (category = "ALL") => {
    setLoading(true);
    setKcetError("");
    setNeetError("");

    const kcetPromise =
      category === "ALL"
        ? getKcetUpdates()
        : getKcetUpdatesByCategory(category);
    const neetPromise =
      category === "ALL"
        ? getNeetUpdates()
        : getNeetUpdatesByCategory(category);

    const [kcetResult, neetResult] = await Promise.allSettled([
      kcetPromise,
      neetPromise,
    ]);

    if (kcetResult.status === "fulfilled") {
      setKcetUpdates(kcetResult.value);
    } else {
      setKcetUpdates([]);
      setKcetError(
        "Unable to reach KCET Updates Service (/api/kcet-updates via Gateway :8080 -> :8083)."
      );
    }

    if (neetResult.status === "fulfilled") {
      setNeetUpdates(neetResult.value);
    } else {
      setNeetUpdates([]);
      setNeetError(
        "Unable to reach NEET Updates Service (/api/neet-updates via Gateway :8080 -> :8089)."
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllUpdates(selectedCategory);
  }, [selectedCategory, fetchAllUpdates]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && selectedUpdate) {
        setSelectedUpdate(null);
      }
    };
    if (selectedUpdate) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedUpdate]);

  const handleStreamChange = (nextStream) => {
    setExamFilter(nextStream);
    if (nextStream === "KCET" && location.pathname !== "/kcet-updates") {
      navigate("/kcet-updates", { replace: true });
    } else if (nextStream === "NEET" && location.pathname !== "/neet-updates") {
      navigate("/neet-updates", { replace: true });
    } else if (nextStream === "ALL" && location.pathname !== "/updates") {
      navigate("/updates", { replace: true });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSortBy("latest");
    handleStreamChange("ALL");
  };

  const combinedUpdates = useMemo(() => {
    let items = [];
    if (examFilter === "ALL" || examFilter === "KCET") {
      items = items.concat(kcetUpdates);
    }
    if (examFilter === "ALL" || examFilter === "NEET") {
      items = items.concat(neetUpdates);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.categoryLabel.toLowerCase().includes(query) ||
          item.exam.toLowerCase().includes(query)
      );
    }

    return [...items].sort((a, b) => {
      if (sortBy === "pinned") {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (a.isPinned !== b.isPinned && sortBy === "latest") {
        return a.isPinned ? -1 : 1;
      }
      return timeB - timeA;
    });
  }, [kcetUpdates, neetUpdates, examFilter, searchQuery, sortBy]);

  const hasActiveError =
    (examFilter === "ALL" && kcetError && neetError) ||
    (examFilter === "KCET" && Boolean(kcetError)) ||
    (examFilter === "NEET" && Boolean(neetError));

  const partialServiceNotice =
    examFilter === "ALL" &&
    ((kcetError && !neetError) || (!kcetError && neetError))
      ? kcetError || neetError
      : "";

  const hasActiveFilters =
    examFilter !== "ALL" ||
    selectedCategory !== "ALL" ||
    Boolean(searchQuery.trim()) ||
    sortBy !== "latest";

  return (
    <main className="exam-updates-page">
      {/* Institutional Page Header */}
      <section className="exam-updates__hero">
        <div className="container exam-updates__hero-inner">
          <div className="exam-updates__hero-copy">
            <nav className="exam-updates__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Competitive Exam Updates</span>
              {examFilter !== "ALL" && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{examFilter}</span>
                </>
              )}
            </nav>

            <div className="badge exam-updates__badge">
              Official Entrance Examination Advisories
            </div>

            <h1 className="exam-updates__title">
              {examFilter === "KCET"
                ? "KCET Examination Bulletins & Advisories"
                : examFilter === "NEET"
                ? "NEET UG Examination Bulletins & Advisories"
                : "KCET & NEET Examination Updates"}
            </h1>

            <p className="exam-updates__sub">
              Verified academic notifications, admit card releases, syllabus
              circulars, answer keys, cutoff ranks, and counselling schedules
              published through the Vidya Sampadana examination microservices.
            </p>
          </div>

          <div
            className="exam-updates__hero-panels"
            aria-label="Exam stream summary"
          >
            <div className="exam-updates__mini-panel exam-updates__mini-panel--accent">
              <span className="exam-updates__mini-label">Active Bulletins</span>
              <strong className="exam-updates__mini-value">
                {loading
                  ? "Syncing..."
                  : `${kcetUpdates.length + neetUpdates.length} Notices`}
              </strong>
              <span className="exam-updates__mini-meta">
                Live feed across KCET &amp; NEET
              </span>
            </div>

            <div className="exam-updates__mini-panel">
              <span className="exam-updates__mini-label">KCET Stream</span>
              <strong className="exam-updates__mini-value">
                {loading
                  ? "..."
                  : kcetError
                  ? "Offline"
                  : `${kcetUpdates.length} Active`}
              </strong>
              <span className="exam-updates__mini-meta">
                KEA Engineering &amp; Pharmacy
              </span>
            </div>

            <div className="exam-updates__mini-panel">
              <span className="exam-updates__mini-label">NEET Stream</span>
              <strong className="exam-updates__mini-value">
                {loading
                  ? "..."
                  : neetError
                  ? "Offline"
                  : `${neetUpdates.length} Active`}
              </strong>
              <span className="exam-updates__mini-meta">
                NTA Medical &amp; Dental Admissions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="container exam-updates__content">
        {/* Stream Tabs & Search Control Bar */}
        <div className="exam-updates__toolbar">
          <div
            className="exam-updates__stream-tabs"
            role="tablist"
            aria-label="Examination stream filter"
          >
            <button
              type="button"
              role="tab"
              aria-selected={examFilter === "ALL"}
              className={`exam-updates__stream-tab ${
                examFilter === "ALL" ? "exam-updates__stream-tab--active" : ""
              }`}
              onClick={() => handleStreamChange("ALL")}
            >
              All Streams
              <span className="exam-updates__tab-count">
                {kcetUpdates.length + neetUpdates.length}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={examFilter === "KCET"}
              className={`exam-updates__stream-tab ${
                examFilter === "KCET" ? "exam-updates__stream-tab--active" : ""
              }`}
              onClick={() => handleStreamChange("KCET")}
            >
              KCET Bulletins
              <span className="exam-updates__tab-count">
                {kcetUpdates.length}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={examFilter === "NEET"}
              className={`exam-updates__stream-tab ${
                examFilter === "NEET" ? "exam-updates__stream-tab--active" : ""
              }`}
              onClick={() => handleStreamChange("NEET")}
            >
              NEET Bulletins
              <span className="exam-updates__tab-count">
                {neetUpdates.length}
              </span>
            </button>
          </div>

          <div className="exam-updates__controls">
            <div className="exam-updates__search-wrap">
              <svg
                className="exam-updates__search-icon"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <path
                  d="M13.5 13.5L17 17"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                className="exam-updates__search-input"
                placeholder="Search notices by title, topic, or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search examination updates"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="exam-updates__search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                >
                  ×
                </button>
              )}
            </div>

            <div className="exam-updates__select-wrap">
              <label htmlFor="exam-sort-select" className="sr-only">
                Sort updates
              </label>
              <select
                id="exam-sort-select"
                className="exam-updates__select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Sort: Newest &amp; Pinned First</option>
                <option value="pinned">Sort: Pinned Priority</option>
                <option value="title-asc">Sort: Title (A–Z)</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-outline exam-updates__refresh-btn"
              onClick={() => fetchAllUpdates(selectedCategory)}
              disabled={loading}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16.5 10A6.5 6.5 0 1 1 14.59 5.4M16.5 3.5V6.5H13.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Mapped directly to KcetCategory & UpdateCategory enums) */}
        <div
          className="exam-updates__categories"
          role="group"
          aria-label="Filter updates by category"
        >
          {EXAM_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`exam-updates__cat-chip ${
                selectedCategory === cat.value
                  ? "exam-updates__cat-chip--active"
                  : ""
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partial Service Warning Banner (if one stream is live and the other is offline) */}
        {!loading && partialServiceNotice && (
          <div className="exam-updates__partial-banner" role="status">
            <div className="exam-updates__partial-banner-text">
              <span className="exam-updates__partial-dot" aria-hidden="true" />
              <span>{partialServiceNotice}</span>
            </div>
            <button
              type="button"
              className="exam-updates__partial-retry"
              onClick={() => fetchAllUpdates(selectedCategory)}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading Skeleton State */}
        {loading && (
          <div
            className="exam-updates__grid"
            aria-busy="true"
            aria-label="Loading examination updates"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="exam-updates__card exam-updates__card--skeleton"
              >
                <div className="exam-updates__skeleton-top">
                  <span className="exam-updates__sk-pill" />
                  <span className="exam-updates__sk-date" />
                </div>
                <div className="exam-updates__sk-title" />
                <div className="exam-updates__sk-line" />
                <div className="exam-updates__sk-line exam-updates__sk-line--short" />
                <div className="exam-updates__sk-footer" />
              </div>
            ))}
          </div>
        )}

        {/* Full Error State for Selected Stream */}
        {!loading && hasActiveError && (
          <div className="exam-updates__state-card exam-updates__state-card--error" role="alert">
            <div className="exam-updates__state-icon exam-updates__state-icon--error">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 8v4.5M12 16h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="exam-updates__state-title">
              Examination Updates Service Unreachable
            </h2>
            <p className="exam-updates__state-desc">
              {examFilter === "KCET"
                ? kcetError
                : examFilter === "NEET"
                ? neetError
                : "Unable to load examination bulletins from the API Gateway (port 8080). Verify that kcet-updates (port 8083) and neet-updates (port 8089) are running."}
            </p>
            <div className="exam-updates__state-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => fetchAllUpdates(selectedCategory)}
              >
                Retry Connection
              </button>
              {examFilter !== "ALL" && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleStreamChange("ALL")}
                >
                  View All Streams
                </button>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !hasActiveError && combinedUpdates.length === 0 && (
          <div className="exam-updates__state-card">
            <div className="exam-updates__state-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12h6M9 16h4M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="exam-updates__state-title">
              No Examination Bulletins Found
            </h2>
            <p className="exam-updates__state-desc">
              {hasActiveFilters
                ? "No active KCET or NEET notifications match your current category or search filters."
                : "There are currently no published examination advisories in the registry."}
            </p>
            <div className="exam-updates__state-actions">
              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClearFilters}
                >
                  Reset All Filters
                </button>
              )}
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => fetchAllUpdates(selectedCategory)}
              >
                Refresh Feed
              </button>
            </div>
          </div>
        )}

        {/* Updates Grid */}
        {!loading && !hasActiveError && combinedUpdates.length > 0 && (
          <>
            <div className="exam-updates__results-meta">
              <span>
                Showing <strong>{combinedUpdates.length}</strong> official{" "}
                {combinedUpdates.length === 1 ? "advisory" : "advisories"}
                {selectedCategory !== "ALL"
                  ? ` in ${
                      EXAM_CATEGORIES.find((c) => c.value === selectedCategory)
                        ?.label || selectedCategory
                    }`
                  : ""}
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="exam-updates__reset-link"
                  onClick={handleClearFilters}
                >
                  Clear active filters
                </button>
              )}
            </div>

            <div className="exam-updates__grid">
              {combinedUpdates.map((update) => (
                <article
                  key={update.id}
                  className={`exam-updates__card ${
                    update.isPinned ? "exam-updates__card--pinned" : ""
                  }`}
                >
                  <div className="exam-updates__card-header">
                    <div className="exam-updates__badges">
                      <span
                        className={`exam-updates__exam-tag exam-updates__exam-tag--${update.exam.toLowerCase()}`}
                      >
                        {update.exam}
                      </span>
                      <span className="exam-updates__category-tag">
                        {update.categoryLabel}
                      </span>
                      {update.isPinned && (
                        <span className="exam-updates__pinned-tag">
                          Pinned Priority
                        </span>
                      )}
                    </div>

                    <time
                      className="exam-updates__date"
                      dateTime={update.createdAt || undefined}
                    >
                      {formatUpdateDate(update.createdAt)}
                    </time>
                  </div>

                  <h2 className="exam-updates__card-title">{update.title}</h2>

                  <p className="exam-updates__card-desc">
                    {update.description}
                  </p>

                  <div className="exam-updates__card-footer">
                    <button
                      type="button"
                      className="exam-updates__read-btn"
                      onClick={() => setSelectedUpdate(update)}
                    >
                      Read Full Circular
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3.5 8h9m0 0L8.5 4m4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {update.sourceUrl && (
                      <a
                        href={update.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exam-updates__source-link"
                      >
                        Official Source ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Circular Detail Modal */}
      {selectedUpdate && (
        <div
          className="exam-updates__modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exam-update-modal-title"
          onClick={() => setSelectedUpdate(null)}
        >
          <div
            className="exam-updates__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="exam-updates__modal-header">
              <div className="exam-updates__badges">
                <span
                  className={`exam-updates__exam-tag exam-updates__exam-tag--${selectedUpdate.exam.toLowerCase()}`}
                >
                  {selectedUpdate.exam} Official Bulletin
                </span>
                <span className="exam-updates__category-tag">
                  {selectedUpdate.categoryLabel}
                </span>
                {selectedUpdate.isPinned && (
                  <span className="exam-updates__pinned-tag">
                    Pinned Priority
                  </span>
                )}
              </div>

              <button
                type="button"
                className="exam-updates__modal-close"
                onClick={() => setSelectedUpdate(null)}
                aria-label="Close bulletin details"
              >
                ×
              </button>
            </div>

            <h2
              id="exam-update-modal-title"
              className="exam-updates__modal-title"
            >
              {selectedUpdate.title}
            </h2>

            <div className="exam-updates__modal-meta">
              <span>
                <strong>Published:</strong>{" "}
                {formatUpdateDate(selectedUpdate.createdAt)}
              </span>
              {selectedUpdate.updatedAt && (
                <span>
                  <strong>Last Updated:</strong>{" "}
                  {formatUpdateDate(selectedUpdate.updatedAt)}
                </span>
              )}
              <span>
                <strong>Reference ID:</strong> #{selectedUpdate.rawId}
              </span>
            </div>

            <div className="exam-updates__modal-body">
              <p>{selectedUpdate.description}</p>
            </div>

            <div className="exam-updates__modal-footer">
              {selectedUpdate.sourceUrl ? (
                <a
                  href={selectedUpdate.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Open Official Notification Source ↗
                </a>
              ) : (
                <span className="exam-updates__modal-note">
                  Issued via {selectedUpdate.serviceName}
                </span>
              )}

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedUpdate(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ExamUpdatesPage;
