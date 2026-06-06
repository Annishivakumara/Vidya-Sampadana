import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../services/studentService";
import StudentDetailCard from "../components/student/StudentDetailCard";
import "./StudentDetailPage.css";

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getStudentById(id);
        setStudent(response.data);
      } catch (err) {
        console.error("Error retrieving profile details:", err);
        setError("Could not retrieve the profile information from the database server.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    }
  }, [id]);

  return (
    <div className="sd-page-wrapper">
      <div className="sd-page-content">
        {/* Top action navigation row */}
        <div className="sd-page-header">
          <button className="sd-back-action-btn" onClick={() => navigate("/students")}>
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "20px", height: "20px" }}>
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Students
          </button>
        </div>

        {/* Loading Template */}
        {loading && (
          <div className="sd-page-status">
            <p>Loading profile metrics...</p>
          </div>
        )}

        {/* Error Template */}
        {error && !loading && (
          <div className="sd-page-error-panel">
            <h3>Data Pipeline Interruption</h3>
            <p>{error}</p>
            <button 
              onClick={() => navigate("/students")}
              style={{
                background: "#1a3cff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "16px"
              }}
            >
              Return to Safety
            </button>
          </div>
        )}

        {/* Success Render */}
        {!loading && !error && student && (
          <StudentDetailCard student={student} />
        )}
      </div>
    </div>
  );
}

export default StudentDetailPage;