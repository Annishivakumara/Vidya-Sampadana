package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentGuardianInfoDTO {
    private String name;
    private String phone;
    private String email;
    private String relationship;
    private String occupation;
    private String company;
    private Integer age;
    private Boolean isPrimaryContact;
    private Boolean isEmergencyContact;
}
