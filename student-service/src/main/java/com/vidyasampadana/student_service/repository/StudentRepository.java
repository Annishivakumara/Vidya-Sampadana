package com.vidyasampadana.student_service.repository;

import com.vidyasampadana.student_service.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Students, Long > {

}
