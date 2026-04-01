package com.vidyasampadana.student_service.entity;

import lombok.Getter;

@Getter
public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    TRANSGENDER("Transgender"),
    NON_BINARY("Non-Binary"),
    PREFER_NOT_TO_SAY("Prefer not to say");

    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }
}
