package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetRankPredictionRequestDTO {

    @NotBlank(message = "Student ID is required")
    private String studentId;

    @NotNull
    private Double totalMarks;

    @NotNull
    private ExamCategory category;

    @NotNull
    private Integer predictionYear;
}