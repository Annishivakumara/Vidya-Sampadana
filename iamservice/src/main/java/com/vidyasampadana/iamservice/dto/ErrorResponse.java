package com.vidyasampadana.iamservice.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public record ErrorResponse(
        String message,
        HttpStatus status,
        int statusCode
) {
}
