import "./StudentDetailCard.css";

const formatDate = (value) => {
  if (!value) return "Not recorded";
  const raw = typeof value === "string" && value.includes("T") ? value.split("T")[0] : value;
  const parsed = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return String(raw);
  }
  return parsed.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getAcademicStanding = (student) => {
  if (!student?.department || !student?.semester) {
    return { label: "Needs Attention", tone: "neutral", stage: "Incomplete Placement" };
  }
  const sem = Number(student.semester);
  if (sem >= 6) {
    return { label: "Senior Cohort", tone: "advanced", stage: "Final / Advanced Stage" };
  }
  if (sem <= 2) {
    return { label: "Active Standing", tone: "active", stage: "Foundational Stage" };
  }
  return { label: "Active Standing", tone: "active", stage: "Core Curriculum Stage" };
};

function StudentDetailCard({ student, onEdit }) {
  const getInitials = (f, l) =>
    `${(f || "?")[0]}${(l || "?")[0]}`.toUpperCase();

  const standing = getAcademicStanding(student);

  return (
    <article className="sd-container" aria-label="Student academic dossier">
      {/* Left Panel: Identity Summary & Academic Standing */}
      <aside className="sd-left-panel">
        <div className="sd-avatar-large" aria-hidden="true">
          {getInitials(student.firstName, student.lastName)}
        </div>

        {student.id && (
          <span className="sd-record-id">Registry ID #{student.id}</span>
        )}

        <h1 className="sd-profile-name">
          {student.firstName} {student.lastName}
        </h1>

        <p className="sd-profile-email">{student.email || "No email on file"}</p>

        <div className="sd-badge-container">
          <span className="sd-badge sd-badge--dept">
            {student.department || "Unassigned Department"}
          </span>
          <span className="sd-badge sd-badge--sem">
            {student.semester ? `Semester ${student.semester}` : "Semester N/A"}
          </span>
        </div>

        <div className="sd-standing-box">
          <div className="sd-standing-row">
            <span className="sd-standing-label">Standing</span>
            <span className={`sd-standing-pill sd-standing-pill--${standing.tone}`}>
              {standing.label}
            </span>
          </div>
          <div className="sd-standing-row">
            <span className="sd-standing-label">Academic Stage</span>
            <strong className="sd-standing-value">{standing.stage}</strong>
          </div>
        </div>

        {onEdit && (
          <button type="button" className="sd-left-edit-btn" onClick={onEdit}>
            Update Student Profile
          </button>
        )}
      </aside>

      {/* Right Panel: Structured Personal & Academic Record */}
      <div className="sd-right-panel">
        <div className="sd-section-header">
          <div>
            <span className="sd-section-eyebrow">Official Student Dossier</span>
            <h2 className="sd-section-title">Personal &amp; Academic Information</h2>
          </div>
          <span className="sd-verified-tag">Vidya-Sampadana Registry</span>
        </div>

        <div className="sd-info-grid">
          <div className="sd-info-item">
            <span className="sd-info-label">First Name</span>
            <p className="sd-info-value">{student.firstName || "—"}</p>
          </div>

          <div className="sd-info-item">
            <span className="sd-info-label">Last Name</span>
            <p className="sd-info-value">{student.lastName || "—"}</p>
          </div>

          <div className="sd-info-item">
            <span className="sd-info-label">Email Address</span>
            <p className="sd-info-value sd-email-text">
              {student.email ? (
                <a href={`mailto:${student.email}`}>{student.email}</a>
              ) : (
                "—"
              )}
            </p>
          </div>

          <div className="sd-info-item">
            <span className="sd-info-label">Date of Birth</span>
            <p className="sd-info-value">{formatDate(student.dateOfBirth)}</p>
          </div>

          <div className="sd-info-item">
            <span className="sd-info-label">Academic Department</span>
            <p className="sd-info-value">{student.department || "—"}</p>
          </div>

          <div className="sd-info-item">
            <span className="sd-info-label">Current Semester</span>
            <p className="sd-info-value">
              {student.semester ? `Semester ${student.semester} of 8` : "—"}
            </p>
          </div>

          <div className="sd-info-item sd-info-item--full">
            <span className="sd-info-label">Residential / Campus Address</span>
            <p className="sd-info-value">
              {student.address || "No residential address registered."}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StudentDetailCard;