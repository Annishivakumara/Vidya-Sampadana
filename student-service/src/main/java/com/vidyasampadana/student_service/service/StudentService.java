package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;

import java.util.List;

public interface StudentService {
     StudentResponseDTO createStudent(studentRequestDTO request);
     StudentResponseDTO getStudentByStudentId(String studentId);
     List<StudentResponseDTO> getAllStudents();
      StudentResponseDTO updateStudentByStudentId(String studentId, studentRequestDTO requestDTO);
     void deleteStudentByStudentId(String studentId);
}
