package com.vidyasampadana.kcetrankpredictor.repository;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import com.vidyasampadana.kcetrankpredictor.entity.KcetExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KcetExamResultRepository
        extends JpaRepository<KcetExamResult, Long> {

    List<KcetExamResult> findByStudentId(String studentId);

    List<KcetExamResult> findByStudentIdAndExamYear(
            String studentId, Integer examYear);

    Optional<KcetExamResult> findByStudentIdAndExamYearAndCategory(
            String studentId, Integer examYear, ExamCategory category);
}