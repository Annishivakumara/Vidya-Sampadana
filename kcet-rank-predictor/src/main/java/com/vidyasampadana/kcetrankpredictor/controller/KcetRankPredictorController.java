package com.vidyasampadana.kcetrankpredictor.controller;

import com.vidyasampadana.kcetrankpredictor.dto.*;
import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import com.vidyasampadana.kcetrankpredictor.service.KcetRankPredictorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kcet-rank-predictor")
@RequiredArgsConstructor
public class KcetRankPredictorController {

    private final KcetRankPredictorService service;

    // 1. Submit student marks
    @PostMapping("/results")
    public ResponseEntity<KcetExamResultResponseDTO> saveResult(
            @Valid @RequestBody KcetExamResultRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.saveExamResult(request));
    }

    // 2. Predict rank based on marks
    @PostMapping("/predict")
    public ResponseEntity<KcetRankPredictionResponseDTO> predictRank(
            @Valid @RequestBody KcetRankPredictionRequestDTO request) {
        return ResponseEntity.ok(service.predictRank(request));
    }

    // 3. Get prediction history of a student
    @GetMapping("/history/{studentId}")
    public ResponseEntity<List<KcetRankPredictionResponseDTO>> getHistory(
            @PathVariable String studentId) {
        return ResponseEntity.ok(service.getPredictionHistory(studentId));
    }

    // 4. Add cutoff data (admin only)
    @PostMapping("/cutoff")
    public ResponseEntity<KcetCutoffDataResponseDTO> addCutoff(
            @Valid @RequestBody KcetCutoffDataRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.saveCutoffData(request));
    }

    // 5. Get cutoffs by year and category
    @GetMapping("/cutoff")
    public ResponseEntity<List<KcetCutoffDataResponseDTO>> getCutoffs(
            @RequestParam Integer year,
            @RequestParam ExamCategory category) {
        return ResponseEntity.ok(service.getCutoffData(year, category));
    }
}