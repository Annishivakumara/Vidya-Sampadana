package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
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
    public studentResponsedto createStudent(studentRequestDTO requestDTO) {
        if(studentRepository.existsByStudentId(requestDTO.getStudentId())){
            throw new DuplicateStudentException("Student With Same Id Already Exists"+requestDTO.getStudentId());
        }
        Students students=studentMapper.toEntity(requestDTO);
        Students saveStudent=studentRepository.save(students);
        return studentMapper.toDTO(saveStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<studentResponsedto> getAllStudents( ) {
       return    studentRepository.findAll()
                .stream()
                .map(studentMapper::toDTO)
                .collect(Collectors.toList());
    }


    @Override
    @Transactional(readOnly = true)
    public studentResponsedto getStudentByUserId(String userId) {
       Students students= studentRepository.findByStudentId(userId)
               .orElseThrow(()-> new StudentNotFoundException("Student Not Found "+userId));
        return  studentMapper.toDTO(students);
    }

    @Override
    public studentResponsedto updateStudentByUserId(String userId, studentRequestDTO requestDTO) {
            Students ExistsStudent= studentRepository.findByStudentId(userId).orElseThrow(()-> new StudentNotFoundException("Student With  That Id Not Found "+userId));

            if(!ExistsStudent.getStudentId().equals(requestDTO.getStudentId()) && studentRepository.existsByStudentId(requestDTO.getStudentId())){
                    throw new DuplicateStudentException("Student Id Not Found "+requestDTO.getStudentId());
            }
            studentMapper.updateStudentFromDto(requestDTO , ExistsStudent);
            Students students= studentRepository.save(ExistsStudent);
            return  studentMapper.toDTO(students);
        }


    @Override
    public void deleteStudentByUserId(String userId) {
            Students students= studentRepository.findByStudentId(userId)
                    .orElseThrow(()->  new StudentNotFoundException("Student With User id Not Found "+userId));
             studentRepository.delete(students);
    }

}
