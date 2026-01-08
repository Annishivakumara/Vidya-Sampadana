package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

    @Entity
    @Table(name = "student_contact_info"
//            indexes = {
//                    @Index(name = "idx_student_id", columnList = "student_id"),
//                    @Index(name = "idx_email", columnList = "email"),
//                    @Index(name = "idx_phone", columnList = "phone")
//            }
            )
    @AllArgsConstructor
    @NoArgsConstructor
    public class student_contact_info {

        @Id
        @Column(length = 36, nullable = false, updatable = false)
        private String id = UUID.randomUUID().toString();  //immutable universally unique identifier- 128bit

        @Column(name = "student_id", length = 36, nullable = false, unique = true)
        private String studentId;

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
        @Column(name = "gender", length = 10)
        private Gender gender;

        @Column(name = "blood_group", length = 10)
        private String bloodGroup;

        @Column(name = "nationality", length = 100)
        private String nationality;

        @Column(name = "created_at", nullable = false,
                columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
        private LocalDateTime createdAt = LocalDateTime.now();

        @Column(name = "updated_at", nullable = false,
                columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
        private LocalDateTime updatedAt = LocalDateTime.now();

        // --- Enum for Gender ---
        public enum Gender {
            MALE, FEMALE, OTHER
        }

}
