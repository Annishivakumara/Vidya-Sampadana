package com.vidyasampadana.student_service.repository;

import com.vidyasampadana.student_service.entity.AcademicStream;
import com.vidyasampadana.student_service.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Students, Long > {
    Optional<Students> findByStudentId(String studentId);
    boolean existsByStudentId(String studentId);

    // FIX: Added Pageable — must match service call
    Page<Students> findByContactInfo_FirstNameContainingIgnoreCase(String firstName, Pageable pageable);
    Page<Students> findByContactInfo_LastNameContainingIgnoreCase(String lastName, Pageable pageable);
    Page<Students> findByContactInfo_FullNameContainingIgnoreCase(String fullName, Pageable pageable);

    // --- Lookup by contact details ---
    // ADDED: Find by email (needed for login / duplicate check)
    Optional<Students> findByContactInfo_Email(String email);

    // ADDED: Find by phone number
    Optional<Students> findByContactInfo_Phone(String phone);

    // --- Existence checks (for validation before save) ---
    // ADDED: Check email uniqueness before registering a new student
    boolean existsByContactInfo_Email(String email);

    // ADDED: Check phone uniqueness before registering a new student
    boolean existsByContactInfo_Phone(String phone);

    // --- Filter by academic info ---
    // ADDED: Find all students in a particular stream (SCIENCE, ARTS etc.)
    Page<Students> findByAcademicProfile_Stream(AcademicStream stream, Pageable pageable);

    // ADDED: Find all students in a particular school
    Page<Students> findByAcademicProfile_SchoolNameContainingIgnoreCase(String schoolName, Pageable pageable);
}
