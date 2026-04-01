package com.vidyasampadana.student_service.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentRequestDTO {
    private Long id;
    private String studentId;
    // Nested relationship summaries
    private StudentContactInfoDTO contactInfoDTO;
    private StudentParentInfoDTO parentInfoDTO;
    private StudentAcademicProfileDTO academicProfileDTO;
    private StudentAddressInfoDTO studentAddressInfoDTO;
    private StudentExamScoresDTO examScoresDTO;
}