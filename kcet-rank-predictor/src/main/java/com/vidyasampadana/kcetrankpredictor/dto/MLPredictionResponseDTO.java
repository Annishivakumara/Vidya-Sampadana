package com.vidyasampadana.kcetrankpredictor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MLPredictionResponseDTO {
    private Integer predicted_rank_min;
    private Integer predicted_rank_max;
    private Integer predicted_rank;
    private Double confidence_score;
    private String category;
    private Double total_marks;
}
