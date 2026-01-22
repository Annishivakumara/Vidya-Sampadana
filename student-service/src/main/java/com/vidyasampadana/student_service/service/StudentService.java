package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;

public interface StudentService {
     studentResponsedto createStudent(studentRequestDTO request);
     studentResponsedto getStudentByUserId(String studentId);
    List<studentResponsedto> getAllStudents();
      studentResponsedto updateStudentByUserId(String studentId, studentRequestDTO requestDTO);
     void deleteStudentByUserId(String studentId);
}
