package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentParentInfoDTO {
    private StudentFatherInfoDTO fatherInfo;
    private StudentMotherInfoDTO motherInfo;
    private StudentGuardianInfoDTO guardianInfo;
}
