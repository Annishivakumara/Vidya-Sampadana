package com.vidyasampadana.student_service.dto;

import com.vidyasampadana.student_service.entity.students;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class studentResponsedto {
    private String id;
    private String userId;
    private String examType;
    private Integer currentYear;
    private students.StudentStatus status;
    private Integer profileCompletionPercentage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
