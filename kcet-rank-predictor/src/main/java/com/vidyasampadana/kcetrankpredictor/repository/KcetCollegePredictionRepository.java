package com.vidyasampadana.kcetrankpredictor.repository;

import com.vidyasampadana.kcetrankpredictor.entity.KcetCollegePrediction;
import com.vidyasampadana.kcetrankpredictor.entity.PredictionChance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KcetCollegePredictionRepository
        extends JpaRepository<KcetCollegePrediction, Long> {

    List<KcetCollegePrediction> findByPredictionId(Long predictionId);

    List<KcetCollegePrediction> findByPredictionIdAndChance(
            Long predictionId, PredictionChance chance);
}