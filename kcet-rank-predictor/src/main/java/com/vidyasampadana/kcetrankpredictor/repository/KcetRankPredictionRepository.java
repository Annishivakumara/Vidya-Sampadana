package com.vidyasampadana.kcetrankpredictor.repository;

import com.vidyasampadana.kcetrankpredictor.entity.KcetRankPrediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KcetRankPredictionRepository
        extends JpaRepository<KcetRankPrediction, Long> {

    List<KcetRankPrediction> findByStudentId(String studentId);

    List<KcetRankPrediction> findByStudentIdAndPredictionYear(
            String studentId, Integer predictionYear);

    Optional<KcetRankPrediction> findTopByStudentIdOrderByPredictedAtDesc(
            String studentId);
}