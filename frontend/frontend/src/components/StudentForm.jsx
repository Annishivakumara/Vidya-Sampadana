import { useState } from "react";
import { createStudent } from "../services/studentService";

function StudentForm({fetchStudents}){
    const [student, setStudent]=useState({
        firstName:"",
        email:""
    });
    const handleChange=(event)=>{
        setStudent({
            ...student, 
            [event.target.name]:event.target.value
        });
    };
    const handleSubmit=async (event)=>{
        event.preventDefault();
        console.log(student);
        try {
            await createStudent(student);
            setStudent({
                firstName:"",
                email:""
            });
            fetchStudents();
        } catch (error) {
            console.error("Error Creating Student:",error);
        }
    };
    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                        type="text"
                        name="firstName"
                        placeholder="Enter Name"
                        value={student.firstName}
                        onChange={handleChange}
                />
                <br /><br />
                <input type="email" 
                        name="email" 
                        placeholder="Enter Email"
                        value={student.email}
                        onChange={handleChange}
                        />
                        <br /><br />
                        <button type="submit">
                            Add Student
                        </button>
            </form>
        </div>
    )
}

export default StudentForm;