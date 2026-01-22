package com.vidyasampadana.student_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "student_contact_info")
@AllArgsConstructor
@NoArgsConstructor
public class StudentContactInfo {

                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                private Long  studentContId;


                @Column(name = "first_name")
                private String firstName;

                @Column(name = "middle_name", length = 100)
                private String middleName;

                @Column(name = "last_name", length = 100, nullable = false)
                private String lastName;


                @Column(name = "email", length = 255, nullable = false, unique = true)
                private String email;

                @Column(name = "phone", length = 20, nullable = false, unique = true)
                private String phone;

                @Column(name = "alternate_phone", length = 20)
                private String alternatePhone;

                 @Column(name = "date_of_birth")
                 private LocalDate dateOfBirth;

                @Enumerated(EnumType.STRING)
                @Column(name = "gender")
                private Gender gender;

                @Column(name = "blood_group")
                private String bloodGroup;

                @Column(name = "nationality")
                private String nationality;

                public enum Gender { MALE, FEMALE, OTHER }
}