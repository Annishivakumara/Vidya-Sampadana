package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.*;
<<<<<<< HEAD
import java.util.UUID;

=======

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

>>>>>>> sub_me/main
@Getter
@Setter
@Entity
@Table(
        name = "students",
        indexes = {
                //  Added index on studentId (UUID) for fast lookup
                @Index(name = "idx_student_uuid", columnList = "student_id")
        }
)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Students {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "student_id", length = 36, nullable = false, unique = true)
    private String studentId;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_cont_id", referencedColumnName = "student_cont_id")
    private StudentContactInfo contactInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "academic_id", referencedColumnName = "academic_id")
    private StudentAcademicProfile academicProfile;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", referencedColumnName = "parent_id")
    private StudentParentInfo studentParentInfo;

<<<<<<< HEAD
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", referencedColumnName = "address_id")
    private StudentAddressInfo studentAddressInfo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", referencedColumnName = "exam_id")
    private StudentExamScores studentExamScores;
=======
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "student_id_fk")
    private List<StudentAddressInfo> addressList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "student_id_fk")
    private List<StudentExamScores> examScores = new ArrayList<>();
>>>>>>> sub_me/main

    @PrePersist
    public void generateStudentId() {
        if (this.studentId == null) {
            this.studentId = UUID.randomUUID().toString();
        }
    }
}