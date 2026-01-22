package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class studentResponsedto {
    private long id;
    private String studentId;

    // Nested relationship summaries
    private StudentContactInfoDTO contactInfoDTO;
    private StudentParentInfoDTO parentInfoDTO;
    private StudentAcademicProfileDTO academicProfileDTO;
    private StudentAddressInfoDTO studentAddressInfoDTO;
    private StudentExamScoresDTO examScoresDTO;
}
