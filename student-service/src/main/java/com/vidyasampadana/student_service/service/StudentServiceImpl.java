package com.vidyasampadana.student_service.service;

import com.vidyasampadana.student_service.dto.StudentRequestDTO;
import com.vidyasampadana.student_service.dto.StudentResponseDTO;
import com.vidyasampadana.student_service.entity.Students;
import com.vidyasampadana.student_service.exception.DuplicateStudentException;
import com.vidyasampadana.student_service.exception.StudentNotFoundException;
import com.vidyasampadana.student_service.mapper.StudentMapper;
import com.vidyasampadana.student_service.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        // FIX: Removed wrong check on requestDTO.getStudentId()
        //      studentId is no longer in RequestDTO — server generates it via @PrePersist
        //      Old code: existsByStudentId(requestDTO.getStudentId()) — always null → NullPointerException
        //      New code: check email AND phone for duplicates — the real unique fields

        String email = requestDTO.getContactInfo().getEmail();
        String phone = requestDTO.getContactInfo().getPhone();

        if (studentRepository.existsByContactInfo_Email(email)) {
            throw new DuplicateStudentException(
                    "A student with this email already exists: " + email
            );
        }

        if (studentRepository.existsByContactInfo_Phone(phone)) {
            throw new DuplicateStudentException(
                    "A student with this phone number already exists: " + phone
            );
        }

        Students student = studentMapper.toEntity(requestDTO);
        Students savedStudent = studentRepository.save(student);
        return studentMapper.toDTO(savedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getAllStudents(Pageable pageable) {
        // FIX: Changed from findAll() to findAll(pageable)
        //      Old code loaded ALL students into memory — OutOfMemoryError with large data
        //      New code returns a Page — only fetches what is needed
        return studentRepository.findAll(pageable)
                .map(studentMapper::toDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentByStudentId(String studentId) {
        Students student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with ID: " + studentId
                ));
        return studentMapper.toDTO(student);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getStudentsByName(String name, Pageable pageable) {
        // FIX: Added Pageable parameter — matches the fixed repository signature
        //      Old code called findByContactInfo_FirstNameContainingIgnoreCase(name)
        //      which no longer exists — would cause compile error
        return studentRepository
                .findByContactInfo_FirstNameContainingIgnoreCase(name, pageable)
                .map(studentMapper::toDTO);
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudentByStudentId(String studentId, StudentRequestDTO requestDTO) {
        Students existingStudent = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with ID: " + studentId
                ));

        // FIX: Removed wrong check on requestDTO.getStudentId()
        //      studentId is no longer in RequestDTO — that check caused compile error
        //      Instead check if the new email/phone belongs to a DIFFERENT student
        String newEmail = requestDTO.getContactInfo().getEmail();
        String newPhone = requestDTO.getContactInfo().getPhone();

        // Check email conflict — only throw if email belongs to a different student
        studentRepository.findByContactInfo_Email(newEmail).ifPresent(existing -> {
            if (!existing.getStudentId().equals(studentId)) {
                throw new DuplicateStudentException(
                        "This email is already used by another student: " + newEmail
                );
            }
        });

        // Check phone conflict — only throw if phone belongs to a different student
        studentRepository.findByContactInfo_Phone(newPhone).ifPresent(existing -> {
            if (!existing.getStudentId().equals(studentId)) {
                throw new DuplicateStudentException(
                        "This phone is already used by another student: " + newPhone
                );
            }
        });

        studentMapper.updateStudentFromDto(requestDTO, existingStudent);
        Students updatedStudent = studentRepository.save(existingStudent);
        return studentMapper.toDTO(updatedStudent);
    }

    @Override
    @Transactional
    public void deleteStudentByStudentId(String studentId) {
        Students student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student not found with ID: " + studentId
                ));
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    // FIX: Added @Transactional(readOnly = true) — was missing on utility read methods
    public boolean existsByStudentId(String studentId) {
        return studentRepository.existsByStudentId(studentId);
    }

    @Override
    @Transactional(readOnly = true)
    // FIX: Added @Transactional(readOnly = true) — was missing on utility read methods
    public long countStudents() {
        return studentRepository.count();
    }
}
