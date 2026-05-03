package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetRankPredictionResponseDTO {
    private Long id;
    private String studentId;
    private Double totalMarks;
    private Integer predictedRankMin;
    private Integer predictedRankMax;
    private ExamCategory category;
    private Integer predictionYear;
    private List<KcetCollegePredictionDTO> eligibleColleges;
    private LocalDateTime predictedAt;
}