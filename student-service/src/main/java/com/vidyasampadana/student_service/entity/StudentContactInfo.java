package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "student_contact_info")
@NoArgsConstructor
@AllArgsConstructor
public class StudentContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_cont_id")
    @EqualsAndHashCode.Include
    private Long studentContId;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "middle_name", length = 100)
    private String middleName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "full_name", length = 300)
    private String fullName;

    @Column(name = "email", length = 255, unique = true)
    private String email;

    @Column(name = "phone", length = 20, unique = true)
    private String phone;

    @Column(name = "alternate_phone", length = 20)
    private String alternatePhone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 20)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_group", length = 10)
    private BloodGroup bloodGroup;

    @Column(name = "nationality", length = 100)
    private String nationality;

    @PrePersist
    @PreUpdate
    public void computeFullName() {
        this.fullName = String.join(" ",
                firstName != null ? firstName : "",
                middleName != null ? middleName : "",
                lastName != null ? lastName : ""
        ).trim().replaceAll("\\s+", " ");
    }
}