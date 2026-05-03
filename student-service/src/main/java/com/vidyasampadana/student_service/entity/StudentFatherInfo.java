package com.vidyasampadana.student_service.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class StudentFatherInfo {


    @Column(name = "father_name", length = 255, nullable = false)
    private String name;

    @Column(name = "father_phone", length = 20)
    private String phone;

    @Column(name = "father_email", length = 255)
    private String email;

    @Column(name = "father_occupation", length = 100)
    private String occupation;

    @Column(name = "father_company", length = 255)
    private String company;

    @Column(name = "father_designation", length = 100)
    private String designation;

    @Column(name = "father_age")
    private Integer age;

    @Column(name = "father_qualification", length = 100)
    private String qualification;

<<<<<<< HEAD
    @Column(name = "father_Is_alive", columnDefinition = "BOOLEAN DEFAULT TRUE")
=======
    @Column(name = "father_is_alive", columnDefinition = "BOOLEAN DEFAULT TRUE")
>>>>>>> sub_me/main
    private Boolean isAlive = true;

}