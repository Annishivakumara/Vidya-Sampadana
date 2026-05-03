package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {

    private Long id;
    private String studentId;

    private StudentContactInfoDTO contactInfo;
    private StudentParentInfoDTO parentInfo;
    private StudentAcademicProfileDTO academicProfile;
    private List<StudentAddressInfoDTO> addressList;
    private List<StudentExamScoresDTO> examScores;
}