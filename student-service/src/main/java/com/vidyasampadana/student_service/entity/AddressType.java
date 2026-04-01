package com.vidyasampadana.student_service.entity;

import lombok.Getter;

@Getter
public enum AddressType {
    CURRENT("Current Address", "Where student currently resides"),
    PERMANENT("Permanent Address", "Student's permanent home address"),
    GUARDIAN("Guardian Address", "Address of student's guardian"),
    OTHER("Other Address", "Any other address type");

    private final String displayName;
    private final String description;

    AddressType(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }
}
