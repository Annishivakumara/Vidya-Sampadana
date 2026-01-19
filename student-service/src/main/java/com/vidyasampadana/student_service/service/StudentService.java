package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

public interface StudentService {
    public  studentResponsedto createStudent(studentRequestDTO request);
    public  studentResponsedto getStudentById(long id);
    public  studentResponsedto getStudentByUserId(String userId);
    public  Page<studentResponsedto> getAllStudents(Pageable pageable);
    public  studentResponsedto updateStudent(long id, studentRequestDTO request);
    public  studentResponsedto updateStudentByUserId(String userId, studentRequestDTO requestDTO);
    public  void deleteStudent(long id);
    public  void deleteStudentByUserId(String userId);
    public  Boolean checkStudentExists(String userId);
}
