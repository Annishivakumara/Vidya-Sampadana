package com.vidyasampadana.student_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAddressInfoDTO {


    private String addressType;
    @NotBlank(message="Street Address is Required ")
    private String streetAddress;
    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Postal code is required")
    private String postalCode;
    private String country="India";

    private Boolean isPrimary;
}
