package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetExamResultRequestDTO {

    @NotBlank(message = "Student ID is required")
    private String studentId;

    @NotNull
    @Min(0) @Max(60)
    private Double physicsMarks;

    @NotNull @Min(0) @Max(60)
    private Double chemistryMarks;

    @NotNull @Min(0) @Max(60)
    private Double mathsMarks;

    @NotNull
    private Integer examYear;

    @NotNull
    private ExamCategory category;
}