import "./StudentDetailCard.css";

function StudentDetailCard({ student }) {
  const getInitials = (f, l) =>
    `${(f || "?")[0]}${(l || "?")[0]}`.toUpperCase();

  return (
    <div className="sd-container">
      {/* Left Panel: Profile Circle & Title Details */}
      <div className="sd-left-panel">
        <div className="sd-avatar-large">
          {getInitials(student.firstName, student.lastName)}
        </div>
        <h2 className="sd-profile-name">
          {student.firstName} {student.lastName}
        </h2>
        <div className="sd-badge-container">
          {student.department && (
            <span className="sd-badge sd-badge--dept">{student.department}</span>
          )}
          {student.semester && (
            <span className="sd-badge sd-badge--sem">Sem {student.semester}</span>
          )}
        </div>
      </div>

      {/* Right Panel: Detailed Personal & Academic Info */}
      <div className="sd-right-panel">
        <h3 className="sd-section-title">Student Information</h3>
        <div className="sd-info-grid">
          <div className="sd-info-item">
            <label>First Name</label>
            <p>{student.firstName || "—"}</p>
          </div>
          <div className="sd-info-item">
            <label>Last Name</label>
            <p>{student.lastName || "—"}</p>
          </div>
          <div className="sd-info-item sd-info-item--full">
            <label>Email Address</label>
            <p className="sd-email-text">{student.email || "—"}</p>
          </div>
          <div className="sd-info-item">
            <label>Department</label>
            <p>{student.department || "—"}</p>
          </div>
          <div className="sd-info-item">
            <label>Current Semester</label>
            <p>{student.semester ? `Semester ${student.semester}` : "—"}</p>
          </div>
          <div className="sd-info-item sd-info-item--full">
            <label>Campus Address Location</label>
            <p>{student.address || "No address details registered."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailCard;