package com.vidyasampadana.student_service.dto;

<<<<<<< HEAD
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
=======
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequestDTO {

    @Valid
    @NotNull(message = "Contact info is required")
    private StudentContactInfoDTO contactInfo;

    @Valid
    private StudentParentInfoDTO parentInfo;

    @Valid
    private StudentAcademicProfileDTO academicProfile;

    @Valid
    private List<StudentAddressInfoDTO> addressList;

    @Valid
    private List<StudentExamScoresDTO> examScores;
>>>>>>> sub_me/main
}