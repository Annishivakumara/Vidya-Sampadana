package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentParentInfoDTO {
    private String id;
    private StudentFatherInfoDTO fatherInfo;
    private StudentMotherInfoDTO motherInfo;
    private StudentGuardianInfoDTO guardianInfo;
}
