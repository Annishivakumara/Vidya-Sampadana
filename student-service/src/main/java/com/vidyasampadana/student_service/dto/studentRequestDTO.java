package com.vidyasampadana.student_service.dto;

import com.vidyasampadana.student_service.entity.students;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class studentRequestDTO {
        private String userId;
        private String examType;
        private Integer currentYear;
        private students.StudentStatus status;  // "ACTIVE", "INACTIVE", "SUSPENDED"
 }