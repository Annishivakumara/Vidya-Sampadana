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

  // States for Custom Delete Confirmation & Error UI
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showForm) setShowForm(false);
        if (showEditForm) {
          setShowEditForm(false);
          setEditingStudent(null);
        }
        if (studentToDelete && deleting === null) {
          setStudentToDelete(null);
          setDeleteError("");
        }
      }
    };

    if (showForm || showEditForm || studentToDelete) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showForm, showEditForm, studentToDelete, deleting]);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getStudents();
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch {
      setError(
        "Unable to load student records from the Academic Registry. Please verify that the API Gateway (port 8080) and Student Service (port 8082) are running."
      );
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
      await deleteStudent(id);
      await fetchStudents();
      setDeleting(null);
      setStudentToDelete(null);
    } catch (err) {
      await fetchStudents();
      setDeleting(null);
      setStudentToDelete(null);

      if (err.message !== "Network Error") {
        setDeleteError(
          `Failed to delete student: ${err.response?.data?.message || err.message}`
        );
      }
    }
  };

  const departments = [
    ...new Set(students.map((student) => student.department?.trim()).filter(Boolean)),
  ].sort();

  const hasActiveFilters =
    Boolean(search.trim()) ||
    departmentFilter !== "all" ||
    semesterFilter !== "all" ||
    sortBy !== "name-asc";

  const clearAllFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setSemesterFilter("all");
    setSortBy("name-asc");
  };

  const filtered = students
    .filter((student) => {
      const term = search.trim().toLowerCase();
      const fullName = `${student.firstName || ""} ${student.lastName || ""}`.toLowerCase();
      const matchesSearch =
        !term ||
        fullName.includes(term) ||
        student.firstName?.toLowerCase().includes(term) ||
        student.lastName?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.department?.toLowerCase().includes(term) ||
        String(student.id || "").includes(term);

      const matchesDepartment =
        departmentFilter === "all" || student.department?.trim() === departmentFilter;

      const matchesSemester =
        semesterFilter === "all" || String(student.semester) === String(semesterFilter);

      return matchesSearch && matchesDepartment && matchesSemester;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-desc":
          return `${b.firstName || ""} ${b.lastName || ""}`.localeCompare(
            `${a.firstName || ""} ${a.lastName || ""}`
          );
        case "semester-desc":
          return (Number(b.semester) || 0) - (Number(a.semester) || 0);
        case "semester-asc":
          return (Number(a.semester) || 0) - (Number(b.semester) || 0);
        case "department":
          return (
            `${a.department || ""}`.localeCompare(`${b.department || ""}`) ||
            `${a.firstName || ""}`.localeCompare(`${b.firstName || ""}`)
          );
        case "name-asc":
        default:
          return `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(
            `${b.firstName || ""} ${b.lastName || ""}`
          );
      }
    });

  const stats = (() => {
    const validSemesters = students
      .map((student) => Number(student.semester))
      .filter((value) => Number.isFinite(value) && value > 0);

    const averageSemester = validSemesters.length
      ? (
          validSemesters.reduce((sum, value) => sum + value, 0) / validSemesters.length
        ).toFixed(1)
      : "0.0";

    return {
      total: students.length,
      departments: departments.length,
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
    const incompleteProfiles = students.filter(
      (student) => !student.department || !student.semester
    ).length;
    const earlyStage = students.filter((student) => {
      const sem = Number(student.semester);
      return sem >= 1 && sem <= 2;
    }).length;
    const advancedStage = students.filter((student) => Number(student.semester) >= 6).length;

    return {
      topDepartment: topDepartment ? `${topDepartment[0]} (${topDepartment[1]})` : "None recorded",
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
      return { label: "Senior Cohort", tone: "advanced" };
    }

    return { label: "Active Standing", tone: "active" };
  };

  const getInitials = (f, l) => `${(f || "?")[0]}${(l || "?")[0]}`.toUpperCase();

  return (
    <div className="sl-wrapper">
      {/* Section Header & Primary Actions */}
      <div className="sl-topbar">
        <div className="sl-topbar__heading">
          <h2 className="sl-title">Enrolled Student Registry</h2>
          <p className="sl-sub">
            {loading
              ? "Synchronizing records with Student Service…"
              : `Showing ${filtered.length} of ${students.length} registered student${
                  students.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        <div className="sl-topbar__actions">
          <button
            type="button"
            className="sl-refresh-btn"
            onClick={fetchStudents}
            disabled={loading}
            title="Refresh student directory"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>

          <button type="button" className="sl-add-btn" onClick={() => setShowForm(true)}>
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Metrics & Cohort Insights */}
      {!loading && !error && (
        <section className="sl-overview" aria-label="Student directory metrics">
          <div className="sl-stats">
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Total Enrolled</span>
              <strong className="sl-stat-card__value">{stats.total}</strong>
              <small className="sl-stat-card__meta">Verified student records</small>
            </div>
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Academic Departments</span>
              <strong className="sl-stat-card__value">{stats.departments}</strong>
              <small className="sl-stat-card__meta">Active streams represented</small>
            </div>
            <div className="sl-stat-card">
              <span className="sl-stat-card__label">Mean Semester</span>
              <strong className="sl-stat-card__value">{stats.averageSemester}</strong>
              <small className="sl-stat-card__meta">Across enrolled cohort</small>
            </div>
            <div className="sl-stat-card sl-stat-card--highlight">
              <span className="sl-stat-card__label">Filtered Matches</span>
              <strong className="sl-stat-card__value">{stats.matches}</strong>
              <small className="sl-stat-card__meta">Currently displayed</small>
            </div>
          </div>

          <div className="sl-insights">
            <div className="sl-insight-card sl-insight-card--primary">
              <span className="sl-insight-card__label">Primary Department</span>
              <strong className="sl-insight-card__value">{analytics.topDepartment}</strong>
              <small className="sl-insight-card__meta">Largest enrolled discipline</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Foundational Cohort</span>
              <strong className="sl-insight-card__value">{analytics.earlyStage}</strong>
              <small className="sl-insight-card__meta">Semesters 1–2</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Senior Cohort</span>
              <strong className="sl-insight-card__value">{analytics.advancedStage}</strong>
              <small className="sl-insight-card__meta">Semesters 6–8</small>
            </div>

            <div className="sl-insight-card">
              <span className="sl-insight-card__label">Profile Completeness</span>
              <strong className="sl-insight-card__value">
                {analytics.incompleteProfiles === 0
                  ? "100% Complete"
                  : `${analytics.incompleteProfiles} Incomplete`}
              </strong>
              <small className="sl-insight-card__meta">
                {analytics.incompleteProfiles === 0
                  ? "All department & semester fields set"
                  : "Records missing department or semester"}
              </small>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Toolbar */}
      <div className="sl-toolbar" role="region" aria-label="Search and filter students">
        <div className="sl-search-wrap">
          <label htmlFor="student-search-input" className="sr-only">
            Search students by name, email, department, or ID
          </label>
          <svg className="sl-search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="student-search-input"
            type="search"
            className="sl-search"
            placeholder="Search by student name, email, department, or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="sl-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>

        <div className="sl-filters">
          <div className="sl-filter-group">
            <label htmlFor="departmentFilter">Department</label>
            <select
              id="departmentFilter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
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
              <option value="all">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>
          </div>

          <div className="sl-filter-group">
            <label htmlFor="sortBy">Sort Order</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="semester-asc">Semester (Low–High)</option>
              <option value="semester-desc">Semester (High–Low)</option>
              <option value="department">Department</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button type="button" className="sl-clear-filters" onClick={clearAllFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Create Student Modal Overlay */}
      {showForm && (
        <div
          className="sl-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Register new student"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForm(false);
          }}
        >
          <div className="sl-modal">
            <StudentForm fetchStudents={fetchStudents} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="sl-error" role="alert">
          <div className="sl-error__content">
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <strong className="sl-error__title">Directory Connection Issue</strong>
              <p className="sl-error__desc">{error}</p>
            </div>
          </div>
          <button type="button" className="sl-error-retry" onClick={fetchStudents}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="sl-loading" role="status" aria-live="polite">
          <div className="sl-spinner" aria-hidden="true" />
          <p>Loading student directory records…</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="sl-empty">
          <div className="sl-empty__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3>
            {hasActiveFilters
              ? "No student records match your current filters"
              : "No students registered yet"}
          </h3>
          <p>
            {hasActiveFilters
              ? "Try adjusting your search keywords, department selection, or semester filter."
              : "Begin building the academic registry by enrolling your first student record."}
          </p>
          <div className="sl-empty__actions">
            {hasActiveFilters ? (
              <button type="button" className="sl-clear-filters" onClick={clearAllFilters}>
                Clear Active Filters
              </button>
            ) : (
              <button type="button" className="sl-add-btn" onClick={() => setShowForm(true)}>
                Enroll First Student
              </button>
            )}
          </div>
        </div>
      )}

      {/* Student Cards Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="sl-grid">
          {filtered.map((student) => {
            const status = getStudentStatus(student);

            return (
              <article
                className="sl-card"
                key={student.id}
                onClick={() => navigate(`/students/${student.id}`)}
                tabIndex={0}
                role="button"
                aria-label={`View profile for ${student.firstName} ${student.lastName}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/students/${student.id}`);
                  }
                }}
              >
                <div className="sl-card__top">
                  <div className="sl-card__identity">
                    <div className="sl-card__avatar" aria-hidden="true">
                      {getInitials(student.firstName, student.lastName)}
                    </div>
                    <div className="sl-card__info">
                      <div className="sl-card__name-row">
                        <h3 className="sl-card__name">
                          {student.firstName} {student.lastName}
                        </h3>
                        {student.id && (
                          <span className="sl-card__id">#{student.id}</span>
                        )}
                      </div>
                      <p className="sl-card__email">{student.email || "No email provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="sl-card__body">
                  <div className="sl-card__meta">
                    <span className="sl-card__tag sl-card__tag--dept">
                      {student.department || "Unassigned Dept"}
                    </span>
                    <span className="sl-card__tag sl-card__tag--sem">
                      {student.semester ? `Semester ${student.semester}` : "Semester N/A"}
                    </span>
                  </div>

                  <div className={`sl-card__status sl-card__status--${status.tone}`}>
                    <span className="sl-card__status-dot" aria-hidden="true" />
                    {status.label}
                  </div>
                </div>

                <div className="sl-card__footer">
                  <span className="sl-card__view-link">
                    View Record
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <div className="sl-card__actions">
                    <button
                      type="button"
                      className="sl-card__edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingStudent(student);
                        setShowEditForm(true);
                      }}
                      aria-label={`Edit ${student.firstName} ${student.lastName}`}
                      title="Edit student record"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="sl-card__del"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStudentToDelete(student);
                      }}
                      disabled={deleting === student.id}
                      aria-label={`Delete ${student.firstName} ${student.lastName}`}
                      title="Delete student record"
                    >
                      {deleting === student.id ? (
                        <span className="sl-mini-spinner" />
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Edit Student Modal Overlay */}
      {showEditForm && editStudent && (
        <div
          className="sl-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Edit student record"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEditForm(false);
              setEditingStudent(null);
            }
          }}
        >
          <div className="sl-modal">
            <StudentForm
              fetchStudents={fetchStudents}
              onClose={() => {
                setShowEditForm(false);
                setEditingStudent(null);
              }}
              initialData={editStudent}
              isEditing={true}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div
          className="sl-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-student-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && deleting === null) {
              setStudentToDelete(null);
              setDeleteError("");
            }
          }}
        >
          <div className="sl-modal sl-delete-modal">
            <div className="sl-delete-modal__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 id="delete-student-title">Remove Student Record</h3>
            <p>
              Are you sure you want to permanently remove{" "}
              <strong>
                {studentToDelete.firstName} {studentToDelete.lastName}
              </strong>
              {studentToDelete.department ? ` (${studentToDelete.department})` : ""} from the
              academic registry? This action cannot be undone.
            </p>

            {deleteError && (
              <div className="sl-delete-modal__error" role="alert">
                {deleteError}
              </div>
            )}

            <div className="sl-delete-modal__actions">
              <button
                type="button"
                className="sl-delete-modal__btn-cancel"
                onClick={() => {
                  setStudentToDelete(null);
                  setDeleteError("");
                }}
                disabled={deleting !== null}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sl-delete-modal__btn-confirm"
                onClick={handleConfirmDelete}
                disabled={deleting !== null}
              >
                {deleting !== null ? "Removing Record…" : "Confirm Removal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;