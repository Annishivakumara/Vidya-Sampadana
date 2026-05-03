package com.vidyasampadana.student_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentContactInfoDTO {
    @NotBlank(message = "First name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = " last name s Required")
    private String lastName;

    @NotBlank(message = "Email  is is Required ")
    @Email(message="Email  format is invalid ")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$" , message = "Phone Nunber is Invalid ")
    private String phone;

    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Alternate phone number format is invalid")
    private String alternatePhone;

    private LocalDate dateOfBirth;
    private String gender;
    private String bloodGroup;
    private String nationality;
}
