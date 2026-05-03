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

    @Column(name = "mother_name", length = 255, nullable = false)
    private String name;

    @Column(name = "mother_phone", length = 20)
    private String phone;

    @Column(name = "mother_email", length = 255)
    private String email;

    @Column(name = "mother_occupation", length = 100)
    private String occupation;

    @Column(name = "mother_company", length = 255)
    private String company;

    @Column(name = "mother_designation", length = 100)
    private String designation;

    @Column(name = "mother_age")
    private Integer age;

    @Column(name = "mother_qualification", length = 100)
    private String qualification;

    @Column(name = "mother_is_alive", columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isAlive = true;
}
