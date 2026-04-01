package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.entity.Students;
import com.vidyasampadana.student_service.exception.DuplicateStudentException;
import com.vidyasampadana.student_service.exception.StudentNotFoundException;
import com.vidyasampadana.student_service.mapper.StudentMapper;
import com.vidyasampadana.student_service.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    @Transactional
    public StudentResponseDTO createStudent(StudentRequestDTO requestDTO) {
        if (studentRepository.existsByStudentId(requestDTO.getStudentId())) {
            throw new DuplicateStudentException(
                    "Student With Same Id Already Exists: " + requestDTO.getStudentId()
            );
        }
        Students student = studentMapper.toEntity(requestDTO);
        Students savedStudent = studentRepository.save(student);
        return studentMapper.toDTO(savedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(studentMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByStudentId(String studentId) {
        Students student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student Not Found: " + studentId
                ));
        return studentMapper.toDTO(student);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDTO> getStudentsByName(String name) {
        return studentRepository.findByContactInfo_FirstNameContainingIgnoreCase(name)
                .stream()
                .map(studentMapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudentByStudentId(String studentId, StudentRequestDTO requestDTO) {
        Students existingStudent = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student With That Id Not Found: " + studentId
                ));

        if (!existingStudent.getStudentId().equals(requestDTO.getStudentId())
                && studentRepository.existsByStudentId(requestDTO.getStudentId())) {
            throw new DuplicateStudentException(
                    "Student With Same Id Already Exists: " + requestDTO.getStudentId()
            );
        }

        studentMapper.updateStudentFromDto(requestDTO, existingStudent);
        Students updatedStudent = studentRepository.save(existingStudent);
        return studentMapper.toDTO(updatedStudent);
    }

    @Override
    @Transactional
    public void deleteStudentByStudentId(String studentId) {
        Students student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student With Id Not Found: " + studentId
                ));
        studentRepository.delete(student);
    }

    @Override
    public boolean existsByStudentId(String studentId) {
        return studentRepository.existsByStudentId(studentId);
    }

    @Override
    public long countStudents() {
        return studentRepository.count();
    }
}