import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/studentService";
import StudentForm from "./StudentForm";
import { useNavigate } from "react-router-dom";

import "./StudentList.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editStudent, setEditingStudent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  
  // New States for Custom Delete Confirmation & Error UI
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (err) {
      setError("Could not load students. Make sure the backend server is running on port 8082.");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    
    const id = studentToDelete.id;
    setDeleting(id);
    setDeleteError("");
    
    try {
      console.log(`Attempting to delete student with ID: ${id}`);
      const response = await deleteStudent(id);
      console.log("Delete response:", response);
      
      // Refresh the entire student list from backend to ensure sync
      await fetchStudents();
      setDeleting(null);
      setStudentToDelete(null);
    } catch (err) {
      console.error("Delete error details:", {
        message: err.message,
        response: err.response,
        status: err.response?.status,
        data: err.response?.data,
        config: err.config?.url
      });
      
      // Even if error, try to refresh the list in case backend deletion succeeded
      console.warn("Refreshing student list to check if delete succeeded on backend...");
      await fetchStudents();
      setDeleting(null);
      setStudentToDelete(null);
      
      if (err.message !== "Network Error") {
        setDeleteError(`Failed to delete student: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const filtered = students.filter(
    (s) =>
      s.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.department?.toLowerCase().includes(search.toLowerCase())

  );

  const getInitials = (f, l) =>
    `${(f || "?")[0]}${(l || "?")[0]}`.toUpperCase();

  return (
    <div className="sl-wrapper">
      {/* Header Bar */}
      <div className="sl-topbar">
        <div>
          <h1 className="sl-title">Students</h1>
          <p className="sl-sub">
            {loading ? "Loading…" : `${students.length} student${students.length !== 1 ? "s" : ""} enrolled`}
          </p>
        </div>
        <button className="sl-add-btn" onClick={() => setShowForm(true)}>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="sl-search-wrap">
        <svg className="sl-search-icon" viewBox="0 0 20 20" fill="none">
          <path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          className="sl-search"
          placeholder="Search by name, email, or department…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="sl-search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Modal Form Overlay */}
      {showForm && (
        <div className="sl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="sl-modal">
            <StudentForm fetchStudents={fetchStudents} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="sl-error">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
          <button className="sl-error-retry" onClick={fetchStudents}>Retry</button>
        </div>
      )}

      {/* Loading */}
      {loading && !error && (
        <div className="sl-loading">
          <div className="sl-spinner" />
          <p>Loading students…</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="sl-empty">
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="rgba(26,60,255,.06)"/>
            <path d="M32 34a10 10 0 100-20 10 10 0 000 20zM18 50a14 14 0 0128 0" stroke="#1a3cff" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <h3>{search ? "No students match your search" : "No students yet"}</h3>
          <p>{search ? "Try a different search term." : "Add your first student to get started."}</p>
          {!search && (
            <button className="sl-add-btn" onClick={() => setShowForm(true)}>Add First Student</button>
          )}
        </div>
      )}

      {/* Student Grid */}
      {/* Student Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="sl-grid">
          {filtered.map((student) => (
            <div 
              className="sl-card" 
              key={student.id}
              onClick={() => navigate(`/students/${student.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="sl-card__avatar">
                {getInitials(student.firstName, student.lastName)}
              </div>
              <div className="sl-card__info">
                <h3 className="sl-card__name">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="sl-card__email">{student.email}</p>

                <div className="sl-card__meta">
                  {student.department && (
                    <span className="sl-card__tag sl-card__tag--dept">{student.department}</span>
                  )}
                  {student.semester && (
                    <span className="sl-card__tag sl-card__tag--sem">Sem {student.semester}</span>
                  )}
                </div>
              </div>
              
              <button
                className="sl-card__del"
                onClick={(e) => { 
                  e.stopPropagation(); // Stops the card click from opening the profile
                  setStudentToDelete(student); 
                }}
                disabled={deleting === student.id}
                aria-label="Delete student"
              >
                {deleting === student.id ? (
                  <span className="sl-mini-spinner" />
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>              
              
              <button
                className="sl-card__edit"
                onClick={(e) => {
                  e.stopPropagation(); // Stops the card click from opening the profile
                  setEditingStudent(student);
                  setShowEditForm(true);
                }}
                aria-label="Edit student"
              >
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal Form Overlay */}
      {showEditForm && editStudent && (
        <div className="sl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowEditForm(false); setEditingStudent(null); }}}>
          <div className="sl-modal">
            <StudentForm 
              fetchStudents={fetchStudents} 
              onClose={() => { setShowEditForm(false); setEditingStudent(null); }}
              initialData={editStudent}
              isEditing={true}
            />
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal UI */}
      {studentToDelete && (
        <div className="sl-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setStudentToDelete(null); setDeleteError(""); }}}>
          <div className="sl-modal sl-delete-modal">
            <div className="sl-delete-modal__icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3>Delete Student</h3>
            <p>
              Are you sure you want to remove <strong>{studentToDelete.firstName} {studentToDelete.lastName}</strong>? This action cannot be undone.
            </p>
            
            {deleteError && <div className="sl-delete-modal__error">{deleteError}</div>}
            
            <div className="sl-delete-modal__actions">
              <button 
                className="sl-delete-modal__btn-cancel" 
                onClick={() => { setStudentToDelete(null); setDeleteError(""); }}
                disabled={deleting !== null}
              >
                Cancel
              </button>
              <button 
                className="sl-delete-modal__btn-confirm" 
                onClick={handleConfirmDelete}
                disabled={deleting !== null}
              >
                {deleting !== null ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;