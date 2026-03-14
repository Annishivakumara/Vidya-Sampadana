package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentContactInfoDTO {
    private String firstName;
    private String middleName;
    private String lastName;
    private String fullName;
    private String email;
    private String phone;
    private String alternatePhone;
    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String nationality;
}
