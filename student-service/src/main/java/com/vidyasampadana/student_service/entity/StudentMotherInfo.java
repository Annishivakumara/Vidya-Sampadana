package com.vidyasampadana.student_service.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class StudentMotherInfo {

    @Column(name = "motherName", length = 255, nullable = false)
    private String name;

    @Column(name = "motherPhone", length = 20)
    private String phone;

    @Column(name = "motherEmail", length = 255)
    private String email;

    @Column(name = "motherOccupation", length = 100)
    private String occupation;

    @Column(name = "motherCompany", length = 255)
    private String company;

    @Column(name = "motherDesignation", length = 100)
    private String designation;

    @Column(name = "motherAge")
    private Integer age;

    @Column(name = "motherQualification", length = 100)
    private String qualification;

    @Column(name = "mother_is_alive", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isAlive = true;
}
