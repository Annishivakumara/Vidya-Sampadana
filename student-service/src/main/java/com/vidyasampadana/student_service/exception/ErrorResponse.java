package com.vidyasampadana.student_service.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private String message;
    private String details;
    private LocalDateTime timestamp;

    public ErrorResponse(String massage ,String details) {
        this.message=message;
        this.details = details;
        this.timestamp=LocalDateTime.now();
    }
}
