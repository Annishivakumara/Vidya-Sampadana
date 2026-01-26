package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.entity.Students;
import com.vidyasampadana.student_service.exception.DuplicateStudentException;
import com.vidyasampadana.student_service.exception.StudentNotFoundException;
import com.vidyasampadana.student_service.mapper.StudentMapper;
import com.vidyasampadana.student_service.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class StudentServiceImli implements StudentService{

    // Not Used @Auto Wired Becz it Won't Allow The Reppo's means
    // Auto wire won't work when declare with final
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentServiceImli(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }


    @Override
    public StudentResponseDTO createStudent(studentRequestDTO requestDTO) {
        if(studentRepository.existsByStudentId(requestDTO.getStudentId())){
            throw new DuplicateStudentException("Student With Same Id Already Exists"+requestDTO.getStudentId());
        }
        Students students=studentMapper.toEntity(requestDTO);
        Students saveStudent=studentRepository.save(students);
        return studentMapper.toDTO(saveStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDTO> getAllStudents( ) {
       return    studentRepository.findAll()
                .stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByStudentId(String userId) {
       Students students= studentRepository.findByStudentId(userId)
               .orElseThrow(()-> new StudentNotFoundException("Student Not Found "+userId));
        return  studentMapper.toDTO(students);
    }

    @Override
    public StudentResponseDTO updateStudentByStudentId(String studentId, studentRequestDTO requestDTO) {
            Students ExistsStudent= studentRepository.findByStudentId(studentId).orElseThrow(()-> new StudentNotFoundException("Student With  That Id Not Found "+studentId));

            if(!ExistsStudent.getStudentId().equals(requestDTO.getStudentId()) && studentRepository.existsByStudentId(requestDTO.getStudentId())){
                    throw new DuplicateStudentException("Student Id Not Found "+requestDTO.getStudentId());
            }
            studentMapper.updateStudentFromDto(requestDTO , ExistsStudent);
            Students students= studentRepository.save(ExistsStudent);
            return  studentMapper.toDTO(students);
        }


    @Override
    public void deleteStudentByStudentId(String studentId) {
            Students students= studentRepository.findByStudentId(studentId)
                    .orElseThrow(()->  new StudentNotFoundException("Student With User id Not Found "+studentId));
             studentRepository.delete(students);
    }

}
