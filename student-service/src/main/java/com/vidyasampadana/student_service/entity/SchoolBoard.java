package com.vidyasampadana.student_service.entity;

import lombok.Getter;

@Getter
public enum SchoolBoard {
    CBSE("Central Board of Secondary Education", "National"),
    ICSE("Indian Certificate of Secondary Education", "National"),
    STATE("State Board", "State"),
    IB("International Baccalaureate", "International"),
    IGCSE("International General Certificate of Secondary Education", "International"),
    OTHER("Other Board", "Unknown");

    private final String fullName;
    private final String boardType;

    SchoolBoard(String fullName, String boardType) {
        this.fullName = fullName;
        this.boardType = boardType;
    }
}
