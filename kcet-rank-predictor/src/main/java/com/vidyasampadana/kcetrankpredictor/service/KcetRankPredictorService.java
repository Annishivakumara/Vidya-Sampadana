package com.vidyasampadana.kcetrankpredictor.service;

import com.vidyasampadana.kcetrankpredictor.dto.*;
import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;

import java.util.List;

public interface KcetRankPredictorService {

    // Save student exam result
    KcetExamResultResponseDTO saveExamResult(KcetExamResultRequestDTO request);

    // Core prediction logic
    KcetRankPredictionResponseDTO predictRank(KcetRankPredictionRequestDTO request);

    // Get all predictions of a student
    List<KcetRankPredictionResponseDTO> getPredictionHistory(String studentId);

    // Admin - save cutoff data
    KcetCutoffDataResponseDTO saveCutoffData(KcetCutoffDataRequestDTO request);

    // Get cutoffs by year and category
    List<KcetCutoffDataResponseDTO> getCutoffData(Integer year, ExamCategory category);
}