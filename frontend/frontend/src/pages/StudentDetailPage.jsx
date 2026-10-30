import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getStudentById } from "../services/studentService";
import StudentDetailCard from "../components/student/StudentDetailCard";
import StudentForm from "../components/student/StudentForm";
import "./StudentDetailPage.css";

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProfileData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await getStudentById(id);
      setStudent(response.data);
    } catch {
      setError(
        "Unable to retrieve this student record from the Academic Registry. Verify that the record exists and the Student Service is running."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showEditModal) {
        setShowEditModal(false);
      }
    };
    if (showEditModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showEditModal]);

  return (
    <div className="sd-page-wrapper">
      <div className="container sd-page-content">
        {/* Top Breadcrumb & Action Navigation Row */}
        <div className="sd-page-header">
          <div className="sd-page-header__left">
            <button
              type="button"
              className="sd-back-action-btn"
              onClick={() => navigate("/students")}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to Student Directory</span>
            </button>

            <nav className="sd-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/students">Students</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">
                {student
                  ? `${student.firstName} ${student.lastName}`
                  : `Record #${id}`}
              </span>
            </nav>
          </div>

          {!loading && !error && student && (
            <div className="sd-page-header__actions">
              <button
                type="button"
                className="sd-edit-record-btn"
                onClick={() => setShowEditModal(true)}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span>Edit Record</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="sd-page-status" role="status" aria-live="polite">
            <div className="sd-page-spinner" aria-hidden="true" />
            <p>Loading student record from Academic Registry…</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="sd-page-error-panel" role="alert">
            <div className="sd-page-error-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3>Unable to Load Student Record</h3>
            <p>{error}</p>
            <div className="sd-page-error-actions">
              <button
                type="button"
                className="sd-page-btn sd-page-btn--secondary"
                onClick={fetchProfileData}
              >
                Retry Request
              </button>
              <button
                type="button"
                className="sd-page-btn sd-page-btn--primary"
                onClick={() => navigate("/students")}
              >
                Return to Directory
              </button>
            </div>
          </div>
        )}

        {/* Student Profile Dossier */}
        {!loading && !error && student && (
          <StudentDetailCard
            student={student}
            onEdit={() => setShowEditModal(true)}
          />
        )}

        {/* Edit Student Modal */}
        {showEditModal && student && (
          <div
            className="sd-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Edit student record"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowEditModal(false);
            }}
          >
            <div className="sd-modal">
              <StudentForm
                fetchStudents={fetchProfileData}
                onClose={() => setShowEditModal(false)}
                initialData={student}
                isEditing={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailPage;