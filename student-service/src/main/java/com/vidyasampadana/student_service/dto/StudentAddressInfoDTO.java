package com.vidyasampadana.student_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAddressInfoDTO {
    private String addressType;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;

    private Boolean isPrimary;
}
