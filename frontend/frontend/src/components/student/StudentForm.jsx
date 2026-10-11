import { useEffect, useState } from "react";
import { createStudent, updateStudent } from "../../services/studentService";
import "./StudentForm.css";

const emptyStudent = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  department: "",
  semester: "",
  address: "",
};

const normalizeDate = (value) => {
  if (!value) return "";
  if (typeof value !== "string") return "";

  return value.includes("T") ? value.split("T")[0] : value;
};

function StudentForm({ fetchStudents, onClose, initialData, isEditing = false }) {
  const [student, setStudent] = useState(emptyStudent);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setStudent({
        ...emptyStudent,
        ...initialData,
        dateOfBirth: normalizeDate(initialData.dateOfBirth),
        semester: initialData.semester ?? "",
        address: initialData.address ?? "",
      });
      return;
    }

    setStudent(emptyStudent);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing && initialData?.id) {
        await updateStudent(initialData.id, student);
      } else {
        await createStudent(student);
      }

      setStudent(emptyStudent);
      setSuccess(true);
      if (fetchStudents) fetchStudents();

      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 1200);
    } catch (err) {
      const serverMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "");
      setError(
        serverMsg ||
          "Unable to save student record. Please check that the email is unique and the Student Service is reachable."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-card">
      <div className="sf-header">
        <div>
          <span className="sf-eyebrow">
            {isEditing
              ? `Academic Record · ID #${initialData?.id || ""}`
              : "Academic Registry Enrollment"}
          </span>
          <h2 className="sf-title">
            {isEditing ? "Update Student Record" : "Enroll New Student"}
          </h2>
          <p className="sf-sub">
            {isEditing
              ? "Modify verified academic placement, contact details, or residential address."
              : "Enter official student details to create a record in the Vidya-Sampadana registry."}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            className="sf-close"
            onClick={onClose}
            aria-label="Close student form"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {success && (
        <div className="sf-success" role="status" aria-live="polite">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {isEditing
              ? "Student record updated in the Academic Registry."
              : "Student record created and added to the Academic Registry."}
          </span>
        </div>
      )}

      {error && (
        <div className="sf-error" role="alert">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="sf-form">
        <div className="sf-row">
          <div className="sf-group">
            <label htmlFor="sf-firstName">
              First Name <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-firstName"
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              placeholder="e.g., Aarav"
              autoComplete="given-name"
              required
            />
          </div>
          <div className="sf-group">
            <label htmlFor="sf-lastName">
              Last Name <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-lastName"
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              placeholder="e.g., Kulkarni"
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        <div className="sf-row">
          <div className="sf-group">
            <label htmlFor="sf-email">
              Institutional or Personal Email <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-email"
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="student@example.edu"
              autoComplete="email"
              required
            />
          </div>

          <div className="sf-group">
            <label htmlFor="sf-dob">
              Date of Birth <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-dob"
              type="date"
              name="dateOfBirth"
              value={student.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="sf-row">
          <div className="sf-group">
            <label htmlFor="sf-dept">
              Academic Department <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-dept"
              type="text"
              name="department"
              value={student.department}
              onChange={handleChange}
              placeholder="e.g., Computer Science & Engineering"
              required
            />
          </div>

          <div className="sf-group">
            <label htmlFor="sf-sem">
              Current Semester (1–8) <span className="sf-req" aria-hidden="true">*</span>
            </label>
            <input
              id="sf-sem"
              type="number"
              name="semester"
              value={student.semester}
              onChange={handleChange}
              placeholder="1 to 8"
              min="1"
              max="8"
              required
            />
          </div>
        </div>

        <div className="sf-group">
          <label htmlFor="sf-addr">
            Residential / Campus Address <span className="sf-req" aria-hidden="true">*</span>
          </label>
          <textarea
            id="sf-addr"
            name="address"
            value={student.address}
            onChange={handleChange}
            rows="3"
            placeholder="Enter complete residential or hostel address"
            required
          />
        </div>

        <div className="sf-footer">
          {onClose && (
            <button
              type="button"
              className="sf-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="sf-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="sf-spinner" aria-hidden="true" />
                <span>{isEditing ? "Saving Changes…" : "Enrolling Student…"}</span>
              </>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Enroll Student"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
