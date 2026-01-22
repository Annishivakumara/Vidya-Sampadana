package com.vidyasampadana.student_service.repository;

import com.vidyasampadana.student_service.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Students, String> {
    Optional<Students> findByStudentId(String studentId);
    boolean existsByStudentId(String studentId);
}
