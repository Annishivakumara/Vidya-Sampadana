package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {

<<<<<<< HEAD
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
=======
     StudentResponseDTO createStudent(StudentRequestDTO request);

     StudentResponseDTO getStudentByStudentId(String studentId);

     // FIX: Page + Pageable imports required
     Page<StudentResponseDTO> getAllStudents(Pageable pageable);
     Page<StudentResponseDTO> getStudentsByName(String name, Pageable pageable);

     StudentResponseDTO updateStudentByStudentId(String studentId, StudentRequestDTO requestDTO);

     void deleteStudentByStudentId(String studentId);

>>>>>>> sub_me/main
     boolean existsByStudentId(String studentId);
     long countStudents();
}