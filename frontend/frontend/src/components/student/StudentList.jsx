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
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
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

  const departments = [...new Set(students.map((student) => student.department).filter(Boolean))].sort();

  const filtered = students
    .filter((student) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        student.firstName?.toLowerCase().includes(term) ||
        student.lastName?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.department?.toLowerCase().includes(term);

      const matchesDepartment =
        departmentFilter === "all" || student.department === departmentFilter;

      const matchesSemester =
        semesterFilter === "all" || String(student.semester) === String(semesterFilter);

      return matchesSearch && matchesDepartment && matchesSemester;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return `${b.firstName || ""} ${b.lastName || ""}`.localeCompare(`${a.firstName || ""} ${a.lastName || ""}`);
        case "semester-desc":
          return (Number(b.semester) || 0) - (Number(a.semester) || 0);
        case "semester-asc":
          return (Number(a.semester) || 0) - (Number(b.semester) || 0);
        case "department":
          return `${a.department || ""}`.localeCompare(`${b.department || ""}`) || `${a.firstName || ""}`.localeCompare(`${b.firstName || ""}`);
        case "name-asc":
        default:
          return `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(`${b.firstName || ""} ${b.lastName || ""}`);
      }
    });

  const stats = (() => {
    const validSemesters = students
      .map((student) => Number(student.semester))
      .filter((value) => Number.isFinite(value) && value > 0);

    const averageSemester = validSemesters.length
      ? (validSemesters.reduce((sum, value) => sum + value, 0) / validSemesters.length).toFixed(1)
      : "0.0";

    return {
      total: students.length,
      departments: new Set(students.map((student) => student.department).filter(Boolean)).size,
      averageSemester,
      matches: filtered.length,
    };
  })();

  const analytics = (() => {
    const departmentCounts = students.reduce((acc, student) => {
      const dept = student.department?.trim();
      if (!dept) return acc;
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    const topDepartment = Object.entries(departmentCounts).sort((a, b) => b[1] - a[1])[0];
    const incompleteProfiles = students.filter((student) => !student.department || !student.semester).length;
    const earlyStage = students.filter((student) => Number(student.semester) <= 2).length;
    const advancedStage = students.filter((student) => Number(student.semester) >= 6).length;

    return {
      topDepartment: topDepartment ? `${topDepartment[0]} (${topDepartment[1]})` : "N/A",
      incompleteProfiles,
      earlyStage,
      advancedStage,
    };
  })();

  const getStudentStatus = (student) => {
    if (!student.department || !student.semester) {
      return { label: "Needs Attention", tone: "neutral" };
    }

    const semester = Number(student.semester);

    if (semester >= 6) {
      return { label: "Advanced", tone: "advanced" };
    }

    return { label: "On Track", tone: "active" };
  };

  const getInitials = (f, l) =>
    `${(f || "?")[0]}${(l || "?")[0]}`.toUpperCase();

  return (
    <div className="sl-wrapper">
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

      {!loading && !error && (
        <>
          <div className="sl-stats">
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Total Students</span>
              <strong>{stats.total}</strong>
              <small>Enrolled</small>
            </div>
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Departments</span>
              <strong>{stats.departments}</strong>
              <small>Active</small>
            </div>
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Avg. Semester</span>
              <strong>{stats.averageSemester}</strong>
              <small>Across records</small>
            </div>
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Matches</span>
              <strong>{stats.matches}</strong>
              <small>Visible now</small>
            </div>
          </div>

          <div className="sl-insights">
            <div className="sl-insight-card sl-insight-card--primary">
              <span className="sl-insight-card__label">Top department</span>
              <strong>{analytics.topDepartment}</strong>
              <small>Most represented stream</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Needs attention</span>
              <strong>{analytics.incompleteProfiles}</strong>
              <small>Profiles missing details</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Early stage</span>
              <strong>{analytics.earlyStage}</strong>
              <small>Semester 1–2</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Advanced stage</span>
              <strong>{analytics.advancedStage}</strong>
              <small>Semester 6–8</small>
            </div>
          </div>
        </>
      )}

      <div className="sl-toolbar">
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

        <div className="sl-filters">
          <div className="sl-filter-group">
            <label htmlFor="sortBy">Sort by</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="semester-asc">Semester Low–High</option>
              <option value="semester-desc">Semester High–Low</option>
              <option value="department">Department</option>
            </select>
          </div>

          <div className="sl-filter-group">
            <label htmlFor="departmentFilter">Department</label>
            <select
              id="departmentFilter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>

          <div className="sl-filter-group">
            <label htmlFor="semesterFilter">Semester</label>
            <select
              id="semesterFilter"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="all">All semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                <option key={semester} value={semester}>{`Semester ${semester}`}</option>
              ))}
            </select>
          </div>

          {(search || departmentFilter !== "all" || semesterFilter !== "all" || sortBy !== "name-asc") && (
            <button type="button" className="sl-clear-filters" onClick={() => {
              setSearch("");
              setDepartmentFilter("all");
              setSemesterFilter("all");
              setSortBy("name-asc");
            }}>
              Clear filters
            </button>
          )}
        </div>
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
          {filtered.map((student) => {
            const status = getStudentStatus(student);

            return (
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

                  <div className={`sl-card__status sl-card__status--${status.tone}`}>
                    {status.label}
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
            );
          })}
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