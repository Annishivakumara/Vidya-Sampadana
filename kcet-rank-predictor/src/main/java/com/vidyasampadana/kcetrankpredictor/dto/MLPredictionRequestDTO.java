package com.vidyasampadana.kcetrankpredictor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MLPredictionRequestDTO {
    private Double physics_marks;
    private Double chemistry_marks;
    private Double maths_marks;
    private String category;
}
