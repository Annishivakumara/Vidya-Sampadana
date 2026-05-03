package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetCutoffDataResponseDTO {
    private Long id;
    private String collegeName;
    private String collegeCode;
    private String branchName;
    private String branchCode;
    private ExamCategory category;
    private Double cutoffMarks;
    private Integer cutoffRank;
    private Integer examYear;
}