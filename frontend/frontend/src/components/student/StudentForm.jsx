import { useState } from "react";
import { createStudent, updateStudent } from "../../services/studentService";
import "./StudentForm.css";

function StudentForm({ fetchStudents, onClose, initialData, isEditing=false }) {
  const [student, setStudent] = useState(
    initialData || {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    department: "",
    semester: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if(isEditing && initialData?.id){
        await updateStudent(initialData.id, student);
      }else{
      await createStudent(student);
      }
      setStudent({
        firstName: "", lastName: "", email: "",
        dateOfBirth: "", department: "", semester: "", address: "",
      });
      setSuccess(true);
      fetchStudents();
      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 1800);
    } catch (err) {
      setError("Failed to save student. Please check the server and try again.");
      console.error("Error Creating Student:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-card">
      <div className="sf-header">
        <div>
          <h2 className="sf-title">
            {isEditing ? "Edit Student" : "Student Registration"}
          </h2>          
          <p className="sf-sub">{isEditing ? "Update student information." : "Join Vidya-Sampadana and begin your learning journey."}</p>
        </div>
        {onClose && (
          <button className="sf-close" onClick={onClose} aria-label="Close form">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {success && (
        <div className="sf-success">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          {isEditing ? "Student updated successfully!" : "Student registered successfully!"}
        </div>
      )}

      {error && (
        <div className="sf-error">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="sf-form">
        <div className="sf-row">
          <div className="sf-group">
            <label htmlFor="sf-firstName">First Name</label>
            <input id="sf-firstName" type="text" name="firstName" value={student.firstName} onChange={handleChange} placeholder="John" required />
          </div>
          <div className="sf-group">
            <label htmlFor="sf-lastName">Last Name</label>
            <input id="sf-lastName" type="text" name="lastName" value={student.lastName} onChange={handleChange} placeholder="Doe" required />
          </div>
        </div>

        <div className="sf-group">
          <label htmlFor="sf-email">Email Address</label>
          <input id="sf-email" type="email" name="email" value={student.email} onChange={handleChange} placeholder="john.doe@example.com" required />
        </div>

        <div className="sf-group">
          <label htmlFor="sf-dob">Date of Birth</label>
          <input id="sf-dob" type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={handleChange} required />
        </div>

        <div className="sf-row">
          <div className="sf-group">
            <label htmlFor="sf-dept">Department</label>
            <input id="sf-dept" type="text" name="department" value={student.department} onChange={handleChange} placeholder="Computer Science" required />
          </div>
          
          <div className="sf-group">
            <label htmlFor="sf-sem">Semester</label>
            <input id="sf-sem" type="number" name="semester" value={student.semester} onChange={handleChange} placeholder="1–8" min="1" max="8" required />
          </div>
        </div>

        <div className="sf-group">
          <label htmlFor="sf-addr">Address</label>
          <textarea id="sf-addr" name="address" value={student.address} onChange={handleChange} rows="3" placeholder="Enter full address" required></textarea>
        </div>

        <button type="submit" className="sf-btn" disabled={loading}>
            {loading ? <span className="sf-spinner" /> : (isEditing ? "Update Student" : "Register Student")}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
