package com.vidyasampadana.kcetrankpredictor.repository;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import com.vidyasampadana.kcetrankpredictor.entity.KcetCutoffData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KcetCutoffDataRepository
        extends JpaRepository<KcetCutoffData, Long> {

    List<KcetCutoffData> findByCategoryAndExamYear(
            ExamCategory category, Integer examYear);

    List<KcetCutoffData> findByCollegeCodeAndExamYear(
            String collegeCode, Integer examYear);

    List<KcetCutoffData> findByBranchCodeAndCategory(
            String branchCode, ExamCategory category);

    // Find cutoffs where marks are less than or equal to student marks
    List<KcetCutoffData> findByCategoryAndExamYearAndCutoffMarksLessThanEqual(
            ExamCategory category, Integer examYear, Double marks);
}