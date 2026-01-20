// Student Entity - Main Aggregate Root with Injected Relationships
package com.vidyasampadana.student_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
public class students {
    @Id
    @Column(name = "id", length = 36)
    private String id;

    @Column(name = "user_id", length = 36, nullable = false, unique = true)
    private String userId;

    @Column(name = "exam_type", length = 50, nullable = false)
    private String examType;

    @Column(name = "current_year", nullable = false)
    private Integer currentYear;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StudentStatus status = StudentStatus.ACTIVE;

    @Column(name = "profile_completion_percentage")
    private Integer profileCompletionPercentage = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Injected One-to-One Relationships
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_cont_id")
    private student_contact_info contactInfo;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_parent_id")
    private student_parent_info student_parent_info;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_academic_id")
    private student_academic_profile student_academic_profile;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_health_id")
    private student_health_metrics healthMetrics;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_add_id")
    private student_address_info studentAddressInfo;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_exam_id")
    private  student_exam_scores studentExamScores;

    @OneToMany(mappedBy = "students", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_sub_id")
    private student_subject_interests student_subject_interests;

    @OneToMany(mappedBy = "students", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_goal_id")
    private student_study_goals student_study_goals;

    public enum StudentStatus { ACTIVE, INACTIVE, SUSPENDE}
}