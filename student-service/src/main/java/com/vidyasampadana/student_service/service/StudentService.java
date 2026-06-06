package com.vidyasampadana.student_service.service;


import com.vidyasampadana.student_service.entity.Students;

import java.util.List;

public interface StudentService {

    Students createStudent(Students student);

    List<Students> getAllStudents();

    Students getStudentById(Long id);

    Students updateStudent(Long id, Students updateStudent);

    void deleteStudent(Long id);
}