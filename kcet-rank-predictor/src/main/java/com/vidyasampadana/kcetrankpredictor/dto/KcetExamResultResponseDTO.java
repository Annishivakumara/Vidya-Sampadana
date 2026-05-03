package com.vidyasampadana.kcetrankpredictor.dto;

import com.vidyasampadana.kcetrankpredictor.entity.ExamCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KcetExamResultResponseDTO {
    private Long id;
    private String studentId;
    private Double physicsMarks;
    private Double chemistryMarks;
    private Double mathsMarks;
    private Double totalMarks;
    private Integer examYear;
    private ExamCategory category;
    private LocalDateTime createdAt;
}