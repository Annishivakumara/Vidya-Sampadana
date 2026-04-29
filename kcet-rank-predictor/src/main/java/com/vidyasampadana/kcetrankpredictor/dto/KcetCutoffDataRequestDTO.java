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
public class KcetCutoffDataRequestDTO {

    @NotBlank(message = "College name is required")
    private String collegeName;

    @NotBlank(message = "College code is required")
    private String collegeCode;

    @NotBlank(message = "Branch name is required")
    private String branchName;

    @NotBlank(message = "Branch code is required")
    private String branchCode;

    @NotNull
    private ExamCategory category;

    @NotNull
    private Double cutoffMarks;

    @NotNull
    private Integer cutoffRank;

    @NotNull
    private Integer examYear;
}