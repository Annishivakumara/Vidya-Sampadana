package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;

import java.util.List;

public interface StudentService {

     // Create
     StudentResponseDTO createStudent(StudentRequestDTO request);

     // Read
     StudentResponseDTO getStudentByStudentId(String studentId);
     List<StudentResponseDTO> getAllStudents();
     List<StudentResponseDTO> getStudentsByName(String name);

     // Update
     StudentResponseDTO updateStudentByStudentId(String studentId, StudentRequestDTO requestDTO);

     // Delete
     void deleteStudentByStudentId(String studentId);

     // Utility
     boolean existsByStudentId(String studentId);
     long countStudents();
}