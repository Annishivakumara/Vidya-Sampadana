package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.PredictionChance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetCollegePredictionDTO {
    private Long id;
    private String collegeName;
    private String branchName;
    private PredictionChance chance;   // HIGH, MEDIUM, LOW
}