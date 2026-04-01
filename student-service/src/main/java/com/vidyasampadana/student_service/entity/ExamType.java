package com.vidyasampadana.student_service.entity;

import lombok.Getter;

@Getter
public enum ExamType {
    MOCK("Mock Test", "Practice exam before actual test"),
    MAINS("Mains Exam", "Primary national level exam"),
    ADVANCED("Advanced Exam", "Higher difficulty level exam"),
    ACTUAL("Actual Exam", "Final official examination"),
    OTHER("Other", "Any other exam type");

    private final String displayName;
    private final String description;

    ExamType(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }
}
