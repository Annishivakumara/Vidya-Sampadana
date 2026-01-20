package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.studentRequestDTO;
import com.vidyasampadana.student_service.dto.studentResponsedto;
import com.vidyasampadana.student_service.entity.Students;
import com.vidyasampadana.student_service.exception.DuplicateStudentException;
import com.vidyasampadana.student_service.exception.StudentNotFoundException;
import com.vidyasampadana.student_service.mapper.StudentMapper;
import com.vidyasampadana.student_service.repository.StudentRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;

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
        if(studentRepository.existsByUserId(requestDTO.getStudentId())){
            throw new DuplicateStudentException("Student With Same Id Already Exists"+requestDTO.getStudentId());
        }
        Students students=studentMapper.toEntity(requestDTO);
        Students saveStudent=studentRepository.save(students);
        return studentMapper.toDTO(saveStudent);
    }

    @Override
    public studentResponsedto getStudentById(long id) {
        if(studentRepository.existsById(id)){
            throw new StudentNotFoundException("Student With That id Not Found"+id);
        }
   return null;
    }

    @Override
    public studentResponsedto getStudentByUserId(String userId) {
        return null;
    }

    @Override
    public Page<studentResponsedto> getAllStudents(Pageable pageable) {
        return null;
    }

    @Override
    public studentResponsedto updateStudent(long id, studentRequestDTO request) {
        return null;
    }

    @Override
    public studentResponsedto updateStudentByUserId(String userId, studentRequestDTO requestDTO) {
        return null;
    }

    @Override
    public void deleteStudent(long id) {

    }

    @Override
    public void deleteStudentByUserId(String userId) {

    }

    @Override
    public Boolean checkStudentExists(String userId) {
        return null;
    }
}
