package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "student_contact_info")
@AllArgsConstructor
@NoArgsConstructor
public class student_contact_info {

                @Id
                @Column(name = "id", length = 36)
                private String student_cont_id;

                @Column(name = "first_name", length = 100, nullable = false)
                private String firstName;

                @Column(name = "middle_name", length = 100)
                private String middleName;

                @Column(name = "last_name", length = 100, nullable = false)
                private String lastName;

                @Column(name = "full_name", length = 300)
                private String fullName;

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

                @Column(name = "blood_group", length = 10)
                private String bloodGroup;

                @Column(name = "nationality", length = 100)
                private String nationality;

                @Column(name = "created_at")
                private LocalDateTime createdAt;

                @Column(name = "updated_at")
                private LocalDateTime updatedAt;

                enum Gender { MALE, FEMALE, OTHER }
}