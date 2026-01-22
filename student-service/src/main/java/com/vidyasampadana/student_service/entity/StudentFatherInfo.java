package com.vidyasampadana.student_service.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class StudentFatherInfo {


    @Column(name = "fatherName", length = 255, nullable = false)
    private String name;

    @Column(name = "fatherPhone", length = 20)
    private String phone;

    @Column(name = "fatherEmail", length = 255)
    private String email;

    @Column(name = "fatherOccupation", length = 100)
    private String occupation;

    @Column(name = "fatherCompany", length = 255)
    private String company;

    @Column(name = "fatherDesignation", length = 100)
    private String designation;

    @Column(name = "fatherAge")
    private Integer age;

    @Column(name = "fatherQualification", length = 100)
    private String qualification;

    @Column(name = "father_Is_alive")
    private Boolean isAlive = true;

}