import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";
import StudentForm from "./StudentForm";

function StudentList() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data);

        } catch (error) {

            console.error("Error fetching students:", error);
        }
    };

    return (
        <div>

            <StudentForm fetchStudents={fetchStudents} />

            <h2>Student List</h2>

            {
                students.map((student) => (

                    <div key={student.id}>

                        <p>{student.firstName}</p>
                        <p>{student.email}</p>

                        <hr />

                    </div>
                ))
            }

        </div>
    );
}

export default StudentList;