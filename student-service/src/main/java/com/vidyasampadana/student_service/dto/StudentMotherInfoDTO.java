package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentMotherInfoDTO {
    private String name;
    private String phone;
    private String email;
    private String occupation;
    private String company;
    private String designation;
    private Integer age;
    private String qualification;
    private Boolean isAlive;

}
